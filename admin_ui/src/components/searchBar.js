import React from "react";
import "../styles/searchBar.css";

const SearchBar = ({
  users,
  searchData,
  setSearchData,
  setFilteredUsers,
  setCurrentPage,
}) => {
  //functionality to handle search
  const handleSearch = (event) => {
    const searchData = event.target.value;
    setSearchData(searchData);
    const filteredData = users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchData.toLowerCase()) ||
        user.email.toLowerCase().includes(searchData.toLowerCase()) ||
        user.role.toLowerCase().includes(searchData.toLowerCase())
    );
    setFilteredUsers(filteredData);
    setCurrentPage(1);
  };

  return (
    <div className="placeholder">
      <div>
        <input
          type="text"
          id="placeholder"
          placeholder="Search by name, email or role..."
          value={searchData}
          onChange={(event) => handleSearch(event)}
        />
      </div>
      {users.length === 0 && <h4>No users found</h4>}
    </div>
  );
};
export default SearchBar;
