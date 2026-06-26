import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {

    e.preventDefault();

    const savedUser = JSON.parse(
      localStorage.getItem("user")
    );

    if (
      savedUser &&
      username === savedUser.username &&
      password === savedUser.password
    ) {

      localStorage.setItem("auth", "true");

      localStorage.setItem(
        "role",
        savedUser.role
      );

      navigate("/");

    } else {

      alert("Invalid Credentials");

    }

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
      width: "400px",
      boxShadow: "0px 0px 20px rgba(0,0,0,0.3)"
    },

    title: {
      color: "white",
      fontSize: "38px",
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
      backgroundColor: "#cbd5e1",
      color: "black",
      fontSize: "16px"
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
      color: "#06b6d4",
      cursor: "pointer",
      fontWeight: "bold"
    },

    button: {
      width: "100%",
      padding: "14px",
      backgroundColor: "#06b6d4",
      border: "none",
      borderRadius: "10px",
      color: "white",
      fontWeight: "bold",
      fontSize: "18px",
      cursor: "pointer",
      marginTop: "10px"
    },

    registerText: {
      color: "#22d3ee",
      textAlign: "center",
      marginTop: "20px",
      cursor: "pointer",
      fontSize: "16px"
    }

  };

  return (

    <div style={styles.container}>

      <form
        onSubmit={handleLogin}
        style={styles.card}
      >

        <h1 style={styles.title}>
          AI Surveillance Login
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
          Login
        </button>

        <p
          style={styles.registerText}
          onClick={() => navigate("/register")}
        >
          Create New Account
        </p>

      </form>

    </div>

  );
};

export default Login;
