import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setPending] = useState(true);
  const [error, setError] = useState(null);
    

  useEffect(() => {

    const abortCont = new AbortController();

     setTimeout(()=>{
        fetch(url, { signal: abortCont.signal })
        .then((res)=>{
           if(!res.ok){
             throw Error('COULD NOT FETCH THE DATA FROM THAT RESOURCE')
           }
           return res.json();
        })
        .then((data)=>{
          setData(data);
          setPending(false);
          setError(null);
        })
        .catch((err)=>{
          if(err.name === 'AbortError'){
              console.log('fetch Aborted')
          } else{
            setPending(false);
            setError(err.message)
          }
        })
     }, 1000)
    
     return() => abortCont.abort();
  }, [])
  
   return { data, isPending, error }
}


export default useFetch;