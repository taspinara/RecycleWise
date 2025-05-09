import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useRecycleWise } from "../context/RecycleWiseContext.jsx";

function Posts() {
  const { API_BASE_URL, user, isLoading } = useRecycleWise();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const hasWarned = useRef(false);

  useEffect(() => {
    // Wait for the user to be loaded properly from context
    if (isLoading) return; // Prevent the effect from running if the user is still loading

    if (!user) {
      if (!hasWarned.current) {
        toast.info("Please log in or create an account to view posts.", {
          position: "top-center",
          autoClose: 3000,
        });
        hasWarned.current = true;

        navigate("/login");
      }
      return;
    }

    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(`${API_BASE_URL}/api/posts`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });

        setPosts(response.data);
      } catch (error) {
        setError(error.message || "Failed to fetch posts");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [user, navigate, API_BASE_URL, isLoading]);

  if (isLoading || loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2 className=" text-center my-10 font-bold text-gray-800 text-3xl">
        Posts
      </h2>
      {posts.length === 0 ? (
        <p className="text-green-600">No posts available.</p>
      ) : (
        posts.map((post) => (
          <div
            key={post?._id}
            className="post-container bg-white shadow-lg rounded-lg p-6 mb-6 max-w-3xl mx-auto"
          >
            <div className="post-image mb-4">
              <img
                src={post?.image}
                alt="Post"
                className="rounded-lg w-full h-auto"
                style={{ maxHeight: "400px", objectFit: "cover" }}
              />
            </div>
            <div className="post-content">
              <h2 className="text-2xl font-semibold text-green-600 mb-3">
                {post?.text}
              </h2>
              <p className="text-gray-600 mb-4">{post?.description}</p>
              <div className="post-footer flex justify-between items-center text-sm text-gray-500">
                <span>Posted by {post?.user.username}</span>
                <span>{new Date(post?.createdAt).toLocaleString()}</span>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Posts;
