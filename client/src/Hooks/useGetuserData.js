import { useState } from 'react';

const useGetuserData = (key="CRM-user", initialValue = null) => {
  // Retrieve data from localStorage on component mount
  const storedValue = localStorage.getItem(key);
  
   let initial=null;
  if(storedValue === undefined)
  {
    initial=initialValue;
  }
  else
  {
    initial=JSON.parse(storedValue) 
  }
  console.log(initial,"sdsds")
  // State to hold the current value
  const [user, setuser] = useState(initial);

  // Function to update the user in localStorage and state
//   const setuserAndStore = (newuser) => {
//     setuser(newuser);
//     localStorage.setItem(key, JSON.stringify(newuser));
//   };

  
  return { user };
};

export default useGetuserData;
