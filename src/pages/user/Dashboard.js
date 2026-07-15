import React from 'react'
import Layout from '../../components/layout/Layout'
import UserMenu from '../../components/layout/UserMenu'
import { useAuth } from '../../context/auth'

const Dashboard = () => {
  const { auth } = useAuth()

  // Inline styles for the user info card
  const cardStyle = {
    borderRadius: '12px',
    border: '1px solid #e0e0e0',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
    padding: '1.5rem',
    backgroundColor: '#ffffff'
  }

  const headerStyle = {
    color: '#495057',
    fontWeight: '600',
    borderBottom: '2px solid #f1f3f5',
    paddingBottom: '0.75rem',
    marginBottom: '1.25rem'
  }

  return (
    <Layout title={'Dashboard - Ecommerce App'}>
      {/* py-5 adds top/bottom spacing, container makes it look neat */}
      <div className='container py-5'>
        <div className='row g-4'>
          
          {/* Left Side: Navigation Menu (Fixed the col=md-3 typo here) */}
          <div className='col-md-3'>
            <UserMenu />
          </div>

          {/* Right Side: User Details Panel */}
          <div className='col-md-9'>
            <div style={cardStyle}>
              <h3 style={headerStyle}>User Profile</h3>
              
              <div className="mb-3">
                <span className="text-muted d-block small uppercase tracking-wider">Name</span>
                <span className="h5 text-dark font-weight-normal">{auth?.user?.name || "N/A"}</span>
              </div>
              
              <div className="mb-3">
                <span className="text-muted d-block small">Email</span>
                <span className="h5 text-dark font-weight-normal">{auth?.user?.email || "N/A"}</span>
              </div>
              
              <div className="mb-0">
                <span className="text-muted d-block small">Contact</span>
                <span className="h5 text-dark font-weight-normal">{auth?.user?.phone || "N/A"}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </Layout>
  )
}

export default Dashboard