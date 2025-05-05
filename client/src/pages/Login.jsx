import { useState } from 'react';
import { useRecycleWise } from '../context/RecycleWiseContext';
import { apiFetch } from '../utils/api';

export default function Login() {
  const { setUser, navigate } = useRecycleWise();

  const [formData, setFormData] = useState({
    identifier: '',
    password: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
        const res = await apiFetch('/auth/login', {
            method: 'POST',
            body: JSON.stringify(formData),
        });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Login failed');
      }

      setUser(data.user);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200">
      <form onSubmit={handleSubmit} className="card w-full max-w-md shadow-xl bg-base-100 p-8">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

        <input
          name="identifier"
          type="text"
          placeholder="Username or Email"
          className="input input-bordered w-full mb-4"
          onChange={handleChange}
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          className="input input-bordered w-full mb-4"
          onChange={handleChange}
          required
        />

        {error && <p className="text-red-500 mb-2">{error}</p>}

        <button type="submit" className="btn btn-primary w-full">Login</button>
      </form>
    </div>
  );
}
