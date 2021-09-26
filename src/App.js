import React from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

const baseUrl = "https://superheroapi.com/api/1621075358241982";

function App() {
  const [post, setPost] = React.useState(null);
  React.useEffect(() => {
    axios.get(`${baseUrl}`).then((res) => console.log("res", res));
  }, []);

  function createPost() {
    axios
      .post(baseUrl, {
        title: "Hello World!",
        body: "this is a new post.",
        pic: "this will be an image",
      })
      .then((res) => setPost(res.data));
  }

  if (!post) return "No post!";
  return (
    <div>
      {/* <h1>{post.title}</h1>
      <p>{post.body}</p>
      <p>{post.pic}</p>
      <button onClick={createPost}>Create Post</button> */}
    </div>
  );
}

export default App;
