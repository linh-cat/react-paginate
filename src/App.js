import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Posts from "./components/Posts";
import Pagination from "./components/Pagination";

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPterPage] = useState(10);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const res = await axios.get(`https://jsonplaceholder.typicode.com/posts`);
      setPosts(res.data);
      setLoading(false);
    };
    fetchPosts();
  }, []);

  // get current posts.
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstpost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstpost, indexOfLastPost);

  //change page

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container">
      <h1 className="text-primary mt-3">My Blogs</h1>
      <Posts posts={currentPosts} loading={loading} />
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        paginate={paginate}
      />
    </div>
  );
}

export default App;
