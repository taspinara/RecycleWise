import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useRecycleWise } from "../context/RecycleWiseContext.jsx";
import { motion } from "framer-motion"; // Import for animation

function PostDetail() {
  const { API_BASE_URL, user, isLoading } = useRecycleWise();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams(); // Get post ID from URL params

  useEffect(() => {
    if (isLoading) return; // Wait until user data is fully loaded

    if (!user) {
      toast.info("Please log in to view post details.", {
        position: "top-center",
        autoClose: 3000,
      });
      navigate("/login");
      return;
    }

    const fetchPost = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(`${API_BASE_URL}/api/posts/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });

        setPost(response.data);
      } catch (error) {
        setError(error.message || "Failed to fetch post details");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id, user, navigate, API_BASE_URL, isLoading]);

  if (isLoading || loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-center text-4xl font-bold text-gray-800 mb-8">
          Post Detail
        </h2>
        <div className="bg-white shadow-lg rounded-lg p-8 mb-8 max-w-3xl mx-auto">
          <div className="mb-6">
            <img
              src={post?.image}
              alt="Post Image"
              className="rounded-lg w-full object-contain mb-6"
            />
          </div>
          <h3 className="text-4xl font-semibold text-gray-800 mb-4">
            {post?.text}
          </h3>
          <p className="text-lg text-gray-700 mb-6">{post?.content}</p>
          <div className="flex justify-between items-center text-sm text-gray-500">
            <span className="font-medium">Posted by {post?.user.username}</span>
            <span>{new Date(post?.createdAt).toLocaleString()}</span>
          </div>
        </div>
        <button
          onClick={() => navigate("/posts")}
          className="px-6 py-2 mt-4 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Back to Posts
        </button>
      </motion.div>
    </div>
  );
}

export default PostDetail;
