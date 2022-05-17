import axios from 'axios'
import { useEffect, useRef } from 'react'; 

import io from 'socket.io-client'
const socket = io('/')

function App() {
  
  useEffect(() => {
    const token = localStorage.getItem('client')

    if (token) {
      axios.post('/api/verify_jwt', { token }).then(response => {
        const user = response.data.user; 

        if (user) {
          socket.emit('fetch_lobby_info', user)
        }

        socket.on('receive_lobby_info', ({ tables, players, socketId }) => {
          console.log('tables ', tables);
          
          // receiveLobbyInfo(tables, players, socketId)
        })
      })      
    }

  }, []);

  const usernameInput = useRef(null);
  const passwordInput = useRef(null);


  const create = () => {
    const username = usernameInput.current.value;
    const password = passwordInput.current.value;
    axios.post('/api/signup', {
      username,
      password,
    }).then(response => response.data).then(data => {
      localStorage.setItem('client', data.token)
    })
  }

  const login = () => {
    const username = usernameInput.current.value;
    const password = passwordInput.current.value;
    axios.post('/api/login', {
      username,
      password,
    }).then(response => response.data).then(data => {
      localStorage.setItem('client', data.token)
    })
  }

  return (
    <div>
      <form onSubmit={e => e.preventDefault()}>
        <input ref={usernameInput} />
        <input ref={passwordInput} />
        <button onClick={create}>create</button>
        <button onClick={login}>login</button>
      </form>
    </div>
  );
}

export default App;
