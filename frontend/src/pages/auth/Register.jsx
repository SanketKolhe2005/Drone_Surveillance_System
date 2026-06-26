import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [role, setRole] = useState("user");

  const handleRegister = (e) => {

    e.preventDefault();

    const userData = {
      username,
      email,
      password,
      role
    };

    localStorage.setItem(
      "user",
      JSON.stringify(userData)
    );

    alert("Registration Successful");

    navigate("/login");

  };

  return (

    <div style={styles.container}>

      <form
        onSubmit={handleRegister}
        style={styles.card}
      >

        <h1 style={styles.title}>
          Register
        </h1>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) =>
            setUsername(e.target.value)
          }
          style={styles.input}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          style={styles.input}
        />

        <select
          value={role}
          onChange={(e) =>
            setRole(e.target.value)
          }
          style={styles.input}
        >
          <option value="user">
            User
          </option>

          <option value="admin">
            Admin
          </option>

        </select>

        <div style={styles.passwordWrapper}>

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            style={styles.input}
          />

          <button
            type="button"
            onClick={() =>
              setShowPassword(!showPassword)
            }
            style={styles.eyeButton}
          >
            {showPassword ? "OFF" : "SHOW"}
          </button>

        </div>

        <button
          type="submit"
          style={styles.button}
        >
          Register
        </button>

      </form>

    </div>

  );
};

const styles = {

  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#020617"
  },

  card: {
    backgroundColor: "#0f172a",
    padding: "40px",
    borderRadius: "20px",
    width: "400px"
  },

  title: {
    color: "white",
    fontSize: "36px",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: "30px"
  },

  input: {
    width: "100%",
    padding: "14px",
    marginBottom: "20px",
    borderRadius: "10px",
    border: "none",
    backgroundColor: "#1e293b",
    color: "white"
  },

  passwordWrapper: {
    position: "relative"
  },

  eyeButton: {
    position: "absolute",
    right: "15px",
    top: "12px",
    background: "none",
    border: "none",
    color: "#22d3ee",
    cursor: "pointer"
  },

  button: {
    width: "100%",
    padding: "14px",
    backgroundColor: "#06b6d4",
    border: "none",
    borderRadius: "10px",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer"
  }

};

export default Register;