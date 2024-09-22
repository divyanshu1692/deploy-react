import { useEffect, useState } from "react";

const INITIAL_STATE = { username: "", email: "" };

function App() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState(INITIAL_STATE);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const res = await fetch(`${apiUrl}/users`);
      const { data } = await res.json();
      setUsers(data);
    } catch (error) {
      console.log("Error whiel getting data", error.message);
    }
  }

  const addUser = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiUrl}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      // setFormData(INITIAL_STATE);
      await getUser();
      
    } catch (error) {
      console.log("Error whiel getting data", error.message);
    }
  }

  console.log("formData", formData);


  return (
    <>
      <h1>Dev ops project</h1>

      <form>
        <div>
          <label htmlFor="username">Username</label>
          <input type="text" name="username" value={formData.username} placeholder="Enter your username..." required onChange={e => setFormData({ ...formData, username: e.target.value })} />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="text" name="email" value={formData.email} placeholder="Enter your username..." required onChange={e => setFormData({ ...formData, email: e.target.value })} />
        </div>
        <div>
          <button onClick={addUser}>Save Changes</button>
        </div>
      </form>

      <div>
        {
          users.map((user, index) => (
            <p key={index}>username: {user.username}, email: {user.username}</p>
          ))
        }
      </div>
    </>
  )
}

export default App
