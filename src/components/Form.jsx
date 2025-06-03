import React from "react";

function Form({ handleChange, handleSubmit, user }) {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4 mx-auto">
          <form method="post" onSubmit={handleSubmit}>
            <h2 className="mt-3">Login</h2>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email 
              </label>
              <input
                onChange={handleChange}
                value={user.email || ""}
                name="email"
                type="email"
                className="form-control"
                id="email"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                onChange={handleChange}
                value={user.password || ""}
                name="password"
                type="password"
                className="form-control"
                id="password"
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Form;
