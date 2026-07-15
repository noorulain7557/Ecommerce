import React from 'react'
import Layout from '../../components/layout/Layout'
import AdminMenu from '../../components/layout/AdminMenu'
import { useAuth } from '../../context/auth'

const AdminDashboard = () => {
  const { auth } = useAuth()
  
  return (
    <Layout title={"Admin Dashboard - E-Shop"}>
      <div 
        className='container-fluid py-5 px-md-5' 
        style={{ 
          backgroundColor: "#f8fafc", 
          minHeight: "88vh",
          fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif"
        }}
      >
        <div className='row g-4 max-width-container' style={{ maxWidth: "1400px", margin: "0 auto" }}>
          {/* Admin Navigation Menu Sidebar */}
          <div className='col-lg-3 col-md-4'>
            <div className="shadow-sm rounded-4 bg-white p-2" style={{ border: "1px solid #e2e8f0" }}>
              <AdminMenu />
            </div>
          </div>
          
          {/* Admin Information Display Canvas */}
          <div className='col-lg-7 col-md-8'>
            <div 
              className='card shadow-sm border-0 rounded-4 overflow-hidden bg-white'
              style={{ border: "1px solid #e2e8f0 !important" }}
            >
              {/* Profile Card Header Accent */}
              <div 
                className="px-4 py-3 text-white d-flex align-items-center justify-content-between"
                style={{ backgroundColor: "#4f46e5" }}
              >
                <h5 className="mb-0 fw-bold" style={{ letterSpacing: "0.5px" }}>
                  ADMINISTRATIVE PROFILE
                </h5>
                <span className="badge bg-white text-primary fw-bold px-3 py-2 rounded-pill small">
                  Active Session
                </span>
              </div>

              {/* Profile Card Body Details */}
              <div className='card-body p-4'>
                <div className="row g-3">
                  
                  {/* Admin Name block */}
                  <div className="col-100 border-bottom pb-3">
                    <span className="text-muted d-block small text-uppercase fw-semibold mb-1" style={{ letterSpacing: "0.5px" }}>
                      Admin 
                    </span>
                    <h4 className="fw-bold text-dark mb-0" style={{ letterSpacing: "-0.5px" }}>
                      {auth?.user?.name || "N/A"}
                    </h4>
                  </div>

                  {/* Admin Email block */}
                  <div className="col-100 border-bottom pb-3">
                    <span className="text-muted d-block small text-uppercase fw-semibold mb-1" style={{ letterSpacing: "0.5px" }}>
                      Email 
                    </span>
                    <h5 className="fw-semibold text-secondary mb-0">
                      {auth?.user?.email || "N/A"}
                    </h5>
                  </div>

                  {/* Admin Phone block */}
                  <div className="col-100">
                    <span className="text-muted d-block small text-uppercase fw-semibold mb-1" style={{ letterSpacing: "0.5px" }}>
                      Contact 
                    </span>
                    <h5 className="fw-semibold text-secondary mb-0">
                      {auth?.user?.phone || "N/A"}
                    </h5>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default AdminDashboard