import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { user, logout } = useAuth();
  const nav = useNavigate();

  const handleLogout = () => {
    logout();
    nav('/login');
  };

  return (
    <nav className="bg-green-700 text-white px-6 py-4 flex justify-between items-center shadow">
      <h1 className="text-xl font-bold">GigFlow – Smart Leads Dashboard</h1>
      <div className="flex items-center gap-4">
        <span className="text-sm">
          {user?.name} —
          <span className="ml-1 bg-white text-green-700 text-xs px-2 py-0.5 rounded-full font-semibold uppercase">
            {user?.role}
          </span>
        </span>
        <button
          onClick={handleLogout}
          className="bg-white text-green-700 px-3 py-1 rounded text-sm font-semibold hover:bg-green-100"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;