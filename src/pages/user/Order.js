import React, { useState, useEffect } from 'react'
import Layout from '../../components/layout/Layout'
import UserMenu from '../../components/layout/UserMenu'
import axios from 'axios'
import { useAuth } from '../../context/auth'
import moment from 'moment'

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const { auth, setAuth } = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/orders`);
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  // Inline styling objects
  const dashboardWrapperStyle = {
    paddingTop: '0px',        // Strips all top padding
    marginTop: '-15px',       // Actively pulls content up into layout space
    position: 'relative'
  };

  const orderCardStyle = {
    borderRadius: '12px',
    border: '1px solid #e2e8f0',
    backgroundColor: '#ffffff',
    overflow: 'hidden',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)'
  };

  const productCardStyle = {
    border: '1px solid #f1f5f9',
    borderRadius: '8px',
    backgroundColor: '#f8fafc',
    display: 'flex',
    alignItems: 'center'
  };

  const imgStyle = {
    objectFit: 'cover',
    borderRadius: '6px',
    border: '1px solid #e2e8f0'
  };

  const getStatusBadgeClass = (status) => {
    const s = status?.toLowerCase();
    if (s === 'delivered') return 'bg-success text-white';
    if (s === 'cancel' || s === 'cancelled') return 'bg-danger text-white';
    if (s === 'processing' || s === 'shipped') return 'bg-primary text-white';
    return 'bg-warning text-dark';
  };

  return (
    <Layout title={"Your Orders"}>
      {/* FIXED: Applied dashboardWrapperStyle to pull up layout space completely */}
      <div className="container-fluid pb-5 px-md-5 dashboard" style={dashboardWrapperStyle}>
        {/* Force row to clear default browser top margins */}
        <div className="row g-4 mt-0">
          <div className="col-md-3">
            <UserMenu />
          </div>
          
          <div className="col-md-9">
            {/* Added mt-0 and pt-0 to guarantee the header touches the top container boundary */}
            <h1 className="h2 text-dark font-weight-bold mb-4 mt-0 pt-0">All Orders</h1>
            
            {orders?.map((o, i) => {
              return (
                <div className="mb-4" style={orderCardStyle} key={o?._id || i}>
                  {/* Order Overview Header */}
                  <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0 text-center">
                      <thead className="table-light">
                        <tr>
                          <th scope="col" className="text-secondary small font-weight-bold">#</th>
                          <th scope="col" className="text-secondary small font-weight-bold">Status</th>
                          <th scope="col" className="text-secondary small font-weight-bold">Buyer</th>
                          <th scope="col" className="text-secondary small font-weight-bold">Date</th>
                          <th scope="col" className="text-secondary small font-weight-bold">Payment</th>
                          <th scope="col" className="text-secondary small font-weight-bold">Quantity</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td><strong>{i + 1}</strong></td>
                          <td>
                            <span className={`badge rounded-pill px-3 py-2 ${getStatusBadgeClass(o?.status)}`}>
                              {o?.status}
                            </span>
                          </td>
                          <td className="text-muted">{o?.buyer?.name}</td>
                          <td className="text-muted">{moment(o?.createAt).fromNow()}</td>
                          <td>
                            <span className={`badge ${o?.payment?.success ? 'bg-success-subtle text-success' : 'bg-danger-subtle text-danger'} px-2 py-1`}>
                              {o?.payment?.success ? "Success" : "Failed"}
                            </span>
                          </td>
                          <td><span className="fw-bold">{o?.products?.length}</span></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Order Items List */}
                  <div className="p-3 bg-white">
                    {o?.products?.map((p) => (
                      <div className="row mb-3 p-3 mx-0" style={productCardStyle} key={p._id}>
                        <div className="col-md-3 col-sm-4 text-center text-sm-start mb-3 mb-sm-0">
                          <img
                            src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                            alt={p.name}
                            width="90px"
                            height="90px"
                            style={imgStyle}
                          />
                        </div>
                        <div className="col-md-9 col-sm-8 d-flex flex-column justify-content-center">
                          <h6 className="mb-1 text-dark font-weight-bold">{p.name}</h6>
                          <p className="text-muted small mb-2">{p.description?.substring(0, 60)}...</p>
                          <div className="d-flex justify-content-between align-items-center mt-auto">
                            <span className="text-primary font-weight-bold">${p.price}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
            
            {orders.length === 0 && (
              <div className="text-center py-5 border rounded bg-light text-muted">
                No orders found.
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;