import React, { useState, useEffect } from "react";
import axios from "axios";
import './App.css';

const API_URL =
  "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";


function App() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [searchData, setSearchData] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [editedRows, setEditedRows] = useState([]);
  const rows = 10;

  useEffect(() => {
    fetchUsers();
  }, []);

 

  const fetchUsers = async () => {
    try {
      const response = await axios.get(API_URL);
      setUsers(response.data);
      setFilteredUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleSearch = (event) => {
    const searchData = event.target.value.toLowerCase();
    setSearchData(searchData);

    const filteredData = users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchData) ||
        user.email.toLowerCase().includes(searchData) ||
        user.role.toLowerCase().includes(searchData)
    );

    setFilteredUsers(filteredData);
    setCurrentPage(1);
  };

  const handleSelectedRow = (userId) => {
    if (selectedRows.includes(userId)) {
      setSelectedRows(selectedRows.filter((id) => id !== userId))
    } else {
      setSelectedRows([...selectedRows, userId]);
    }
  };

  const handleSelectAllRows = () => {
    const displayedUserIds = filteredUsers
      .slice((currentPage - 1) * rows, currentPage * rows)
      .map((user) => user.id);

    const selectedRowIds =
      selectedRows.length === displayedUserIds.length ? [] : displayedUserIds;
    setSelectedRows(selectedRowIds);
  };

  const handleDeleteSelected = () => {
    const updatedUsers = users.filter((user) => !selectedRows.includes(user.id));
    setUsers(updatedUsers);
    setFilteredUsers(updatedUsers);
    setSelectedRows([]);
  };

  const handleDeleteRow = (id) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
    setFilteredUsers(updatedUsers);
  };

  const handleEditRow = (userId, property,value) => {
    setFilteredUsers((prevData) => {
      const updatedData = prevData.map((user) => {
        if(user.id === userId) {
          return {...user, [property] : value};
        }
        return user;
      });
      return updatedData;
    });
  };
    
  const editRow = (rowId) =>{
    setEditedRows((prevEditedRows)=>[...prevEditedRows, rowId])
  }
  const saveRow = (rowId) =>{
    setEditedRows((prevEditedRows)=> prevEditedRows.filter((id) => id !== rowId));
  }
  

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(filteredUsers.length/rows);
  const startIndex = (currentPage - 1) * rows;
  const endIndex = startIndex + rows;
  const displayedUsers = filteredUsers.slice(startIndex, endIndex);

  const paginationButtons = [];
  for (let i = 1; i <= totalPages; i++) {
    paginationButtons.push(
      <button key={i}
      onClick = {() => handlePageChange(i)}
      className = {currentPage === i ? "active" : ""}
      >
        {i}
      </button>
    )
  }

  return (
    <div className ="display">
       <div><h1>Admin User Interface</h1></div>
       <div>
    <input
      type="text"
      id="placeholder"
      placeholder="Search by name, email or role..."
      value={searchData}
      onChange={handleSearch}
    />
    </div>
    <div>
    <table>
      <thead>
        <tr>
          <th>
            <input
              type="checkbox"
              checked={selectedRows.length === currentPage * rows}
              onChange={handleSelectAllRows}
            />
          </th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
      {displayedUsers.map((user) => {
        const isEdited = editedRows.includes(user.id);
       return(
      <tr 
        key={user.id}
        className={selectedRows.includes(user.id) ? "selected" : ""}
      >
        <td>
          <input
            type="checkbox"
            checked={selectedRows.includes(user.id)}
            onChange={() => handleSelectedRow(user.id)}
          />
        </td>

        <td>{isEdited ? 
        (<input type="text" value={user.name} onChange={(e) => handleEditRow(user.id, "name", e.target.value)}/>
        ) : (user.name)}</td>
        <td>{isEdited ? 
        (<input type="text" value={user.email} onChange={(e) => handleEditRow(user.id, "email", e.target.value)}/>
        ) : (user.email)}</td>
        <td>{isEdited ? 
        (<input type="text" value={user.role} onChange={(e) => handleEditRow(user.id, "role", e.target.value)}/>
        ) : (user.role)}</td>

        <td>
      {isEdited ? (
        <button onClick={()=>saveRow(user.id)}>Save</button>
      ):(
         <button onClick={() => editRow(user.id)}>Edit</button>
      )}
        <button onClick={() => handleDeleteRow(user.id)}>Delete</button>
        </td>
      </tr>
       );
      })}
      </tbody>
      </table>
      </div>

<div className="buttons">
  <div>
    <button
      class="delete"
      disabled={selectedRows.length === 0}
      onClick={handleDeleteSelected}
    >
      Delete Selected
    </button>
  </div>
  <div>
    <button
      disabled={currentPage === 1}
      onClick={() => handlePageChange(1)}
    >
      First Page
    </button>
    <button
      disabled={currentPage === 1}
      onClick={() => handlePageChange(currentPage - 1)}
    >
      Previous Page
    </button>
    {paginationButtons}
    <button
      disabled={currentPage === totalPages}
      onClick={() => handlePageChange(currentPage + 1)}
    >
      Next Page
    </button>
    <button
      disabled={currentPage === totalPages}
      onClick={() => handlePageChange(totalPages)}
    >
      Last Page
    </button>
  </div>
</div>
</div>
);
};
export default App;
