const Navbar = () => {

  const role = localStorage.getItem("role");

  return (

    <div style={styles.navbar}>

      <h2 style={styles.title}>
        Smart AI Surveillance System
      </h2>

      <div style={styles.user}>

        Logged in as:
        <span style={styles.role}>
          {role}
        </span>

      </div>

    </div>

  );
};

const styles = {

  navbar: {
    backgroundColor: "#0f172a",
    padding: "20px 40px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: "white"
  },

  title: {
    fontSize: "24px"
  },

  user: {
    fontSize: "16px"
  },

  role: {
    color: "#22d3ee",
    marginLeft: "10px",
    fontWeight: "bold"
  }

};

export default Navbar;
