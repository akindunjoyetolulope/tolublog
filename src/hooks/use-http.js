import { useState, useCallback } from "react";


const useHttp = () => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);


   const sendReq = useCallback(async (reqConfig, applyData) => {
       setError(null)
       setIsPending(true)
    try{
        const response = await fetch(reqConfig.url, {
            method: reqConfig.method ? reqConfig.method : 'GET',
            headers: reqConfig.headers ? reqConfig.headers : {},
            body:  reqConfig.body ? JSON.stringify(reqConfig.body) : null
        })
        if(!response.ok){
           throw Error("COULD NOT FETCH THE DATA FROM THAT RESOURCE, try again!'")
        }
 
        const data = await response.json()
        applyData(data)

    } catch (err) {
      setError(err.message || 'COULD NOT FETCH THE DATA FROM THAT RESOURCE, try again!')
    }
    setIsPending(false) 
   },[])

   return { isPending, error, sendReq}
};

export default useHttp;