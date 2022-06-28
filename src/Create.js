import { useState } from "react";
import { useHistory } from "react-router-dom";
import useHttp from "./hooks/use-http";
import useInput from "./hooks/use-input";

const Create = () => {
  const {
    enterValue: title,
    onChangeHandler: onChangeHandlerTitle,
    onBlurHandler: onBlurHandlerTitle,
    hasError: hasErrorTitle,
    isValid: isValidTitle,
    reSet: reSetTitle,
  } = useInput((value) => value.trim("") !== "");

  const {
    enterValue: body,
    onChangeHandler: onChangeHandlerBody,
    onBlurHandler: onBlurHandlerBody,
    hasError: hasErrorBody,
    isValid: isValidBody,
    reSet: reSetBody,
  } = useInput((value) => value.trim("") !== "");

  const [author, setAuthor] = useState("ToluwaIope");

  let fromIsValid = false;

  if (isValidTitle && isValidBody) {
    fromIsValid = true;
  }

  const history = useHistory();
  const { isPending, error, sendReq} = useHttp();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isValidTitle && !isValidBody) {
      return;
    }

    const blog = { title, body: body, author };

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
    reSetTitle()
    reSetBody()
    
  };

  const titleInput = hasErrorTitle ? "invalid" : " ";
  const bodyInput = hasErrorBody ? "invalid" : " ";

  return (
    <div className="create">
      <h2> Add A New Blog </h2>
      <form onSubmit={handleSubmit}>
        <label>Blog Title : </label>
        <input
          className={titleInput}
          type="text"
          required
          value={title}
          onChange={onChangeHandlerTitle}
          onBlur={onBlurHandlerTitle}
        />
        {hasErrorTitle && (
            <span className="error-text">Nigger Write Your Title</span>
          )}
        <label>Blog Body :</label>
        <textarea
          className={bodyInput}
          required
          value={body}
          onChange={onChangeHandlerBody}
          onBlur={onBlurHandlerBody}
        />
        {hasErrorBody && (
            <span className="error-text">Nigger Write Your Title</span>
          )}
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
        {!isPending && <button disabled={!fromIsValid}> Add Blog</button>}
        { isPending && <button> Adding Blog... </button>}
        {error && <div>{error}</div>}
      </form>
    </div>
  );
};

export default Create;
