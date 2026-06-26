import Sidebar from "../../components/layout/Sidebar";
import Navbar from "../../components/layout/Navbar";

const Monitoring = () => {

  const styles = {

    container: {
      display: "flex",
      backgroundColor: "#020617",
      minHeight: "100vh"
    },

    content: {
      marginLeft: "260px",
      width: "100%"
    },

    body: {
      padding: "32px",
      color: "white"
    },

    title: {
      fontSize: "40px",
      fontWeight: "bold",
      marginBottom: "32px"
    },

    wrapper: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    },

    card: {
      backgroundColor: "#0f172a",
      padding: "20px",
      borderRadius: "24px",
      border: "2px solid #22d3ee",
      boxShadow: "0px 0px 25px rgba(34, 211, 238, 0.3)"
    },

    image: {
      width: "900px",
      height: "550px",
      objectFit: "cover",
      borderRadius: "16px"
    }

  };

  return (

    <div style={styles.container}>

      <Sidebar />

      <div style={styles.content}>

        <Navbar />

        <div style={styles.body}>

          <h1 style={styles.title}>
            Live Monitoring
          </h1>

          <div style={styles.wrapper}>

            <div style={styles.card}>

              <img
                src="http://127.0.0.1:5000/video_feed"
                alt="Live Camera Feed"
                style={styles.image}
              />

            </div>

          </div>

        </div>

      </div>

    </div>

  );
};

export default Monitoring;