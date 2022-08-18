import { useEffect, useState } from "react"
import { useSocket } from "../hooks/useSocket";
import { SocketContext } from "./SocketContext"

export const SocketProvider = ({children}) => {

    const {socket, online} = useSocket('http://localhost:4000');

    const [bands, setBands] = useState([]);

    useEffect(() => {
        socket.on('current-bands', (bands) => {
          setBands(bands);
        })
        return () => {
            socket.off('current-bands');
        }
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
        <SocketContext.Provider value={{
            socket, 
            online,
            bands,
            setBands,
            votar,
            borrarBanda,
            cambiarNombre,
            crearBanda,
        }}>
            {children}
        </SocketContext.Provider>
    )
}
