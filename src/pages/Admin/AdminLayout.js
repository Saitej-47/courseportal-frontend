import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "./Admin.css";
import logo from "../../assets/logo.png";

function AdminLayout() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("admin");
    navigate("/admin");
  };

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <div className="sidebar">

        {/* ⭐ Centered Logo (student style) */}
        <div className="sidebarTop">
  <img src={logo} alt="logo" className="adminLogo" />

  <div className="adminText">
    <h2>Admin Panel</h2>
    <p>Management Console</p>
  </div>
</div>

        <NavLink to="/admin/dashboard">Dashboard</NavLink>
        <NavLink to="/admin/students">Students</NavLink>
        <NavLink to="/admin/courses">Courses</NavLink>
        <NavLink to="/admin/faculty">Faculty</NavLink>
        <NavLink to="/admin/enrollments">Enrollments</NavLink>

        <button className="logoutBtn" onClick={logout}>
          Logout
        </button>
      </div>

      {/* Content */}
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout;
