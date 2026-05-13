import React, { useState } from 'react';

function Login({ setToken, setUserRole }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();
        fetch('http://127.0.0.1:8000/api-token-auth/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        })
        .then(res => res.json())
        .then(data => {
            if (data.token) {
                setToken(data.token);
                setUserRole(data.role); // Store the actual role from MySQL
                localStorage.setItem('token', data.token);
                localStorage.setItem('userRole', data.role);
            } else {
                alert("Invalid Credentials");
            }
        });
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '100px' }}>
            <h2 style={{ color: '#003366' }}>BSM Login Portal</h2>
            <form onSubmit={handleLogin} style={{ display: 'inline-block', textAlign: 'left' }}>
                <label>ID / Username:</label><br/>
                <input type="text" onChange={e => setUsername(e.target.value)} required /><br/><br/>
                <label>Password:</label><br/>
                <input type="password" onChange={e => setPassword(e.target.value)} required /><br/><br/>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;