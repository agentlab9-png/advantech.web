import { useState } from 'react';
import { isAdminLoggedIn } from '../store';
import AdminLogin from '../admin/AdminLogin';
import AdminDashboard from '../admin/AdminDashboard';

export default function AdminPage() {
  const [loggedIn, setLoggedIn] = useState(isAdminLoggedIn());
  return loggedIn ? <AdminDashboard /> : <AdminLogin onLogin={() => setLoggedIn(true)} />;
}
