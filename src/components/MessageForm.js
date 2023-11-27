import { useState } from 'react';
import { SendOutlined, PictureOutlined } from '@ant-design/icons';
import { sendMessage, isTyping } from 'react-chat-engine';

function MessageForm(props) {
  // State to manage the input value
  const [value, setValue] = useState('');
  // Extracting chatId and creds from props
  const { chatId, creds } = props;

  // Function to handle input value change
  const handleChange = (event) => {
    // Update the input value state
    setValue(event.target.value);

    // Trigger the isTyping function from react-chat-engine
    isTyping(props, chatId);
  };

  // Function to handle form submission
  const handleSubmit = (event) => {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Trim the input text and check if it's not empty
    const text = value.trim();
    if (text.length > 0) {
      // Send the message using the sendMessage function from react-chat-engine
      sendMessage(creds, chatId, { text });
    }

    // Clear the input value state
    setValue('');
  };

  // Function to handle file upload
  const handleUpload = (event) => {
    // Send the message with the uploaded files using sendMessage function
    sendMessage(creds, chatId, { files: event.target.files, text: '' });
  };

  return (
    <form className="message-form" onSubmit={handleSubmit}>
      {/* Input field for typing messages */}
      <input
        className="message-input"
        placeholder="Send a message..."
        value={value}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />

      {/* Label and input for file upload */}
      <label htmlFor="upload-button">
        <span className="image-button">
          {/* Picture icon for file upload */}
          <PictureOutlined className="picture-icon" />
        </span>
      </label>
      <input
        type="file"
        multiple={false}
        id="upload-button"
        style={{ display: 'none' }}
        onChange={handleUpload.bind(this)}
      />

      {/* Button for submitting the form */}
      <button type="submit" className="send-button">
        {/* Send icon for form submission */}
        <SendOutlined className="send-icon" />
      </button>
    </form>
  );
}

// Export the MessageForm component
export default MessageForm;
