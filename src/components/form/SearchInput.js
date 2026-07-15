import React from "react";
import { useSearch } from "../../context/search";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SearchInput = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();

  if (!values) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/search/${values.keyword}`
      );
      setValues({ ...values, results: data });
      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ maxWidth: "340px", width: "100%" }}>
      <form className="d-flex align-items-center position-relative" role="search" onSubmit={handleSubmit}>
        <input
          className="form-control px-3 rounded-pill"
          type="search"
          placeholder="Search for timepieces..."
          aria-label="Search"
          value={values?.keyword || ""}
          onChange={(e) => setValues({ ...values, keyword: e.target.value })}
          style={{
            height: "40px",
            fontSize: "14px",
            backgroundColor: "#f8fafc",
            border: "1px solid #cbd5e1",
            paddingRight: "50px", // Gives space so text doesn't hide underneath the button
            transition: "all 0.2s ease-in-out",
          }}
          onFocus={(e) => {
            e.target.style.backgroundColor = "#ffffff";
            e.target.style.borderColor = "#4f46e5";
            e.target.style.boxShadow = "0 0 0 4px rgba(79, 70, 229, 0.1)";
          }}
          onBlur={(e) => {
            e.target.style.backgroundColor = "#f8fafc";
            e.target.style.borderColor = "#cbd5e1";
            e.target.style.boxShadow = "none";
          }}
        />
        <button
          className="btn position-absolute end-0 top-50 translate-middle-y rounded-pill d-flex align-items-center justify-content-center"
          type="submit"
          style={{
            height: "34px",
            marginRight: "4px",
            backgroundColor: "#4f46e5",
            color: "#ffffff",
            border: "none",
            fontSize: "12px",
            fontWeight: "700",
            letterSpacing: "0.5px",
            padding: "0 14px",
            zIndex: 5,
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#4338ca")}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#4f46e5")}
        >
          🔍
        </button>
      </form>
    </div>
  );
};

export default SearchInput;