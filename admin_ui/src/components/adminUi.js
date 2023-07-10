import React, { useState, useEffect } from "react";
import SearchBar from "./searchBar";
import Table from "./table";
import Pagination from "./pagination";
import "../styles/adminUi.css";
import config from "../config/config";

const AdminUi = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [searchData, setSearchData] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [editedRows, setEditedRows] = useState([]);
  const [previousData, setPreviousData] = useState([]);
  const [rows] = useState(10);

  //using useEffect to make API call
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(config.API_URL);
        const data = await response.json();
        setUsers(data);
        setFilteredUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
        //handling error
      }
    };
    fetchUsers();
  }, []);

  return (
    <section className="ui-container">
      <SearchBar
        users={users}
        filteredUsers={filteredUsers}
        searchData={searchData}
        setSearchData={setSearchData}
        setFilteredUsers={setFilteredUsers}
        setCurrentPage={setCurrentPage}
      />

      <Table
        users={users}
        setUsers={setUsers}
        filteredUsers={filteredUsers}
        setFilteredUsers={setFilteredUsers}
        currentPage={currentPage}
        editedRows={editedRows}
        setEditedRows={setEditedRows}
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
        rows={rows}
        previousData={previousData}
        setPreviousData={setPreviousData}
      />

      <Pagination
        setUsers={setUsers}
        users={users}
        filteredUsers={filteredUsers}
        setFilteredUsers={setFilteredUsers}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        rows={rows}
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
      />
    </section>
  );
};
export default AdminUi;
