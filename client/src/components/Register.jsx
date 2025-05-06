import { useState } from 'react';
import { useRecycleWise } from '../context/RecycleWiseContext';
import { apiFetch } from '../utils/api';

export default function Register() {
  const { setUser, navigate } = useRecycleWise();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
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

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const { confirmPassword, ...requestData } = formData;

      const res = await apiFetch('/auth/register', {
        method: 'POST',
        body: JSON.stringify(requestData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Registration failed');

      setUser(data.user);
      navigate('/login');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200">
      <form onSubmit={handleSubmit} className="card w-full max-w-md shadow-xl bg-base-100 p-8">
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>

        <div className="grid grid-cols-2 gap-4">
          <input name="firstName" type="text" placeholder="First Name" className="input input-bordered w-full" onChange={handleChange} required />
          <input name="lastName" type="text" placeholder="Last Name" className="input input-bordered w-full" onChange={handleChange} required />
        </div>

        <input name="username" type="text" placeholder="Username" className="input input-bordered w-full mt-4" onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" className="input input-bordered w-full mt-4" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" className="input input-bordered w-full mt-4" onChange={handleChange} required />
        <input name="confirmPassword" type="password" placeholder="Confirm Password" className="input input-bordered w-full mt-4" onChange={handleChange} required />

        {error && <p className="text-red-500 mt-2">{error}</p>}

        <button type="submit" className="btn btn-primary w-full mt-6">Register</button>
      </form>
    </div>
  );
}
