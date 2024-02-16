import React, { useState, useEffect } from "react";
import axios from "axios";
import "../src/index.css";

const Profile = ({ name, email }) => {
  return (
    <div className="profile">
      <img src={`https://robohash.org/${name}`} alt={name} />
      <div className="profile-info">
        <p className="name">{name}</p>
        <p className="email">{email}</p>
      </div>
    </div>
  );
};

function Dashboard() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  async function fetchData() {
    try {
      const res = await axios.get(
        "https://mocki.io/v1/ddb7e0a8-e218-4e36-b1be-b902cdb1c098"
      );
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  function filterData(role, searchTerm) {
    return data.filter((item) => {
      if (!item || !item.first_name || !item.email) {
        return false;
      }

      const roleLower = role ? role.toLowerCase() : "";
      const firstNameLower = item.first_name.toLowerCase();
      const emailLower = item.email.toLowerCase();
      const searchTermLower = searchTerm ? searchTerm.toLowerCase() : "";

      return (
        (roleLower === "all" || roleLower === item.role.toLowerCase()) &&
        (firstNameLower.includes(searchTermLower) ||
          emailLower.includes(searchTermLower))
      );
    });
  }

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="dashboard container-fluid">
      <div className="team">
        <h1>Team</h1>
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={handleChange}
        />
      </div>

      <div className="section">
        <h2>Administrators</h2>
        <div className="profiles">
          {filterData("admin", search).map((item) => (
            <Profile key={item.id} name={item.first_name} email={item.email} />
          ))}
        </div>
      </div>
      <br />
      <hr />
      <br />
      <div className="section">
        <h2>Members</h2>
        <div className="profiles">
          {filterData("member", search).map((item) => (
            <Profile key={item.id} name={item.first_name} email={item.email} />
          ))}
        </div>
      </div>
      <button className="add-button">+</button>
    </div>
  );
}

export default Dashboard;
