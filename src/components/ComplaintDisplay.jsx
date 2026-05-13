import React, { useEffect, useState } from 'react';

function ComplaintDisplay({ token, userRole }) {
    const [complaints, setComplaints] = useState([]);
    const [search, setSearch] = useState(""); 
    const [filterStatus, setFilterStatus] = useState("All"); // New state for filtering

    const fetchComplaints = () => {
        let url = `http://127.0.0.1:8000/api/complaints/?search=${search}`;
        
        fetch(url, {
            headers: { 'Authorization': `Token ${token}` }
        })
        .then(res => res.json())
        .then(data => {
            let results = Array.isArray(data) ? data : (data.results || []);

            // Privacy Logic: Students see own, Admins see all
            if (userRole === 'Student' || userRole === 'Employee') {
                setComplaints(results.filter(c => c.is_owner === true));
            } else {
                setComplaints(results);
            }
        })
        .catch(err => {
            console.error("Fetch error:", err);
            setComplaints([]);
        });
    };

    useEffect(() => { 
        if (token) fetchComplaints(); 
    }, [search, token]);

    const toggleStatus = (id, currentStatus) => {
        fetch(`http://127.0.0.1:8000/api/complaints/${id}/`, {
            method: 'PATCH',
            headers: { 
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({ completed: !currentStatus })
        }).then(() => fetchComplaints());
    };

    // --- Filter Logic ---
    const filteredComplaints = complaints.filter(c => {
        if (filterStatus === "Pending") return c.completed === false;
        if (filterStatus === "Resolved") return c.completed === true;
        return true; // "All"
    });

    return (
        <div style={containerStyle}>
            <h3 style={{ textAlign: 'center', color: '#003366' }}>Complaint Status & Tracking</h3>
            
            {/* Filter Buttons */}
            <div style={filterGroupStyle}>
                <button 
                    onClick={() => setFilterStatus("All")} 
                    style={filterStatus === "All" ? activeFilterBtn : filterBtn}
                >All</button>
                <button 
                    onClick={() => setFilterStatus("Pending")} 
                    style={filterStatus === "Pending" ? activeFilterBtn : filterBtn}
                >⏳ Pending</button>
                <button 
                    onClick={() => setFilterStatus("Resolved")} 
                    style={filterStatus === "Resolved" ? activeFilterBtn : filterBtn}
                >✅ Resolved</button>
            </div>

            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <input 
                    type="text" 
                    placeholder="Search by keyword..." 
                    style={searchStyle}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <table style={tableStyle}>
                <thead>
                    <tr style={headerRowStyle}>
                        <th style={cellStyle}>Category</th>
                        <th style={cellStyle}>Issue Description</th>
                        <th style={cellStyle}>Status</th>
                        {userRole === 'Admin' && <th style={cellStyle}>Action</th>}
                    </tr>
                </thead>
                <tbody>
                    {filteredComplaints.map(complaint => (
                        <tr key={complaint.id} style={rowStyle}>
                            <td style={cellStyle}>
                                <span style={categoryBadgeStyle}>
                                    {complaint.category ? complaint.category.replace('_', ' ') : 'Others'}
                                </span>
                            </td>
                            <td style={cellStyle}>{complaint.description}</td>
                            <td style={cellStyle}>
                                <span style={statusBadge(complaint.completed)}>
                                    {complaint.completed ? '✅ Resolved' : '⏳ Pending'}
                                </span>
                            </td>
                            {userRole === 'Admin' && (
                                <td style={cellStyle}>
                                    <button onClick={() => toggleStatus(complaint.id, complaint.completed)} style={actionButtonStyle}>
                                        Change Status
                                    </button>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

// --- New Styles for Filters ---
const filterGroupStyle = {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
    marginBottom: '20px'
};

const filterBtn = {
    padding: '8px 16px',
    border: '1px solid #003366',
    backgroundColor: 'transparent',
    color: '#003366',
    borderRadius: '20px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: '0.3s'
};

const activeFilterBtn = {
    ...filterBtn,
    backgroundColor: '#003366',
    color: 'white'
};

// --- Previous Styles (Keep these) ---
const categoryBadgeStyle = { backgroundColor: '#e2e3e5', padding: '4px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase', color: '#383d41', display: 'inline-block' };
const containerStyle = { padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px', marginTop: '20px' };
const searchStyle = { padding: '10px', width: '60%', borderRadius: '4px', border: '1px solid #ccc' };
const tableStyle = { width: '100%', borderCollapse: 'collapse', marginTop: '10px', backgroundColor: 'white' };
const headerRowStyle = { backgroundColor: '#003366', color: 'white', textAlign: 'left' };
const cellStyle = { padding: '12px', borderBottom: '1px solid #ddd', fontSize: '0.9rem' };
const rowStyle = { transition: 'background-color 0.3s' };
const statusBadge = (isResolved) => ({ padding: '5px 10px', borderRadius: '15px', fontSize: '0.85rem', backgroundColor: isResolved ? '#d4edda' : '#fff3cd', color: isResolved ? '#155724' : '#856404', fontWeight: 'bold', display: 'inline-block' });
const actionButtonStyle = { backgroundColor: '#6c757d', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' };

export default ComplaintDisplay;