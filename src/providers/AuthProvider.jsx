
import { createContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword,signInWithEmailAndPassword, updateProfile, signOut } from "firebase/auth";
import app from "./../firebase/firebase.config";
import PropTypes from "prop-types";


export const AuthContext = createContext(null);

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      if (currentUser) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const createUser = async (email, password, name, photoURL) => {
    setLoading(true);
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(user, { displayName: name, photoURL });
      setLoading(false);
      setIsAuthenticated(true);
      return user;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };
  const signIn = (email,password) =>{
    setLoading(true);
    return signInWithEmailAndPassword(auth,email,password);

} 
  const logOut = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      setLoading(false);
      setIsAuthenticated(false);
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const authInfo = {
    user,
    loading,
    createUser,
    logOut,
    isAuthenticated,
    setUser,
    signIn
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
