import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import AdminMenu from "../../components/layout/AdminMenu";
import Layout from "../../components/layout/Layout";
import { useAuth } from "../../context/auth";
import moment from "moment";
import { Select } from "antd";
const { Option } = Select;

const AdminOrders = () => {
  const [status, setStatus] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
  ]);
  const [orders, setOrders] = useState([]);
  const { auth } = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/all-orders`);
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const handleChange = async (orderId, value) => {
    try {
      await axios.put(`${process.env.REACT_APP_API}/api/v1/auth/order-status/${orderId}`, {
        status: value,
      });
      toast.success("Order status updated successfully");
      getOrders();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={"All Orders Data"}>
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

          {/* Main Orders Display Feed */}
          <div className="col-md-9">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2 className="fw-bold text-dark m-0" style={{ letterSpacing: "-0.5px" }}>
                Manage Master Orders
              </h2>
              <span className="badge bg-dark px-3 py-2 rounded-pill fw-semibold">
                Total Logs: {orders?.length || 0}
              </span>
            </div>

            {orders?.map((o, i) => (
              <div 
                className="card bg-white shadow-sm border-0 rounded-4 overflow-hidden mb-4"
                style={{ border: "1px solid #e2e8f0" }}
                key={o._id}
              >
                {/* Meta Table Header Block */}
                <div className="table-responsive p-3" style={{ backgroundColor: "#fdfdfd", borderBottom: "1px solid #f1f5f9" }}>
                  <table className="table table-borderless align-middle m-0 text-center small">
                    <thead>
                      <tr className="text-muted text-uppercase fw-bold" style={{ fontSize: "11px", letterSpacing: "0.5px" }}>
                        <th scope="col">#</th>
                        <th scope="col" style={{ minWidth: "160px" }}>Order Status</th>
                        <th scope="col">Buyer</th>
                        <th scope="col">Timeline</th>
                        <th scope="col">Payment</th>
                        <th scope="col">Units</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="fw-semibold text-dark" style={{ fontSize: "14px" }}>
                        <td>{i + 1}</td>
                        <td>
                          <div 
                            className="p-1 rounded-3 d-inline-block w-100" 
                            style={{ backgroundColor: "#f1f5f9", border: "1px solid #e2e8f0" }}
                          >
                            <Select
                              bordered={false}
                              onChange={(value) => handleChange(o._id, value)}
                              defaultValue={o?.status}
                              className="w-100 fw-bold text-primary"
                              dropdownStyle={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                            >
                              {status.map((s, index) => (
                                <Option key={index} value={s}>
                                  {s}
                                </Option>
                              ))}
                            </Select>
                          </div>
                        </td>
                        <td>{o?.buyer?.name || "Unknown User"}</td>
                        <td className="text-muted">{moment(o?.createAt).fromNow()}</td>
                        <td>
                          <span 
                            className={`badge px-2.5 py-1.5 rounded-pill ${
                              o?.payment?.success ? "bg-success-subtle text-success" : "bg-danger-subtle text-danger"
                            }`}
                            style={{ fontSize: "12px" }}
                          >
                            {o?.payment?.success ? "● Paid Securely" : "● Unresolved"}
                          </span>
                        </td>
                        <td>{o?.products?.length} Items</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Internal Items Subgallery mapping */}
                <div className="card-body p-4 bg-white">
                  <div className="row g-3">
                    {o?.products?.map((p) => (
                      <div className="col-100" key={p._id}>
                        <div 
                          className="d-flex align-items-center p-3 rounded-4" 
                          style={{ backgroundColor: "#f8fafc", border: "1px solid #f1f5f9" }}
                        >
                          {/* Image Box */}
                          <div 
                            className="rounded-3 overflow-hidden bg-white d-flex align-items-center justify-content-center shadow-sm"
                            style={{ width: "80px", height: "80px", minWidth: "80px", border: "1px solid #e2e8f0" }}
                          >
                            <img
                              src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                              alt={p.name}
                              style={{ width: "100%", height: "100%", objectFit: "cover" }}
                            />
                          </div>

                          {/* Details Metadata layout wrapper */}
                          <div className="ms-4 flex-grow-1">
                            <h6 className="fw-bold text-dark m-0 mb-1" style={{ fontSize: "15px" }}>{p.name}</h6>
                            <p className="text-muted small m-0 mb-1" style={{ lineHeight: "1.4" }}>
                              {p.description.substring(0, 75)}...
                            </p>
                            <span className="fw-extrabold text-success small">
                              {p.price?.toLocaleString("en-US", { style: "currency", currency: "USD" })}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminOrders;