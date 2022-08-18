import { useEffect, useState } from 'react'
import io from 'socket.io-client';
import reactLogo from './assets/react.svg'
import { BandAdd } from './components/BandAdd'
import { BandList } from './components/BandList'

const connectSocketServer = () => {
  const socket = io.connect('http://localhost:4000', {
    transports: ['websocket']
  });
  return socket;
}

const socket = connectSocketServer();

function App() {

    const [online, setOnline] = useState(false);
    const [bands, setBands] = useState([]);

    useEffect(() => {

      return () => {
        socket.disconnect();
      }
    }, [])

    useEffect(() => {
      setOnline(socket.connected);
    }, [socket])

    useEffect(() => {
      socket.on('connect', () => {
        setOnline(true);
      })

      //return socket.disconnect();
    }, [socket])

    useEffect(() => {
      socket.on('disconnect', () => {
        setOnline(false);
      })
    }, [socket])

    useEffect(() => {
      socket.on('current-bands', (bands) => {
        setBands(bands);
      })
    }, [socket])
    
    const votar = (id) => {
      socket.emit('votar-banda', {id});
    }

    const borrarBanda = (id) => {
      socket.emit('borrar-banda', {id});
    }

    const cambiarNombre = (id, name) => {
      socket.emit('cambiar-nombre-banda', {id, name});
    }

    const crearBanda = (name) => {
      socket.emit('nueva-banda', {name});
    }

  return (
    <div className='container'>
      <div className='alert'>
        <p>
          Service status: 
          {
            online
            ? <span className='text-success'> Online</span>
            : <span className='text-danger'> Offline</span>
          }
          
        </p>
      </div>

      <h1>BandNames</h1>
      <hr />

      <div className="row">
        <div className="col-8">
          <BandList data={bands} votar={votar} borrarBanda={borrarBanda} cambiarNombre={cambiarNombre} />
        </div>
        <div className="col-4">
          <BandAdd crearBanda={crearBanda} />
        </div>
      </div>

    </div>
  )
}

export default App
