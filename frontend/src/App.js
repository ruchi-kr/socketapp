import './App.css';
import io from 'socket.io-client';
import { useEffect, useState } from 'react';

const socket = io.connect('http://localhost:3001');

function App() {

  const [message, setMessage] = useState('');
  const [messageReceived, setMessageReceived] = useState('');
  const sendMessage = () => {
    socket.emit('send_message', {message});
  };
  useEffect(() => {
    socket.on('receive_message', (data) => {
      setMessageReceived(data.message);
    });
  }, [socket]);
  return (
    <>
      <h1>hello</h1>
      <input onChange={(e) => setMessage(e.target.value)} type="text" placeholder="type message..." />
      <button onClick={sendMessage}>send</button>
      <h3>Message</h3>
      {messageReceived}
    </>
  );
}

export default App;
