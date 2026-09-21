import React from 'react'
import { bancos } from './assets/bancos'

export default function Tercero() {
    return (
        <div>
            <h3>Lista de Bancos</h3>
            <ul>
                {bancos.map((b) => (
                    <li key={b.id}>
                        {b.id} — {b.name}
                    </li>
                ))}
            </ul>
        </div>
    )
}
