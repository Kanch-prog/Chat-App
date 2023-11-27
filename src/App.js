import { ChatEngine } from 'react-chat-engine';

import ChatFeed from './components/ChatFeed';
import LoginForm from './components/LoginForm';
import './App.css';

// holds the Chat Engine project ID.
const projectID = 'e2adca3f-127d-4850-8196-455477f07acb';

const App = () => {
  // Check if the username is stored in local storage; if not, render the login form
  if (!localStorage.getItem('username')) return <LoginForm />;

  // If the username is available, render the ChatEngine component
  return (
    <ChatEngine
      height="100vh"
      projectID={projectID}
      userName={localStorage.getItem('username')}
      userSecret={localStorage.getItem('password')}
      renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps} />}
      onNewMessage={() => new Audio('https://chat-engine-assets.s3.amazonaws.com/click.mp3').play()}
    />
  );
};

export default App;
