import React from "react";
import "../styles/editableRow.css";

const EditableRow = ({
  user,
  setUsers,
  setFilteredUsers,
  setEditedRows,
  selectedRows,
  handleSelectedRow,
  previousData,
  setPreviousData,
}) => {
  //functionality to handle edit row
  const handleEditRow = (userId, property, value) => {
    setFilteredUsers((prevData) => {
      const updatedData = prevData.map((user) => {
        if (user.id === userId) {
          return { ...user, [property]: value, isEditing: false };
        }
        return user;
      });
      setUsers(updatedData);
      setFilteredUsers(updatedData);
      return updatedData;
    });
  };

  //functionality to handle cancelEdit button
  const handleCancelEdit = (userId) => {
    const confirmation = window.confirm(
      "Are you sure want to cancel the editing?"
    );
    if (confirmation) {
      setFilteredUsers(previousData);
      setPreviousData([]);
      saveRow(user.id);
    }
  };

  //functionality to handle save row
  const saveRow = (userId) => {
    setEditedRows((prevEditedRows) =>
      prevEditedRows.filter((id) => id !== userId)
    );
  };

  return (
    <tr className="editable-row">
      <td>
        <input
          type="checkbox"
          checked={selectedRows.includes(user.id)}
          onChange={() => handleSelectedRow(user.id)}
        />
      </td>
      <td>
        <input
          type="text"
          className="editable-input"
          value={user.name}
          onChange={(e) => handleEditRow(user.id, "name", e.target.value)} // Calling handleEditRow function to change name
        />
      </td>
      <td>
        <input
          type="text"
          className="editable-input"
          value={user.email}
          onChange={(e) => handleEditRow(user.id, "email", e.target.value)} // Calling handleEditRow function to change email
        />
      </td>
      <td>
        <input
          type="text"
          className="editable-input"
          value={user.role}
          onChange={(e) => handleEditRow(user.id, "role", e.target.value)} // Calling handleEditRow function to change role
        />
      </td>
      <td>
        <button className="" onClick={() => handleCancelEdit(user.id)}>
          {String.fromCharCode(10006)}
        </button>
        <button className="done-btn" onClick={() => saveRow(user.id)}>
          {String.fromCharCode(9989)}
        </button>
      </td>
    </tr>
  );
};

export default EditableRow;
