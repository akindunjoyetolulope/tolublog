import { useState } from "react";
import { useHistory } from "react-router-dom";
import useHttp from "./hooks/use-http";

const Create = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("ToluwaIope");

  const history = useHistory();
  const { isPending, error, sendReq} = useHttp();

  const handleSubmit = (e) => {
    e.preventDefault();
    const blog = { title, body, author };

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
        const createdBlog = { id: generatedId, ...blog};
        if (createdBlog) {
          history.push("/");
        }
        console.log(createdBlog)
    }
    
    sendReq(reqConfig, applyData)

    
  };

  return (
    <div className="create">
      <h2> Add A New Blog </h2>
      <form onSubmit={handleSubmit}>
        <label>Blog Title : </label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Blog Body :</label>
        <textarea
          required
          value={body}
          onChange={(e) => {
            setBody(e.target.value);
          }}
        />
        <label> Blog author : </label>
        <select
          value={author}
          onChange={(e) => {
            setAuthor(e.target.value);
          }}
        >
          <option value="ToluwaIope">ToluwaIope</option>
          <option value="mario">mario</option>
          <option value="yoshi">yoshi</option>
        </select>
        {!isPending && <button> Add Blog</button>}
        { isPending && <button> Adding Blog... </button>}
        {error && <div>{error}</div>}
      </form>
    </div>
  );
};

export default Create;
