import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import useHttp from "./hooks/use-http";
import useData from "./store/use-data";

const Create = (props) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("ToluwaIope");


  const ctx = useContext(useData);
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    const blog = { title, body, author };
    if (title.length > 0 && body.length > 0) {
      ctx.addBlog({ id: data.name, ...blog });
      history.push("/");
    }
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
        {isPending && <button> Add Blog</button>}
        {!isPending && <button> Adding Blog... </button>}
      </form>
    </div>
  );
};

export default Create;
