import { useRegister } from '../hooks/useRegister';
import './Form.css';

export const Form = () => {
    const { 
        matricula, 
        nombre, 
        apellidos, 
        edad, 
        universidad, 
        carrera, 
        submittedData, 
        onInputChange, 
        handleRegister 
    } = useRegister({
        matricula: "A00000000",
        nombre: "Hector",
        apellidos: "Aranda Garcia",
        edad: "23",
        universidad: "ITESM",
        carrera: "ITC"
    });

    return (
        <div className="contact-us">
            <h1>Formulario Simple</h1>
            <hr />

            <h3>Matricula</h3>
            <input 
                type="text" 
                placeholder="A00000000" 
                name="matricula"
                value={matricula}
                onChange={onInputChange}
            />

            <h3>Nombre</h3>
            <input 
                type="text" 
                placeholder="Hector" 
                name="nombre"
                value={nombre}
                onChange={onInputChange}
            />

            <h3>Apellidos</h3>
            <input 
                type="text" 
                placeholder="Aranda Garcia" 
                name="apellidos"
                value={apellidos}
                onChange={onInputChange}
            />

            <h3>Edad</h3>
            <input 
                type="text" 
                placeholder="23" 
                name="edad"
                value={edad}
                onChange={onInputChange}
            />

            <h3>Universidad</h3>
            <input 
                type="text" 
                placeholder="ITESM" 
                name="universidad"
                value={universidad}
                onChange={onInputChange}
            />

            <h3>Carrera</h3>
            <input 
                type="text" 
                placeholder="ITC" 
                name="carrera"
                value={carrera}
                onChange={onInputChange}
            />

            <button onClick={handleRegister}>
                REGISTRAR
            </button>

            {submittedData && (
                <div>
                    <h4>Datos Registrados:</h4>
                    <pre>{JSON.stringify(submittedData, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};