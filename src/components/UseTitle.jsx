import { useEffect } from "react";

const UseTitle = (title) => {
useEffect(() =>{
   document.title=`CityScapeHomes|${title}`;
},[]);
};

export default UseTitle;