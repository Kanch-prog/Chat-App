/*renders either an image attachment or a text message, styling them differently based on whether there are attachments. If there are attachments, it renders an image floated to the right. If there are no attachments, it renders a text message with specific styling, also floated to the right.*/
function MyMessage(message) {
  // Check if the message has attachments
  if (message.attachments && message.attachments.length > 0) {
      // If there are attachments, return an <img> element
      return (
          <img
              src={message.attachments[0].file}
              alt="message-attachment"
              className="message-image"
              style={{ float: 'right' }}
          />
      );
  }
  // If there are no attachments, return a <div> element with the message text
  return (
      <div>
          <div className="message" style={{ float: 'right', marginRight: '18px', color: 'white', backgroundColor: '#3B2A50' }}>
              {message.text}
          </div>
      </div>
  );
}

// Export the MyMessage component
export default MyMessage;
