import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/layout/AdminMenu";
import Layout from "./../../components/layout/Layout";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);

  //getall products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-product`);
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  //lifecycle method
  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout title={"All Products - Admin Panel"}>
      <div 
        className="container-fluid py-5 px-md-5"
        style={{ 
          backgroundColor: "#f8fafc", 
          minHeight: "90vh",
          fontFamily: "'Plus Jakarta Sans', sans-serif" 
        }}
      >
        <div className="row g-4" style={{ maxWidth: "1400px", margin: "0 auto" }}>
          {/* Admin Navigation Menu Sidebar */}
          <div className="col-md-3">
            <div className="shadow-sm rounded-4 bg-white p-2" style={{ border: "1px solid #e2e8f0" }}>
              <AdminMenu />
            </div>
          </div>

          {/* Main Workspace Display Panel */}
          <div className="col-md-9">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2 className="fw-bold text-dark m-0" style={{ letterSpacing: "-0.5px" }}>
                Master Products Catalog
              </h2>
              <span className="badge bg-dark px-3 py-2 rounded-pill fw-semibold">
                Items Logged: {products?.length || 0}
              </span>
            </div>

            {/* Grid Container Layout for Products */}
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-3 g-4">
              {products?.map((p) => (
                <div className="col" key={p._id}>
                  <Link
                    to={`/dashboard/admin/product/${p.slug}`}
                    className="text-decoration-none"
                    style={{ display: "block" }}
                  >
                    <div 
                      className="card h-100 border-0 rounded-4 overflow-hidden position-relative bg-white"
                      style={{ 
                        border: "1px solid #e2e8f0",
                        boxShadow: "0 4px 12px -5px rgba(15, 23, 42, 0.05)",
                        transition: "all 0.25s ease-in-out",
                        cursor: "pointer"
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.transform = "translateY(-5px)";
                        e.currentTarget.style.boxShadow = "0 12px 24px -8px rgba(15, 23, 42, 0.12)";
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = "0 4px 12px -5px rgba(15, 23, 42, 0.05)";
                      }}
                    >
                      {/* Pricing Tag Badge over Image frame */}
                      <span 
                        className="position-absolute badge rounded-pill fw-bold bg-white text-dark shadow-sm px-2.5 py-1.5"
                        style={{ top: "12px", right: "12px", fontSize: "13px", zIndex: 2, border: "1px solid #f1f5f9" }}
                      >
                        {p.price?.toLocaleString("en-US", { style: "currency", currency: "USD" })}
                      </span>

                      {/* Display Image Showcase canvas */}
                      <div 
                        className="d-flex align-items-center justify-content-center p-3" 
                        style={{ backgroundColor: "#fdfdfd", height: "220px", borderBottom: "1px solid #f1f5f9" }}
                      >
                        <img
                          src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                          className="img-fluid"
                          alt={p.name}
                          style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain", borderRadius: "8px" }}
                        />
                      </div>

                      {/* Description Typography metadata content info block */}
                      <div className="card-body p-3 d-flex flex-column justify-content-between">
                        <div>
                          <h6 className="card-title fw-bold text-dark mb-1" style={{ fontSize: "15px", letterSpacing: "-0.2px" }}>
                            {p.name}
                          </h6>
                          <p className="card-text text-muted small m-0" style={{ lineHeight: "1.4" }}>
                            {p.description?.length > 60 ? `${p.description.substring(0, 60)}...` : p.description}
                          </p>
                        </div>
                        
                        {/* Control Indicator Footer */}
                        <div className="pt-2 mt-3 border-top d-flex align-items-center justify-content-between text-primary fw-bold" style={{ fontSize: "12px" }}>
                          <span>VIEW DETAILS</span>
                          <span>➔</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
            
            {/* Empty State placeholder screen layout if empty mapping lists */}
            {products?.length === 0 && (
              <div className="text-center p-5 rounded-4 bg-white mt-4 border text-muted">
                <span className="fs-1 d-block mb-2">📦</span>
                <p className="m-0 fw-medium">No items registered inside your stock databases currently.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;