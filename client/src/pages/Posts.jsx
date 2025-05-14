import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useRecycleWise } from "../context/RecycleWiseContext.jsx";
import { motion } from "framer-motion";

function Posts() {
  const { API_BASE_URL, user, isLoading } = useRecycleWise();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) return;

    if (!user) {
      toast.info("Please log in or create an account to view posts.", {
        position: "top-center",
        autoClose: 3000,
      });
      navigate("/login");
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

  // Sort posts from newest to oldest by createdAt
  const sortedPosts = [...posts].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <div className="posts-container">
      <h2 className="text-center my-10 font-bold text-gray-800 text-3xl">
        Recycling Blog
      </h2>
      {sortedPosts.length === 0 ? (
        <p className="text-green-600">No posts available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedPosts.map((post) => (
            <motion.div
              key={post?._id}
              className="post-container cursor-pointer bg-white shadow-lg rounded-lg p-6 mb-6"
              onClick={() => navigate(`/posts/${post._id}`)}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
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
                <p className="text-gray-600 mb-4">{post?.content}</p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Posts;
