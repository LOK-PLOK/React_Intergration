import { Link } from 'react-router-dom';

function Unauthorized() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center">
        <h2 className="text-3xl font-semibold mb-6">Unauthorized</h2>
        <p className="mb-4">You need to be logged in to access this page.</p>
        <Link to="/" className="text-blue-500 hover:underline">
          Go to Login
        </Link>
      </div>
    </div>
  );
}

export default Unauthorized;
