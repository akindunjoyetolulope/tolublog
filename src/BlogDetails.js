import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useHttp from "./hooks/use-http";


const BlogDetails = () => {
  const { param } = useParams();
  const [singleBlog, setSingleBlog] = useState([]);
  const { isPending, error, sendReq: fetchData } = useHttp();

  useEffect(() => {
    const reqConfig = {
      url: "https://tolublog-6072d-default-rtdb.firebaseio.com/blogs.json",
    };
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
      setSingleBlog(blogs)
    };
    
    fetchData(reqConfig, applyData)
  }, [fetchData]);

//   const history = useHistory();

//   const deleteBlog = () => {
//     fetch("http://localhost:8888/blogs/" + blog.id, {
//       method: "DELETE",
//     }).then(() => {
//       console.log("blog deleted");
//       history.push("/");
//     });
//   };


  return (
    <div className="blog-details">
      {isPending && <div> Loading... </div>}
      {error && <div>{error}</div>}
      {singleBlog && singleBlog.filter((id) => id.id === param).map((blog)=>(
        <article key={blog.id}>
          <h2>{blog.title}</h2>
          <p>Author: {blog.author}</p>
          <div>
            <p>{blog.body}</p>
          </div>
        </article>
      ))
      }
      {/* <button onClick={deleteBlog}>delete</button> */}
    </div>
  );
};

export default BlogDetails;
