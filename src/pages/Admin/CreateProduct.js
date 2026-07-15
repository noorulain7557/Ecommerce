import React, { useState, useEffect } from "react";
import Layout from "./../../components/layout/Layout";
import AdminMenu from "./../../components/layout/AdminMenu";
import { toast } from "react-toastify";
import axios from "axios";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
const { Option } = Select;

const CreateProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");

  // Common styling rules for uniform inputs
  const inputStyle = {
    padding: "12px 16px",
    borderRadius: "10px",
    backgroundColor: "#f8fafc",
    border: "1px solid #cbd5e1",
    fontSize: "14px",
    fontWeight: "500",
    color: "#0f172a",
    transition: "all 0.2s ease-in-out",
  };

  const handleInputFocus = (e) => {
    e.target.style.backgroundColor = "#ffffff";
    e.target.style.borderColor = "#4f46e5";
    e.target.style.boxShadow = "0 0 0 4px rgba(79, 70, 229, 0.1)";
  };

  const handleInputBlur = (e) => {
    e.target.style.backgroundColor = "#f8fafc";
    e.target.style.borderColor = "#cbd5e1";
    e.target.style.boxShadow = "none";
  };

  //get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`);
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting catgeory");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  //create product function
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      productData.append("category", category);
      productData.append("shipping", shipping);
      
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/create-product`,
        productData
      );
      if (data?.success === false) {
        toast.error(data?.message);
      } else {
        toast.success("Product Created Successfully");
        navigate("/dashboard/admin/products");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  return (
    <Layout title={"Dashboard - Create Product"}>
      <div 
        className="container-fluid py-5 px-md-5"
        style={{ 
          backgroundColor: "#f8fafc", 
          minHeight: "90vh",
          fontFamily: "'Plus Jakarta Sans', sans-serif" 
        }}
      >
        <div className="row g-4" style={{ maxWidth: "1400px", margin: "0 auto" }}>
          {/* Admin Navigation Sidebar */}
          <div className="col-md-3">
            <div className="shadow-sm rounded-4 bg-white p-2" style={{ border: "1px solid #e2e8f0" }}>
              <AdminMenu />
            </div>
          </div>

          {/* Product Creation Form Workspace Panel */}
          <div className="col-md-9">
            <div className="card shadow-sm border-0 rounded-4 p-4 bg-white" style={{ border: "1px solid #e2e8f0" }}>
              <h2 className="fw-bold text-dark mb-4" style={{ letterSpacing: "-0.5px" }}>
                Inventory Intake: Create New Product
              </h2>

              <div className="w-100" style={{ maxWidth: "700px" }}>
                
                {/* Ant Design Category Selection Wrapper */}
                <div className="mb-4">
                  <label className="form-label text-muted small fw-bold text-uppercase mb-2">Product Category</label>
                  <div className="rounded-3 p-1" style={{ backgroundColor: "#f8fafc", border: "1px solid #cbd5e1" }}>
                    <Select
                      bordered={false}
                      placeholder="Select a category"
                      size="large"
                      showSearch
                      className="w-100 fw-medium"
                      dropdownStyle={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                      onChange={(value) => setCategory(value)}
                    >
                      {categories?.map((c) => (
                        <Option key={c._id} value={c._id}>
                          {c.name}
                        </Option>
                      ))}
                    </Select>
                  </div>
                </div>

                {/* File Upload Canvas Button wrapper */}
                <div className="mb-4">
                  <label className="form-label text-muted small fw-bold text-uppercase mb-2">Display Showcase Photo</label>
                  <label 
                    className="btn w-100 py-3 d-flex flex-column align-items-center justify-content-center border-dashed rounded-4 transition-all"
                    style={{ 
                      border: "2px dashed #cbd5e1", 
                      backgroundColor: "#f8fafc",
                      color: "#475569",
                      cursor: "pointer"
                    }}
                    onMouseOver={(e) => { e.currentTarget.style.backgroundColor = "#f1f5f9"; e.currentTarget.style.borderColor = "#4f46e5"; }}
                    onMouseOut={(e) => { e.currentTarget.style.backgroundColor = "#f8fafc"; e.currentTarget.style.borderColor = "#cbd5e1"; }}
                  >
                    <span className="fs-4 mb-1">📤</span>
                    <span className="fw-semibold small">{photo ? photo.name : "Click to select or upload display asset"}</span>
                    <input
                      type="file"
                      name="photo"
                      accept="image/*"
                      onChange={(e) => setPhoto(e.target.files[0])}
                      hidden
                    />
                  </label>
                </div>

                {/* Dynamic Image Preview Mirror */}
                {photo && (
                  <div className="mb-4 text-center p-3 rounded-4" style={{ backgroundColor: "#f1f5f9", border: "1px solid #e2e8f0" }}>
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product_preview"
                      style={{ height: "180px", objectFit: "contain", borderRadius: "12px" }}
                      className="img-fluid shadow-sm bg-white p-2"
                    />
                  </div>
                )}

                {/* Text Title Form String block */}
                <div className="mb-3">
                  <label className="form-label text-muted small fw-bold text-uppercase mb-1">Product Title Name</label>
                  <input
                    type="text"
                    value={name}
                    placeholder="e.g. Minimalist Gold Chronograph"
                    className="form-control"
                    style={inputStyle}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                {/* Text Description Blockarea item layout */}
                <div className="mb-3">
                  <label className="form-label text-muted small fw-bold text-uppercase mb-1"> Description</label>
                  <textarea
                    rows={4}
                    value={description}
                    placeholder="Describe the aesthetic, movement mechanism, dimensions, materials, and finish specifics..."
                    className="form-control"
                    style={{ ...inputStyle, resize: "none" }}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </div>

                {/* Metrics Numerics Row Container split */}
                <div className="row g-3 mb-4">
                  <div className="col-md-6">
                    <label className="form-label text-muted small fw-bold text-uppercase mb-1">Retail Price ($)</label>
                    <input
                      type="number"
                      value={price}
                      placeholder="0.00"
                      className="form-control"
                      style={inputStyle}
                      onFocus={handleInputFocus}
                      onBlur={handleInputBlur}
                      onChange={(e) => setPrice(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label text-muted small fw-bold text-uppercase mb-1">Stock Quantity</label>
                    <input
                      type="number"
                      value={quantity}
                      placeholder="100"
                      className="form-control"
                      style={inputStyle}
                      onFocus={handleInputFocus}
                      onBlur={handleInputBlur}
                      onChange={(e) => setQuantity(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Shipping Logistics Selector */}
                <div className="mb-4">
                  <label className="form-label text-muted small fw-bold text-uppercase mb-2">Available for Shipping</label>
                  <div className="rounded-3 p-1" style={{ backgroundColor: "#f8fafc", border: "1px solid #cbd5e1" }}>
                    <Select
                      bordered={false}
                      placeholder="Select Shipping Option"
                      size="large"
                      className="w-100 fw-medium"
                      dropdownStyle={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                      onChange={(value) => setShipping(value)}
                    >
                      <Option value="0">No (Local Pickup Only)</Option>
                      <Option value="1">Yes (Global Express Logistics)</Option>
                    </Select>
                  </div>
                </div>

                {/* Trigger Button Execution Callout */}
                <div className="mt-5">
                  <button 
                    className="btn w-100 py-3 text-white fw-bold shadow-sm"
                    style={{
                      backgroundColor: "#4f46e5",
                      borderRadius: "12px",
                      letterSpacing: "0.5px",
                      fontSize: "14px",
                      border: "none",
                      transition: "all 0.2s"
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#4338ca")}
                    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#4f46e5")}
                    onClick={handleCreate}
                  >
                    Submit
                  </button>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;