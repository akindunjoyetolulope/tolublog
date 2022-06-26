import useHttp from "./hooks/use-http";
import BlogList from "./Bloglist";
import { useEffect, useState } from "react/cjs/react.production.min";

const Home = (props) => {
  const [isdata, setisdata] = useState([]);

  const { isPending, error, sendReq } = useHttp();

  const enterBlogHandler = (blog) =>{
    const reqConfig = {
        url: "https://tolublog-6072d-default-rtdb.firebaseio.com/blogs.json",
        method: "POST",
        body: {...blog},
        headers: {
          "Content-Type": "application/json",
        },
      };
  
      const applyData = (data) =>{
          const generatedId = data.name; // firebase-specific => "name" contains generated id
          const createdBlog = { id: generatedId, title: blog.title, body:blog.body, author:blog.author };
          props.onAddBlog(createdBlog) 
      }
      
      sendReq(reqConfig, applyData)
  }

//   useEffect(() => {
//     const reqConfig = {
//       url: "https://tolublog-6072d-default-rtdb.firebaseio.com/blogs.json",
//     };

//     const applyData = async (data) => {
      
//         const loadedBlog = [];
//         for (let blog in data) {
//           loadedBlog.push({
//             id: blog,
//             title: data[blog].title,
//             body: data[blog].body,
//             author: data[blog].author,
//           });
//         }
//         setdata(loadedBlog);
     
//     };

//     fetchData(reqConfig, applyData);
//   }, [fetchData]);

  return (
    <div className="home">
      {error && <div>{error}</div>}
      {isPending && <div> Loading... </div>}
      {data && data.error ? <div>NO BLOG</div> : <BlogList data={data} title="All Blogs" />}
    </div>
  );
};

export default Home;
