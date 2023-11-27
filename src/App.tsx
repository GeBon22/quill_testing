import { useEffect, useState } from "react";
import "./App.css";
import { Button, Divider, TextField } from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function App() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [posts, setPosts] = useState<any[]>(JSON.parse(localStorage.getItem("posts") ?? "[]"));
  const [postIdCounter, setPostIdCounter] = useState(1);

  useEffect(() => {
    localStorage.setItem("posts", JSON.stringify(posts));
  }, [posts]);

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image", "video"],
      ["clean"],
    ],
    clipboard: {
      matchVisual: false,
    },
  };

  const postContent = () => {
    if (title.trim() !== "" && content.trim() !== "") {
      const newPost = {
        id: postIdCounter,
        title: title,
        content: content,
      };
      setPosts([...posts, newPost]);
      setPostIdCounter(postIdCounter + 1);
      setTitle("");
      setContent("");
    }
  };

  const removePost = (postId: number) => {
    const updatedPosts = posts.filter((post) => post.id !== postId);
    setPosts(updatedPosts);
  };

  return (
    <>
      <h1>FAQ Testing</h1>
      <div className="p-4">
        <p>create and edit the FAQ section cards</p>
      </div>
      <section className="flex justify-start flex-col gap-4 border-2 rounded p-4">
        <TextField
          id="outlined-basic"
          label="Enter Title"
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div>
          <ReactQuill
            theme="snow"
            value={content}
            onChange={(value) => setContent(value)}
            modules={modules}
            placeholder="Enter Content"
          />
        </div>
        <Button variant="outlined" onClick={postContent}>
          Post
        </Button>
      </section>
      <Divider className="pt-4" />
      <div>
        {posts.map((post: any) => (
          <div
            key={post.id + Math.random().toString(16).slice(2)}
            className="border-2 rounded flex flex-col justify-start w-5/6 mt-4 p-2"
          >
            <div className="flex justify-between flex-row">
              <h2 className="text-lg font-semibold">{post.title}</h2>
              <Button variant="text" onClick={() => removePost(post.id)}>
                X
              </Button>
            </div>
            <Divider className="pt-4" />
            <div
              className="flex justify-start pt-4"
              dangerouslySetInnerHTML={{ __html: post.content }}
            ></div>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
