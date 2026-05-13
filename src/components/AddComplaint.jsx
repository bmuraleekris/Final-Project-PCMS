import React, { useState } from 'react';

function AddComplaint({ token, onAdded }) {
    const [category, setCategory] = useState("Select Category");
    const [description, setDescription] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://127.0.0.1:8000/api/complaints/', {
            method: 'POST',
            headers: {
                'Authorization': `Token ${token.trim()}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                category: category,
                name: category, // We use category as the "Name/Subject" now
                description: description 
            })
        })
        .then(res => {
            if (res.ok) {
                alert("Your complaint has been registered.");
                setDescription("");
                setCategory("Others");
                onAdded(); 
            }
        });
    };

    return (
        <div style={formCardStyle}>
            <h4 style={{ textAlign: 'center', color: '#003366' }}>Register New Complaint</h4>
            <form onSubmit={handleSubmit}>
                <label style={labelStyle}>Select Complaint Category:</label>
                <select 
                    value={category} 
                    onChange={e => setCategory(e.target.value)} 
                    style={inputStyle}
                >
                    <option value="Administration">Administration</option>
                    <option value="Academics">Academics</option>
                    <option value="Accommodation">Accommodation</option>
                    <option value="Food_Accommodation">Food in Accommodation</option>
                    <option value="Food_MTC">Food in MTC</option>
                    <option value="Transportation">Transportation</option>
                    <option value="Classroom">Class Room Facility</option>
                    <option value="Practical">Practical Facilities</option>
                    <option value="Others">Others</option>
                    <option value="Select Category">Select Category</option>
                </select>

                {/* Subject/Title input removed as per your suggestion */}

                <textarea 
                    value={description} 
                    placeholder="Provide details of the issue..." 
                    onChange={e => setDescription(e.target.value)} 
                    required style={textareaStyle}
                />
                <div style={{ textAlign: 'center' }}>
                    <button type="submit" style={submitButtonStyle}>Submit Complaint</button>
                </div>
            </form>
        </div>
    );
}

const labelStyle = { display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#333', fontSize: '0.9rem' };
const formCardStyle = { backgroundColor: '#fff', padding: '20px', borderRadius: '8px', marginBottom: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' };
const inputStyle = { width: '100%', padding: '10px', marginBottom: '15px', boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: '4px' };
const textareaStyle = { width: '100%', height: '100px', padding: '10px', marginBottom: '10px', boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: '4px' };
const submitButtonStyle = { backgroundColor: '#003366', color: 'white', padding: '10px 30px', border: 'none', cursor: 'pointer', borderRadius: '4px', fontWeight: 'bold' };

export default AddComplaint;