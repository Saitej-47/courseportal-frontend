import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "./Admin.css";
import logo from "../../assets/logo.png";

function AdminLayout() {
  const navigate = useNavigate();

const logout = () => {
  localStorage.removeItem("admin");
  navigate("/admin/login"); // ← correct
};

  const navItems = [
    { to: "/admin/dashboard",   icon: "🏠", label: "Dashboard"   },
    { to: "/admin/students",    icon: "👥", label: "Students"    },
    { to: "/admin/courses",     icon: "📚", label: "Courses"     },
    { to: "/admin/faculty",     icon: "👨‍🏫", label: "Faculty"     },
    { to: "/admin/enrollments", icon: "📋", label: "Enrollments" },
  ];

  return (
    <div className="admin-container">
      <div className="sidebar">
        <div className="sidebarTop">
          <img src={logo} alt="logo" className="adminLogo" />
          <h2 className="adminTitle">Admin Panel</h2>
          <p className="adminSub">Management Console</p>
        </div>

        {navItems.map((item) => (
          <NavLink key={item.to} to={item.to}>
            <span className="nav-icon">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}

        <button className="logoutBtn" onClick={logout}>→ Logout</button>
      </div>

      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout;