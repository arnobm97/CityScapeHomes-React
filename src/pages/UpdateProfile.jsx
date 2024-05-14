import UseTitle from "../components/UseTitle";
import { useContext, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { updateProfile } from "firebase/auth";

const UpdateProfile = () => {
  UseTitle("Update Profile");
  const { user,setUser } = useContext(AuthContext);
  const [name, setName] = useState(user.displayName || "");
  const [photoURL, setPhotoURL] = useState(user.photoURL || "");
  const [loading, setLoading] = useState(false);

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateProfile(user, {
        displayName: name,
        photoURL: photoURL,
      });
  
      // Update the user object in the AuthContext
      const updatedUser = { ...user, displayName: name, photoURL: photoURL };
      setUser(updatedUser);
  
      setLoading(false);
      alert("Changes saved successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      setLoading(false);
      alert("Failed to save changes. Please try again later.");
    }
  };
  

  return (
    <div className="mt-10 mb-48">
      <h1 className="text-center mb-6">Update Profile</h1>
      <form onSubmit={handleSaveChanges} className="lg:w-[600px] lg:h-50 mx-auto bg-gray-100 p-6 rounded-lg">
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-bold text-gray-700">
            Name:
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full h-8 pl-2 shadow-sm sm:text-sm border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="photoURL" className="block text-sm font-bold text-gray-700">
            Photo URL:
          </label>
          <input
            type="url"
            id="photoURL"
            value={photoURL}
            onChange={(e) => setPhotoURL(e.target.value)}
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block h-8 pl-2 w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            required
          />
        </div>
        <button type="submit" disabled={loading} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-20">
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;