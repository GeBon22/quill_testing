import { useState } from "react";
import "./App.css";
import { Button, TextField } from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function App() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [posts, setPosts] = useState<any[]>([]);
  const [postIdCounter, setPostIdCounter] = useState(1);

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
      <div className="card">
        <p>Enter and edit the FAQ Section</p>
      </div>
      <section className="flex justify-start flex-col gap-4 border-2 p-4">
        <TextField
          id="outlined-basic"
          label="Title"
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
          />
        </div>
        <Button variant="outlined" onClick={postContent}>
          Post
        </Button>
      </section>
      <div>
        {posts.map((post: any) => (
            <div
              key={post.id}
              className="border-2 flex flex-col justify-start w-5/6 mt-4 p-2"
            >
              <div className="flex justify-end flex-row">
                <Button variant="text" onClick={() => removePost(post.id)}>
                  X
                </Button>
              </div>
              <h2 className="text-lg font-semibold">{post.title}</h2>

              <div
                className="flex justify-start"
                dangerouslySetInnerHTML={{ __html: post.content }}
              ></div>
            </div>
        ))}
      </div>
    </>
  );
}

export default App;
