import React, { useState, useEffect } from 'react';
import '../styles/App.css';

const App = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sortAscending, setSortAscending] = useState(true);

  // fetch users data from API
  const fetchUsersData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://content.newtonschool.co/v1/pr/main/users');
      const data = await response.json();
      setUsers(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  // sort users by name length
  const sortUsersByNameLength = () => {
    setSortAscending(!sortAscending);
    const sortedUsers = [...users].sort((a, b) =>
      sortAscending ? a.name.length - b.name.length : b.name.length - a.name.length
    );
    setUsers(sortedUsers);
  };

  return (
    <div id="main">
      <h2>User List</h2>
      <button className="fetch-data-btn" onClick={fetchUsersData}>
        Fetch User Data
      </button>
      <button className="sort-btn" onClick={sortUsersByNameLength}>
        {sortAscending
          ? 'Sort by name length (ascending)'
          : 'Sort by name length (descending)'}
      </button>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="users-section">
          {users.map((user) => (
            <li key={user.id}>
              <section className="id-section">{user.id}</section>
              <section className="name-email-section">
                <p className="name">Name: {user.name}</p>
                <p className="email">Email: {user.email}</p>
              </section>
            </li>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;