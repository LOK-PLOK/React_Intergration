import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function Signup() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Sending request to /users/register with:', { email, name });
      const response = await axios.post('/users/register', { email, name });

      console.log('Response:', response); // Log the response

      if (response.status === 200) {
        console.log('User registered successfully:', response.data);
        navigate('/');
      } else {
        console.error('Error registering user:', response.data);
        alert('Error registering user: ' + (response.data.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error registering user:', error);
      alert('Error registering user: ' + (error.response?.data?.message || 'Unknown error'));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-semibold mb-6 text-center">Sign Up</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 p-3 w-full rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-gray-300 p-3 w-full rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-3 w-full rounded hover:bg-blue-600 transition">
          Sign Up
        </button>
        <p className="mt-4 text-center">
          Already have an account? <Link to="/" className="text-blue-500 hover:underline">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;