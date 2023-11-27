import MessageForm from './MessageForm';
import MyMessage from './MyMessage';
import TheirMessage from './TheirMessage';

function ChatFeed(props) {
    // Destructuring props to extract specific values
    const { chats, activeChat, username, messages } = props;
    
    // Finding the specific active chat if it exists
    const chat = chats && chats[activeChat];

    // Logging relevant information for debugging
    console.log(chats, username, messages);

    // Function to render read receipts for messages
    /*this function maps through the participants of a chat, checks if each participant's last read message matches the current message, and renders a read receipt div with appropriate styling if the condition is met. The read receipt is floated to the right if the message is from the current user and to the left otherwise. The participant's avatar is used as the background image if available*/
    const renderReadReceipts = (message, isMyMessage) => chat.people.map((person, index) => person.last_read === message.id && (
        <div
            key={`read_${index}`}
            className="read-receipt"
            style={{
                float: isMyMessage ? 'right' : 'left',
                backgroundImage: person.person.avatar && `url(${person.person.avatar})`,
            }}
        />
    ));

    // Function to render messages
    const renderMessages = () => {
        // Fetching all message keys
        const keys = Object.keys(messages);

        // Logging keys for debugging
        console.log(keys);

        // Rendering messages using a callback function
        return keys.map((key, index) => {
            const message = messages[key];
            // Returning the last message key; if it is 0, return null, else return keys
            const lastMessageKey = index === 0 ? null : keys[index - 1];
            // Checking if the last message is from the current user
            const isMyMessage = username === message.sender.username;

            /* this return statement represents the structure of each message block in the chat feed. It conditionally renders either the user's message or another user's message, and it includes a container for read receipts positioned based on whether the message is from the current user.*/

            return (
              //a container for each message block and sets a unique key attribute based on the index (msg_${index}).
                <div key={`msg_${index}`} style={{ width: '100%' }}>
                    <div className="message-block">
              /*If isMyMessage is true, it renders the <MyMessage /> component, passing the current message as a prop.
              If isMyMessage is false, it renders the <TheirMessage /> component, passing the current message and the lastMessage from the previous iteration as props.*/
                        {isMyMessage
                            ? <MyMessage message={message} />
                            : <TheirMessage message={message} lastMessage={messages[lastMessageKey]} />}
                    </div>
                    <div className="read-receipts" style={{ marginRight: isMyMessage ? '18px' : '0px', marginLeft: isMyMessage ? '0px' : '68px' }}>
                        {renderReadReceipts(message, isMyMessage)}
                    </div>
                </div>
            );
        });
    };

    // If the active chat doesn't exist, return an empty div
    if (!chat) return <div />;

    // Rendering the chat feed
    return (
        <div className="chat-feed">
            <div className="chat-title-container">
                {/* Displaying the chat title */}
                <div className="chat-title">{chat?.title}</div>
                {/* Displaying the chat participants */}
                <div className="chat-subtitle">
                    {chat.people.map((person) => ` ${person.person.username}`)}
                </div>
            </div>
            {/* Rendering messages */}
            {renderMessages()}
            {/* Adding space at the bottom */}
            <div style={{ height: '100px' }} />
            {/* Rendering the message form */}
            <div className="message-form-container">
                <MessageForm {...props} chatId={activeChat} />
            </div>
        </div>
    );
}

export default ChatFeed;
