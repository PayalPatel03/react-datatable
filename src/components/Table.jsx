import React, { useRef, useState } from "react";
import DataTable from "react-data-table-component";

function Table({ handleDelete, handleEdit, users }) {
  const searchRef = useRef();
  const [textFilter, setTextFilter] = useState("");

  const usersData = users.filter((user) =>
    user.email.toLowerCase().includes(textFilter.toLowerCase())
  );

  const columns = [
   
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Password",
      selector: (row) => row.password,
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <>
          <button
            className="btn btn-danger btn-sm me-2"
            onClick={() => handleDelete(row.id)}
          >
            Delete
          </button>
          <button
            className="btn btn-warning btn-sm"
            onClick={() => handleEdit(row.id)}
          >
            Edit
          </button>
        </>
      ),
    },
  ];

  return (
    <div className="container py-3">
      <div className="row">
        <div className="col-md-8 mx-auto">
          <div className="mb-3">
            <input
              ref={searchRef}
              className="form-control"
              type="text"
              placeholder="Search here"
              value={textFilter}
              onChange={(e) => setTextFilter(e.target.value)}
            />
          </div>

          <DataTable
            title="User Data"
            data={usersData}
            columns={columns}
            pagination
            selectableRows
            highlightOnHover
            pointerOnHover
            responsive
            fixedHeader
            fixedHeaderScrollHeight="300px"
          />
        </div>
      </div>
    </div>
  );
}

export default Table;
