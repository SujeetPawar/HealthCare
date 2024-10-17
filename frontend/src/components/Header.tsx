import { useNavigate } from "react-router-dom";

const Header = ({ title }: { title: string }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/signin");
  };

  return (
    <div className="bg-blue-700 text-white p-4 flex justify-between items-center">
      <h1 className="text-3xl font-bold">{title}</h1>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
};

export default Header;
