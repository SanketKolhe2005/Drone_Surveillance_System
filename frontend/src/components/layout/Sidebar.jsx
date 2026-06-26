import { Link, useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {

  const location = useLocation();

  const navigate = useNavigate();

  const handleLogout = () => {

    localStorage.removeItem("auth");

    navigate("/login");

  };

  const menuItems = [
    {
      name: "Dashboard",
      path: "/"
    },
    {
      name: "Monitoring",
      path: "/monitoring"
    },
    {
      name: "History",
      path: "/history"
    },
    {
      name: "Alerts",
      path: "/alerts"
    },
    {
      name: "Settings",
      path: "/settings"
    }
  ];

  return (

    <div style={styles.sidebar}>

      <div>

        <h1 style={styles.logo}>
          AI Surveillance
        </h1>

        <div style={styles.menu}>

          {menuItems.map((item, index) => (

            <Link
              key={index}
              to={item.path}
              style={{
                ...styles.link,

                backgroundColor:
                  location.pathname === item.path
                    ? "#155e75"
                    : "#1e293b"
              }}
            >
              {item.name}
            </Link>

          ))}

        </div>

      </div>

      <button
        onClick={handleLogout}
        style={styles.logout}
      >
        Logout
      </button>

    </div>

  );
};

const styles = {

  sidebar: {
    width: "240px",
    height: "100vh",
    backgroundColor: "#020617",
    position: "fixed",
    left: 0,
    top: 0,
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    borderRight: "1px solid #1e293b"
  },

  logo: {
    color: "#22d3ee",
    fontSize: "38px",
    fontWeight: "bold",
    marginBottom: "40px"
  },

  menu: {
    display: "flex",
    flexDirection: "column",
    gap: "14px"
  },

  link: {
    color: "white",
    textDecoration: "none",
    padding: "16px",
    borderRadius: "12px",
    fontSize: "18px",
    transition: "0.3s"
  },

  logout: {
    padding: "14px",
    backgroundColor: "#ef4444",
    border: "none",
    borderRadius: "12px",
    color: "white",
    fontSize: "16px",
    cursor: "pointer"
  }

};

export default Sidebar;
