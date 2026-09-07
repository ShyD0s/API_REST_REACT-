import { useEffect, useState } from "react";

import './App.css'

function App() {

  // Estado donde se almacenan los usuarios que llegan desde la API
  const [usuarios, setUsuarios] = useState([]);
  // Estado para indicar si la información está cargando
  const [cargando, setCargando] = useState(true);
  // Estado para guardar posibles errores
  const [error, setError] = useState("");
  useEffect(() => {
    // Función asíncrona para consultar la API
    const obtenerUsuarios = async () => {
      try {
        const respuesta = await fetch("https://jsonplaceholder.typicode.com/users");
        // Se valida si la respuesta HTTP fue correcta
        if (!respuesta.ok) {
          throw new Error("No se pudo obtener la información");
        }
        // Se transforma la respuesta a formato JSON
        const datos = await respuesta.json();
        // Se guardan los datos en el estado
        setUsuarios(datos);
      } catch (err) {
        // Si ocurre un error, se almacena el mensaje
        setError(err.message);
      } finally {
        // Finaliza el estado de carga
        setCargando(false);
      }
    };
    // Llamado a la función al cargar el componente
    obtenerUsuarios();
  }, []);
  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Consumo de API con Fetch en React</h1>
      {cargando && <p>Cargando usuarios...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {!cargando && !error && (
        <ul>
          {usuarios.map((usuario) => (
            <li key={usuario.id}>
              <strong>{usuario.name}</strong> - {usuario.email}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}






export default App
