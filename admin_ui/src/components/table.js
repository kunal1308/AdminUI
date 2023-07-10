import React from "react";
import EditableRow from "./editableRow";
import "../styles/table.css";

const Table = ({
  users,
  setUsers,
  filteredUsers,
  setFilteredUsers,
  currentPage,
  editedRows,
  setEditedRows,
  selectedRows,
  setSelectedRows,
  rows,
  previousData,
  setPreviousData,
}) => {
  const displayedUsers = () => {
    const startIndex = (currentPage - 1) * rows; //to calculate starting index of users on current page.
    const endIndex = startIndex + rows;
    return filteredUsers.slice(startIndex, endIndex); // to display only restricted number of users on single page.
  };
  //functionality to select single row or multiple rows.
  const handleSelectedRow = (userId) => {
    if (selectedRows.includes(userId)) {
      setSelectedRows(selectedRows.filter((id) => id !== userId));
    } else {
      setSelectedRows([...selectedRows, userId]);
    }
  };

  //functionality to select all users on current page.
  const handleSelectAllRows = () => {
    const startIndex = (currentPage - 1) * rows; //to calculate starting index of users on current page.
    const endIndex = startIndex + rows;
    const displayedUserIds = filteredUsers
      .slice(startIndex, endIndex)
      .map((user) => user.id);

    const selectedRowIds =
      selectedRows.length === displayedUserIds.length ? [] : displayedUserIds;
    setSelectedRows(selectedRowIds);
  };

  //functionality to delete only selected row or multiple rows
  const handleDeleteRow = (id) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
    setFilteredUsers(updatedUsers);
  };

  const editRow = (rowId) => {
    setPreviousData(filteredUsers);
    setEditedRows((prevEditedRows) => [...prevEditedRows, rowId]);
  };

  //Funtionality to make delete button unresponsive while editing is in process clicked.
  const deleteDisabled = (id) => {
    return editedRows === id;
  };

  return (
    <section>
      <table className="table">
        <thead>
          <tr className="header-tr">
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
          {displayedUsers().map((user) => {
            const isEdited = editedRows.includes(user.id);
            return (
              <React.Fragment key={user.id}>
                {isEdited ? (
                  <EditableRow
                    users={users}
                    user={user}
                    setUsers={setUsers}
                    filteredUsers={filteredUsers}
                    setFilteredUsers={setFilteredUsers}
                    setEditedRows={setEditedRows}
                    selectedRows={selectedRows}
                    handleSelectedRow={handleSelectedRow}
                    editRow={editRow}
                    previousData={previousData}
                    setPreviousData={setPreviousData}
                  />
                ) : (
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
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>
                      <button onClick={() => editRow(user.id)}>
                        {String.fromCharCode(9998)}
                      </button>
                      <button
                        onClick={() => handleDeleteRow(user.id)}
                        disabled={deleteDisabled(user.id)}
                      >
                        {String.fromCharCode(9003)}
                      </button>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </section>
  );
};

export default Table;
