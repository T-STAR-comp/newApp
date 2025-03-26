import { useState } from "react";
import styles from "./styles/styles.module.css";

const MasterAdmin = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", phone: "265991234567", role: "Admin" },
  ]);

  const [newUser, setNewUser] = useState({ name: "", phone: "",password:"", role: "" });
  //const [passwords, setPasswords] = useState({});

  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const addUser = () => {
    if (!newUser.name || !newUser.phone || !newUser.password || !newUser.role) {
      alert("Please fill in all fields.");
      return;
    }
    setUsers([...users, { ...newUser, id: users.length + 1 }]);
    setNewUser({ name: "", phone: "", password: "", role: "" });
    alert("User added successfully!");
  };

  const deleteUser = (userId) => {
    setUsers(users.filter((user) => user.id !== userId));
  };

  const updatePassword = (userId, newPassword) => {
    setPasswords({ ...passwords, [userId]: newPassword });
    alert("Password updated successfully!");
  };

  const logoutAdmin = () => {
    alert("Logging out...");
  };

  return (
    <div className={styles.master_admin_panel}>
      <div className={styles.header}>
        <h1 className={styles.master_title}>
          <span className={styles.oasis}>Oasis</span> Master Admin
        </h1>
        <button onClick={logoutAdmin} className={styles.logout_button}>
          Logout of Admin
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
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={newUser.phone}
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
                <strong>{user.name}</strong> - {user.phone} ({user.role})
                <button
                  onClick={() => deleteUser(user.id)}
                  className={styles.delete_button}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MasterAdmin;
