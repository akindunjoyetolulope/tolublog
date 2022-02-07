import { useParams } from "react-router-dom";
import useFetch from "./useFetch";
import { useHistory } from "react-router-dom";

const BlogDetails = () => {
   const { id } = useParams();
   const { data: blog, isPending, error} = useFetch(`http://localhost:8000/blogs/${id}`);
   
   const history = useHistory();
   
   const deleteBlog = () => {
      fetch("http://localhost:8000/blogs/" + blog.id, {
      method: "DELETE"
    }).then(()=>{
        console.log('blog deleted')
        history.push('/');
    })
   }

    return ( 
        <div className="blog-details">
           { isPending && <div> Loading... </div>}
           { error && <div>{ error }</div>}
           { blog && 
           <article>
               <h2>{ blog.title }</h2>
               <p> { blog.author}</p>
               <div>
                   <p>{ blog.body }</p>
               </div>
           </article>
           }
           <button onClick={deleteBlog}>delete</button>
        </div>
     );
}
 
export default BlogDetails;