import React, { useState } from 'react'

export const BandAdd = ({crearBanda}) => {

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
