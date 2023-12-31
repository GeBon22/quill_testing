import { useEffect, useMemo, useState } from "react";
import "./App.css";
import { Button, Divider, TextField, Tooltip, Typography } from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import ScrollButton from "./components/ScrollButton";
import DarkModeSwitch from "./components/DarkModeSwitch";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

function App() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [posts, setPosts] = useState<any[]>(
    JSON.parse(localStorage.getItem("posts") ?? "[]")
  );
  const [filteredPosts, setFilteredPosts] = useState<any[]>(
    JSON.parse(localStorage.getItem("posts") ?? "[]")
  );
  const [postIdCounter, setPostIdCounter] = useState(1);
  const [initialLoad, setInitialLoad] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (initialLoad) {
      setInitialLoad(false);
    }
  }, [initialLoad]);

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
      setContent("");
      setTitle("");
    }
  };

  const removePost = (postId: number) => {
    const updatedPosts = posts.filter((post) => post.id !== postId);
    setPosts(updatedPosts);
  };

  const searchPost = (postTitle: string) => {
    const trimmedPostTitle = postTitle.trim();
    setSearchTerm(trimmedPostTitle);

    if (trimmedPostTitle === '') {
      setFilteredPosts(posts);
    } else {
      const filteredPosts = posts.filter(post =>
        post.title.toLowerCase().includes(trimmedPostTitle.toLowerCase())
      );
      setFilteredPosts(filteredPosts);
    }
  }

  const memoizedPostCards = useMemo(() => {
    return filteredPosts.map((post: any, index) => (
      <div
        key={post.id + Math.random().toString(16).slice(2)}
        className={`border-2 rounded flex flex-col justify-start flex-wrap w-5/6 p-2 mt-4 post-card ${
          initialLoad ? "fade-in" : ""
        }`}
        style={{ animationDelay: `${initialLoad ? index * 0.2 : 0}s` }}
      >
        <div className="flex justify-between flex-row">
          <h2 className="text-lg font-semibold">{post.title}</h2>
          <Tooltip title="delete post" arrow>
            <Button
              sx={{ color: "lightgrey" }}
              variant="text"
              onClick={() => removePost(post.id)}
            >
              <CloseRoundedIcon />
            </Button>
          </Tooltip>
        </div>
        <Divider className="pt-4" />
        <div
          className="flex justify-start pt-4"
          dangerouslySetInnerHTML={{ __html: post.content }}
        ></div>
      </div>
    ));
  }, [filteredPosts]);

  return (
    <>
      <div className="sticky w-full top-0 z-10 mb-4 p-8 rounded sticky-top bg-white bg-opacity-50 backdrop-blur-xl drop-shadow-lg">
        <h1>FAQ Testing</h1>
        <p>create and edit the FAQ section cards</p>
        <DarkModeSwitch />
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
        <Button
          sx={{ color: "black", borderColor: "black" }}
          variant="outlined"
          onClick={postContent}
        >
          Post
        </Button>
      </section>
      <div className="flex justify-end mt-8">
      <TextField
        label="Search"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          searchPost(e.target.value);
        }}
      />
      </div>
      <Divider className="pt-4" />
      <div>{memoizedPostCards}</div>
      <ScrollButton />
    </>
  );
}

export default App;
