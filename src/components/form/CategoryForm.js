import React from "react";
// Fixed the relative path below by adding an extra '../' to escape out of the components folder properly
import "../../styles/CategoryForm.css"; 

const CategoryForm = ({ handleSubmit, value, setValue }) => {
  return (
    <>
      <form onSubmit={handleSubmit} className="custom-category-form">
        <div className="d-flex align-items-center gap-2 form-wrapper-row">
          <div className="flex-grow-1 input-container-focus">
            <input
              type="text"
              className="form-control custom-form-input"
              placeholder="Enter new category name..."
              value={value}
              onChange={(e) => setValue(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary custom-form-btn">
            SUBMIT
          </button>
        </div>
      </form>
    </>
  );
};

export default CategoryForm;