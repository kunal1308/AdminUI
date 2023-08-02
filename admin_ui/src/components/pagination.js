import React from "react";
import "../styles/pagination.css";

const Pagination = ({
  setUsers,
  users,
  filteredUsers,
  setFilteredUsers,
  selectedRows,
  setSelectedRows,
  currentPage,
  setCurrentPage,
  rows,
}) => {
  //functionality to handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

   //functionality to handle deleteselected button
  const handleDeleteSelected = () => {
    const updatedUsers = users.filter(
      (user) => !selectedRows.includes(user.id)
    );
    const updatedFilteredUsers = filteredUsers.filter(
      (user) => !selectedRows.includes(user.id)
    );

    setUsers(updatedUsers);
    setFilteredUsers(updatedFilteredUsers);
    setSelectedRows([]);
  };

  const totalPages = Math.ceil(users.length / rows);
  const paginationButtons = [];
  for (let i = 1; i <= totalPages; i++) {  //logic to create pagination buttons using js.
    paginationButtons.push(
      <button
        key={i}
        id="pagination"
        onClick={() => handlePageChange(i)}
        className={currentPage === i ? "active" : ""}
      >
        {i}
      </button>
    );
  }

  return (
    <section className="pagination-buttons">
      <section className="delete-selected">
        <button
          className="delete"
          disabled={selectedRows.length === 0}
          onClick={handleDeleteSelected}
        >
          Delete Selected
        </button>
      </section>
      <div>
        <button className="page-buttons"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(1)}
        >
          &laquo;
        </button>
        <button className="page-buttons"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          &lt;
        </button>
        {paginationButtons}
        <button className="page-buttons"
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          &gt;
        </button>
        <button className="page-buttons"
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(totalPages)}
        >
          &raquo;
        </button>
      </div>
    </section>
  );
};
export default Pagination;
