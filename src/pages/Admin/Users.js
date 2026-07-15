import React from 'react'
import Layout from '../../components/layout/Layout'
import AdminMenu from '../../components/layout/AdminMenu'

const Users = () => {
  return (
    <Layout title={'Dashboard - All Users'}>
      <div 
        className="container-fluid py-5 px-md-5"
        style={{ 
          backgroundColor: "#f8fafc", 
          minHeight: "90vh",
          fontFamily: "'Plus Jakarta Sans', sans-serif" 
        }}
      >
        <div className="row g-4" style={{ maxWidth: "1400px", margin: "0 auto" }}>
          {/* Admin Navigation Sidebar Canvas */}
          <div className="col-md-3">
            <div className="shadow-sm rounded-4 bg-white p-2" style={{ border: "1px solid #e2e8f0" }}>
              <AdminMenu />
            </div>
          </div>

          {/* User Management System Board Container */}
          <div className="col-md-9">
            <div className="card shadow-sm border-0 rounded-4 p-4 bg-white" style={{ border: "1px solid #e2e8f0" }}>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                  <h2 className="fw-bold text-dark m-0" style={{ letterSpacing: "-0.5px" }}>
                    Account Registry Databases
                  </h2>
                  <p className="text-muted small m-0 mt-1">Review, look up, or handle permissions access for all active platform users.</p>
                </div>
              </div>

              {/* Dynamic Empty Table Slate Canvas Placeholder */}
              <div className="text-center py-5 px-4 rounded-4 bg-light text-muted border border-dashed" style={{ borderStyle: "dashed !important" }}>
                <span className="fs-1 d-block mb-3">👥</span>
                <h5 className="fw-bold text-dark mb-1">User Directory Console</h5>
                <p className="small max-w-sm mx-auto text-secondary mb-0" style={{ maxWidth: "400px" }}>
                  All accounts registered through authentication APIs will be organized in a ledger layout down below.
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Users