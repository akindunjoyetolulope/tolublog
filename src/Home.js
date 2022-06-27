import { useState, useEffect } from "react";
import useHttp from "./hooks/use-http";
import BlogList from "./Bloglist";

const Home = () => {
  const [isdata, setisdata] = useState([]);
  const { isPending, error, sendReq } = useHttp();


  const applyData = (data) => {
      const blogs = [];
      for (let blog in data) {
        blogs.push({
          id: blog,
          title: data[blog].title,
          body: data[blog].body,
          author: data[blog].author,
        });
      }
      setisdata(blogs) 
    }
  
  useEffect(()=>{
   
    const reqConfig = {
      url: "https://tolublog-6072d-default-rtdb.firebaseio.com/blogs.json",
    };

    

    sendReq(reqConfig, applyData)
    return () => {
      // cancel the subscription
     console.log('Clean up')
  };
  },[sendReq])

  return (
    <div className="home">
      {error && <div>{error}</div>}
      {isPending && <div> Loading... </div>}
      {isdata && <BlogList data={isdata} title="All Blogs" />}
    </div>
  );
};

export default Home;
