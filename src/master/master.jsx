import { useState, useEffect } from "react";
import styles from "./styles/styles.module.css";

const MasterAdmin = () => {

  useEffect(() => {
    FetchUsers();
  }, []);

  const [users, setUsers] = useState([
    { id: 1, name: "test test", phone: "test00000", role: "TEST" },
  ]);

  const [newUser, setNewUser] = useState({ name: "", phonenumber: "",password:"", role: "" });
  //const [passwords, setPasswords] = useState({});

  const FetchUsers = async () => {
    try{
      const Resp = await fetch (import.meta.env.VITE_GetUsersURL);
      const Data = await Resp.json();
      if (Data.length > 0) {
        setUsers(Data);
      };
    }
    catch(err) {
      if (err) {
        alert(err);
      };
    };
  };

  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const addUser = async () => {
    if (!newUser.name || !newUser.phonenumber || !newUser.password || !newUser.role) {
      alert("Please fill in all fields.");
      return;
    }
    
    try {
      const Resp = await fetch(import.meta.env.VITE_CreateNewUserURL,{
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(newUser),
      });

      const Data = await Resp.json();
      setNewUser({name: "", phonenumber: "",password:"", role: ""});
      window.location.reload();

    }
    catch (err) {
      if (err) {
        alert(err);
      };
    };
  };

  const deleteUser = async (name) => {
    if (name) {
      try {
        const Resp = await fetch (import.meta.env.VITE_DeleteUserURL,{
          method: "DELETE",
          headers: {
            "Content-Type":"application/json"
          },
          body: JSON.stringify({name})
        });

        const Data = await Resp.json();
        window.location.reload();
      }
      catch (err) {
        if (err) {
          alert(err);
        };
      };
    };
  };

  const updatePassword = (userId, newPassword) => {
    setPasswords({ ...passwords, [userId]: newPassword });
    alert("Password updated successfully!");
  };

  const logoutAdmin = () => {
    sessionStorage.removeItem("ADMIN");
    window.location.reload();
  };

  return (
    <div className={styles.master_admin_panel}>
      <div className={styles.header}>
        <h1 className={styles.master_title}>
          <span className={styles.oasis}>Oasis</span> Master Admin
        </h1>
        
        <button onClick={logoutAdmin} className={styles.logout_button}>
          Logout of Master
        </button>
      </div>

      {/* Add User */}
      <div className={styles.add_user_form}>
        <h2>Create User</h2>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={newUser.name}
          onChange={handleUserChange}
          className={styles.input_field}
        />
        <input
          type="number"
          minLength={9}
          maxLength={10}
          name="phonenumber"
          placeholder="Phone Number"
          value={newUser.phonenumber}
          onChange={handleUserChange}
          className={styles.input_field}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          value={newUser.password}
          onChange={handleUserChange}
          className={styles.input_field}
        />
        <select
          name="role"
          value={newUser.role}
          onChange={handleUserChange}
          className={styles.input_field}
        >
          <option value="">Select Role</option>
          <option value="Admin">Admin</option>
          <option value="User">User</option>
        </select>
        <button onClick={addUser} className={styles.add_user_button}>
          Add User
        </button>
      </div>

      {/* Users List */}
      <div className={styles.user_list}>
        <h2>Users</h2>
        {users.length === 0 ? (
          <p>No users added yet.</p>
        ) : (
          <ul>
            {users.map((user) => (
              <li key={user.id} className={styles.user_item}>
                <strong>{user.name}</strong> - {user.phonenumber} ({user.role})
                {
                  user.role === "Admin" ? 
                  <button
                  onClick={() => deleteUser(user.name)}
                  className={styles.delete_button}
                >
                  Delete
                </button>
                  :
                  <button
                  onClick={() => deleteUser(user.name)}
                  className={styles.delete_button}
                >
                  Delete
                </button>
                }
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MasterAdmin;
