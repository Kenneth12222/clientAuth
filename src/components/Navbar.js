import React, { useState } from 'react';
import { registerUser, loginUser } from '../api/userApi';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import './Navbar.css'; // Add your styles here

function Navbar() {
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and register
  const [showModal, setShowModal] = useState(false); // To show or hide the modal
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState(''); // Only needed for registration
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleToggle = () => {
    setIsLogin(!isLogin);
    setError(null); // Clear any previous errors
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setError(null);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await registerUser({ username, password, email });
      handleCloseModal(); // Close modal after registration
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    // Assuming you have some login logic here
    const success = await loginUser({ username, password });
    if (success) {
      handleCloseModal();
      navigate('/profile'); // Redirect to profile after login
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <a href="/">Logo</a>
      </div>
      <button className="navbar-btn" onClick={handleShowModal}>
        {isLogin ? 'Login' : 'Sign Up'}
      </button>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>&times;</span>
            {isLogin ? (
              <form onSubmit={handleLogin}>
                <h1>Login</h1>
                {error && <p>{error}</p>}
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button type="submit" disabled={loading}>Login</button>
                <div className='redirect'>
                  <a href="#" onClick={handleToggle}>Sign Up</a>
                </div>
              </form>
            ) : (
              <form onSubmit={handleRegister}>
                <h1>Sign Up</h1>
                {error && <p>{error}</p>}
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button type="submit" disabled={loading}>Sign Up</button>
                <div className='redirect'>
                  <a href="#" onClick={handleToggle}>Login</a>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
