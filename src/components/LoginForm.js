import { useState } from 'react';
import axios from 'axios';

const projectID = 'e2adca3f-127d-4850-8196-455477f07acb';

function Modal() {
  // State for managing username, password, and error
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Function to handle form submission
  const handleSubmit = async (e) => {
    // Prevent the default form submission behavior
    e.preventDefault();

    // Creating an authentication object with headers
    const authObject = { 'Project-ID': projectID, 'User-Name': username, 'User-Secret': password };

    try {
      // Making a GET request to the Chat Engine API to validate credentials
      await axios.get('https://api.chatengine.io/chats', { headers: authObject });

      // If credentials are valid, store them in local storage
      localStorage.setItem('username', username);
      localStorage.setItem('password', password);

      // Reload the window to apply changes
      window.location.reload();
      // Clearing any previous error
      setError('');
    } catch (err) {
      // If an error occurs, set an error message
      setError('Oops, incorrect credentials.');
    }
  };

  // Render the modal component
  return (
    <div className="wrapper">
      <div className="form">
        <h1 className="title">Chat Application</h1>
        {/* Form for entering username and password */}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input"
            placeholder="Username"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
            placeholder="Password"
            required
          />
          {/* Button for submitting the form */}
          <div align="center">
            <button type="submit" className="button">
              <span>Start chatting</span>
            </button>
          </div>
        </form>
        {/* Displaying any error message */}
        <h1>{error}</h1>
      </div>
    </div>
  );
}

// Export the Modal component
export default Modal;
