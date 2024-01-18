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

 
  
  return { user };
};

export default useGetuserData;
