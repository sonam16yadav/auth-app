import { useEffect, useState } from "react";
import { api } from "../api/axiosClient";
import toast from "react-hot-toast";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  gender: string;
  email: string;
}

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await api.get("/api/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data.user);
      } catch {
        toast.error("Unauthorized or session expired");
      }
    };
    fetchUser();
  }, []);

  if (!user) return <p className="text-center mt-20">Loading...</p>;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
        <h2 className="text-2xl font-semibold mb-2 text-blue-600">
          Welcome, {user.firstName}
        </h2>
        <p>{user.email}</p>
        <button
          className="btn-primary mt-4"
          onClick={() => {
            localStorage.removeItem("token");
            toast.success("Logged out");
            window.location.href = "/login";
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
