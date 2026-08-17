import React from 'react'

export default function Segundo() {
    const nombre = "Hector"
    const apellido = "Aranda Garcia"
    const elements = <h1>Nombre Completo: {nombre} + ' ' + {apellido}</h1>

  return (
    <div>
      <h1>{elements}</h1>
    </div>
  )
}
