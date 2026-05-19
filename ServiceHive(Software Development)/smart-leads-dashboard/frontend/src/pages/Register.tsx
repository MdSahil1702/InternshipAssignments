import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerAPI } from '../api/auth';
import { useAuth } from '../hooks/useAuth';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'sales' });
  const [err, setErr]   = useState('');
  const [load, setLoad] = useState(false);
  const { login }       = useAuth();
  const nav             = useNavigate();

  const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const submit = async () => {
    if (!form.name || !form.email || !form.password) { setErr('All fields required'); return; }
    setLoad(true);
    try {
      const res = await registerAPI(form);
      login(res.data.token, res.data.data);
      nav('/');
    } catch {
      setErr('Registration failed');
    } finally {
      setLoad(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow w-full max-w-sm">
        <h1 className="text-2xl font-bold text-green-700 mb-6 text-center">GigFlow</h1>
        <h2 className="text-lg font-semibold mb-4">Register</h2>

        {err && <p className="text-red-500 text-sm mb-3">{err}</p>}

        <div className="flex flex-col gap-3">
          <input name="name" placeholder="Full Name"
            onChange={handle} value={form.name}
            className="border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"/>
          <input name="email" type="email" placeholder="Email"
            onChange={handle} value={form.email}
            className="border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"/>
          <input name="password" type="password" placeholder="Password"
            onChange={handle} value={form.password}
            className="border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"/>
          <select name="role" value={form.role} onChange={handle}
            className="border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400">
            <option value="sales">Sales User</option>
            <option value="admin">Admin</option>
          </select>
          <button onClick={submit} disabled={load}
            className="bg-green-600 text-white py-2 rounded font-semibold hover:bg-green-700 disabled:opacity-50">
            {load ? 'Registering...' : 'Register'}
          </button>
        </div>

        <p className="text-sm text-center mt-4 text-gray-500">
          Have account?{' '}
          <Link to="/login" className="text-green-600 font-semibold">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;