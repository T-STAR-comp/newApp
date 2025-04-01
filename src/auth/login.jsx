import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./styles/styles.module.css";

const Login = () => {
  const [credentials, setCredentials] = useState({
    role: "User",
    name: "",
    password: "",
  });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    if (credentials.role != "", credentials.name != "", credentials.password != "") {
      try {
        const Resp = await fetch (import.meta.env.VITE_Auth_Login_URL,{
          method: "POST",
          headers: {
            "Content-Type":"application/json"
          },
          body: JSON.stringify(credentials)
        });

        const Data = await Resp.json();
        if (Data.message === "ok") {
          sessionStorage.setItem("USER",Data.name);
          window.location.reload();
        };
      }
      catch (err) {
        if (err) {
          alert(err);
        };
      };
    }
    else {
      alert("Please fill all your details!");
    };
  };

  return (
    <div className={styles.login_container}>
      <div className={styles.login_card}>
        <h1 className={styles.login_title}>
          Welcome to <span className={styles.oasis}>Oasis</span>
        </h1>
        <select name="role" value={credentials.role} onChange={handleChange} className={styles.input_field}>
          <option value="User">User</option>
          <option value="Admin">Admin</option>
        </select>
        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          value={credentials.name}
          onChange={handleChange}
          className={styles.input_field}
        />
        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={credentials.password}
          onChange={handleChange}
          className={styles.input_field}
        />
        <button onClick={handleLogin} className={styles.login_button}>
          Log In
        </button>
        <Link to="/" className={styles.back_home}>
          ← Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default Login;
