import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center w-full">
      <h1 className="text-2xl font-semibold text-blue-600">Auth App</h1>
      <div className="space-x-4">
        <Link to="/" className="hover:text-blue-600">Register</Link>
        <Link to="/login" className="hover:text-blue-600">Login</Link>
        <Link to="/profile" className="hover:text-blue-600">Profile</Link>
      </div>
    </nav>
  );
};

export default Navbar;
