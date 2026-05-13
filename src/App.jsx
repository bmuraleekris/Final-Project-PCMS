import React, { useState } from 'react';
import Login from './components/Login';
import ComplaintDisplay from './components/ComplaintDisplay';
import AddComplaint from './components/AddComplaint';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [userRole, setUserRole] = useState(localStorage.getItem('userRole'));

  const handleLogout = () => {
    localStorage.clear();
    setToken(null);
    setUserRole(null);
  };

  if (!token) {
    return <Login setToken={setToken} setUserRole={setUserRole} />;
  }

  return (
    <div className="App" style={{ fontFamily: 'Arial, sans-serif' }}>
      {/* --- Centered Header Section --- */}
      <header style={headerStyle}>
        <div style={headerContentStyle}>
          <h1 style={titleStyle}>BSM - MTC INDIA</h1>
          <p style={subtitleStyle}>Official Complaint Management System</p>
        </div>
        
        {/* Role and Logout positioned absolutely to keep title centered */}
        <div style={userControlStyle}>
          <span style={{ marginRight: '15px' }}>Role: <strong>{userRole}</strong></span>
          <button onClick={handleLogout} style={logoutButtonStyle}>Logout</button>
        </div>
      </header>

      {/* --- The Red Line --- */}
      <div style={redDividerStyle}></div>

      <main style={mainStyle}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          
          {/* Complaint Registration: Visible to Students/Employees */}
          {(userRole === 'Student' || userRole === 'Employee') && (
            <AddComplaint token={token} onAdded={() => window.location.reload()} />
          )}

          {/* Complaint Tracking Dashboard */}
          <div style={cardStyle}>
            <ComplaintDisplay token={token} userRole={userRole} />
          </div>

        </div>
      </main>

      <footer style={footerStyle}>
        <p>© 2026 BSM MTC India | Designed for Transparency & Efficiency</p>
      </footer>
    </div>
  );
}

// --- Corrected Unified Styles ---

const headerStyle = {
  backgroundColor: '#003366',
  color: 'white',
  padding: '40px 20px', // Breathing room from top and red line
  position: 'relative', // Allows absolute positioning of logout button
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  boxSizing: 'border-box'
};

const headerContentStyle = {
  textAlign: 'center'
};

const titleStyle = {
  margin: '0',
  fontSize: '2.5rem',
  fontWeight: 'bold',
  letterSpacing: '2px',
  textTransform: 'uppercase',
  lineHeight: '1.2' // Ensures the title itself has clean spacing
};

const subtitleStyle = {
  margin: '20px 0 0 0',      // Increased from 10px to 20px for better clarity
  fontSize: '1.2rem',
  fontWeight: '300',
  opacity: '0.9',
  letterSpacing: '1px'
};

const userControlStyle = {
  position: 'absolute',
  right: '40px',
  top: '50%',
  transform: 'translateY(-50%)',
  textAlign: 'right'
};

const redDividerStyle = {
  height: '8px',
  backgroundColor: '#cc0000',
  width: '100%',
  boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
};

const mainStyle = {
  minHeight: '80vh',
  padding: '40px 20px',
  backgroundColor: '#f8f9fa'
};

const cardStyle = {
  backgroundColor: 'white',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
};

const logoutButtonStyle = {
  backgroundColor: '#cc0000',
  color: 'white',
  border: 'none',
  padding: '8px 15px',
  borderRadius: '4px',
  cursor: 'pointer',
  fontWeight: 'bold'
};

const footerStyle = {
  textAlign: 'center',
  padding: '20px',
  fontSize: '0.85rem',
  color: '#777',
  backgroundColor: '#eee',
  borderTop: '1px solid #ddd'
};

export default App;