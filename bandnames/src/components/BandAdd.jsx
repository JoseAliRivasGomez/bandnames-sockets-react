import React, { useContext, useState } from 'react'
import { SocketContext } from '../context/SocketContext';

export const BandAdd = () => {

    const {crearBanda} = useContext(SocketContext);
    const [valor, setValor] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();

        if(valor.trim().length > 0){
            crearBanda(valor.trim());

            setValor('');
        }
    }

  return (
    <>
        <h3>Agregar banda</h3>
        <form onSubmit={onSubmit}>
            <input type="text" className='form-control' placeholder='Nuevo nombre de banda' value={valor} onChange={(e) => setValor(e.target.value)} />
        </form>
    </>
  )
}
