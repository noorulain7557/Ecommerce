import React, { useState, useEffect } from "react";
import Layout from "./../../components/layout/Layout";
import AdminMenu from "./../../components/layout/AdminMenu";
import { toast } from "react-toastify";
import axios from "axios";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
const { Option } = Select;

const UpdateProduct = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");
  const [id, setId] = useState("");

  // Clean uniform input styling base variables
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

  //get single product
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`
      );
      setName(data.product.name);
      setId(data.product._id);
      setDescription(data.product.description);
      setPrice(data.product.price);
      setQuantity(data.product.quantity);
      setShipping(data.product.shipping);
      setCategory(data.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleProduct();
    //eslint-disable-next-line
  }, []);

  //get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`);
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting category");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  //update product function
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      photo && productData.append("photo", photo);
      productData.append("category", category);
      productData.append("shipping", shipping);
      
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/product/update-product/${id}`,
        productData
      );
      if (data?.success === false) {
        toast.error(data?.message);
      } else {
        toast.success("Product Updated Successfully");
        navigate("/dashboard/admin/products");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  //delete a product
  const handleDelete = async () => {
    try {
      let answer = window.prompt("Are You Sure want to delete this product ? ");
      if (!answer) return;
      await axios.delete(
        `${process.env.REACT_APP_API}/api/v1/product/delete-product/${id}`
      );
      toast.success("Product Deleted Successfully");
      navigate("/dashboard/admin/products");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title={"Dashboard - Update Product"}>
      <div 
        className="container-fluid py-5 px-md-5"
        style={{ 
          backgroundColor: "#f8fafc", 
          minHeight: "90vh",
          fontFamily: "'Plus Jakarta Sans', sans-serif" 
        }}
      >
        <div className="row g-4" style={{ maxWidth: "1400px", margin: "0 auto" }}>
          {/* Admin Navigation Sidebar Layout */}
          <div className="col-md-3">
            <div className="shadow-sm rounded-4 bg-white p-2" style={{ border: "1px solid #e2e8f0" }}>
              <AdminMenu />
            </div>
          </div>

          {/* Product Modification Control panel */}
          <div className="col-md-9">
            <div className="card shadow-sm border-0 rounded-4 p-4 bg-white" style={{ border: "1px solid #e2e8f0" }}>
              <h2 className="fw-bold text-dark mb-4" style={{ letterSpacing: "-0.5px" }}>
                Modify Master Inventory Entry
              </h2>

              <div className="w-100" style={{ maxWidth: "700px" }}>
                
                {/* Select category layout element block */}
                <div className="mb-4">
                  <label className="form-label text-muted small fw-bold text-uppercase mb-2">Assign Category</label>
                  <div className="rounded-3 p-1" style={{ backgroundColor: "#f8fafc", border: "1px solid #cbd5e1" }}>
                    <Select
                      bordered={false}
                      placeholder="Select a category"
                      size="large"
                      showSearch
                      className="w-100 fw-medium"
                      dropdownStyle={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                      onChange={(value) => setCategory(value)}
                      value={category}
                    >
                      {categories?.map((c) => (
                        <Option key={c._id} value={c._id}>
                          {c.name}
                        </Option>
                      ))}
                    </Select>
                  </div>
                </div>

                {/* Photo Update triggering area box */}
                <div className="mb-4">
                  <label className="form-label text-muted small fw-bold text-uppercase mb-2">Replace Graphic Asset</label>
                  <label 
                    className="btn w-100 py-3 d-flex flex-column align-items-center justify-content-center border-dashed rounded-4"
                    style={{ 
                      border: "2px dashed #cbd5e1", 
                      backgroundColor: "#f8fafc",
                      color: "#475569",
                      cursor: "pointer",
                      transition: "all 0.2s"
                    }}
                    onMouseOver={(e) => { e.currentTarget.style.backgroundColor = "#f1f5f9"; e.currentTarget.style.borderColor = "#4f46e5"; }}
                    onMouseOut={(e) => { e.currentTarget.style.backgroundColor = "#f8fafc"; e.currentTarget.style.borderColor = "#cbd5e1"; }}
                  >
                    <span className="fs-4 mb-1">🔄</span>
                    <span className="fw-semibold small">{photo ? photo.name : "Upload new image or keep legacy"}</span>
                    <input
                      type="file"
                      name="photo"
                      accept="image/*"
                      onChange={(e) => setPhoto(e.target.files[0])}
                      hidden
                    />
                  </label>
                </div>

                {/* Legacy vs New Photo Showcase container */}
                <div className="mb-4 text-center p-3 rounded-4" style={{ backgroundColor: "#f1f5f9", border: "1px solid #e2e8f0" }}>
                  {photo ? (
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product_photo_new"
                      style={{ height: "180px", objectFit: "contain", borderRadius: "12px" }}
                      className="img-fluid shadow-sm bg-white p-2"
                    />
                  ) : (
                    <img
                      src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${id}`}
                      alt="product_photo_legacy"
                      style={{ height: "180px", objectFit: "contain", borderRadius: "12px" }}
                      className="img-fluid shadow-sm bg-white p-2"
                    />
                  )}
                </div>

                {/* Item Label Name string component */}
                <div className="mb-3">
                  <label className="form-label text-muted small fw-bold text-uppercase mb-1">Product Title Label</label>
                  <input
                    type="text"
                    value={name}
                    placeholder="Write product title label..."
                    className="form-control"
                    style={inputStyle}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                {/* Production description area string value */}
                <div className="mb-3">
                  <label className="form-label text-muted small fw-bold text-uppercase mb-1">Product Narrative Specifications</label>
                  <textarea
                    rows={4}
                    value={description}
                    placeholder="Write technical copy descriptions..."
                    className="form-control"
                    style={{ ...inputStyle, resize: "none" }}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                {/* Double inline splits for integers configurations */}
                <div className="row g-3 mb-4">
                  <div className="col-md-6">
                    <label className="form-label text-muted small fw-bold text-uppercase mb-1">Price Evaluation ($)</label>
                    <input
                      type="number"
                      value={price}
                      placeholder="0.00"
                      className="form-control"
                      style={inputStyle}
                      onFocus={handleInputFocus}
                      onBlur={handleInputBlur}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label text-muted small fw-bold text-uppercase mb-1">Remaining Stock Value</label>
                    <input
                      type="number"
                      value={quantity}
                      placeholder="0"
                      className="form-control"
                      style={inputStyle}
                      onFocus={handleInputFocus}
                      onBlur={handleInputBlur}
                      onChange={(e) => setQuantity(e.target.value)}
                    />
                  </div>
                </div>

                {/* Dropdown for logistics updates */}
                <div className="mb-5">
                  <label className="form-label text-muted small fw-bold text-uppercase mb-2">Fulfillment Mode Status</label>
                  <div className="rounded-3 p-1" style={{ backgroundColor: "#f8fafc", border: "1px solid #cbd5e1" }}>
                    <Select
                      bordered={false}
                      placeholder="Select Shipping options"
                      size="large"
                      className="w-100 fw-medium"
                      dropdownStyle={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                      onChange={(value) => setShipping(value)}
                      value={shipping ? "1" : "0"}
                    >
                      <Option value="0">No (Local Warehouse Hold Only)</Option>
                      <Option value="1">Yes (Global Freight Eligible)</Option>
                    </Select>
                  </div>
                </div>

                {/* Integrated Operations execution grid section */}
                <div className="row g-3">
                  <div className="col-sm-8">
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
                      onClick={handleUpdate}
                    >
                      SAVE 
                    </button>
                  </div>
                  <div className="col-sm-4">
                    <button 
                      className="btn w-100 py-3 fw-bold shadow-sm"
                      style={{
                        backgroundColor: "#fee2e2",
                        color: "#dc2626",
                        borderRadius: "12px",
                        letterSpacing: "0.5px",
                        fontSize: "14px",
                        border: "1px solid #fca5a5",
                        transition: "all 0.2s"
                      }}
                      onMouseOver={(e) => { e.currentTarget.style.backgroundColor = "#fecaca"; }}
                      onMouseOut={(e) => { e.currentTarget.style.backgroundColor = "#fee2e2"; }}
                      onClick={handleDelete}
                    >
                      DELETE
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;