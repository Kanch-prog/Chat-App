/*handles the rendering of messages sent by other users in the chat. It includes logic to display the user avatar for the first message by the user and adjusts the styling based on the presence of attachments and whether it's the first message by the user*/
function TheirMessage({ lastMessage, message }) {
  // Check if the current message is the first message by the user or there is no last message
  const isFirstMessageByUser = !lastMessage || lastMessage.sender.username !== message.sender.username;

  return (
      <div className="message-row">
          {/* Render user avatar if it's the first message by the user */}
          {isFirstMessageByUser && (
              <div
                  className="message-avatar"
                  style={{ backgroundImage: message.sender && `url(${message.sender.avatar})` }}
              />
          )}
          {/* Render message content based on whether there are attachments */}
          {message.attachments && message.attachments.length > 0
              ? (
                  <img
                      src={message.attachments[0].file}
                      alt="message-attachment"
                      className="message-image"
                      style={{ marginLeft: isFirstMessageByUser ? '4px' : '48px' }}
                  />
              )
              : (
                  <div className="message" style={{ float: 'left', backgroundColor: '#CABCDC', marginLeft: isFirstMessageByUser ? '4px' : '48px' }}>
                      {message.text}
                  </div>
              )}
      </div>
  );
}

// Export the TheirMessage component
export default TheirMessage;
