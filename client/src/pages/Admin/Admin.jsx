import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Admin.module.css';

function Admin() {
  const navigate = useNavigate();
  const [platos, setPlatos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [formData, setFormData] = useState({
    nombre_Plato: '',
    descripcion_Plato: '',
    precio: '',
    foto_Url: '',
    FK_ID_CATEGORIA: ''
  });
  const [platoToUpdate, setPlatoToUpdate] = useState(null);
  const [platoToDelete, setPlatoToDelete] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const platosRes = await fetch('http://localhost:3001/platos');
      const categoriasRes = await fetch('http://localhost:3001/categorias');
      setPlatos(await platosRes.json());
      setCategorias(await categoriasRes.json());
    };
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleAddPlato = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:3001/agregarPlato', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });
    const newPlato = await response.json();
    setPlatos([...platos, newPlato]);
    setFormData({
      nombre_Plato: '',
      descripcion_Plato: '',
      precio: '',
      foto_Url: '',
      FK_ID_CATEGORIA: ''
    });
  };

  const handleUpdatePlato = async (e) => {
    e.preventDefault();
    if (!platoToUpdate) return;

    const response = await fetch(`http://localhost:3001/actualizarPlato/${platoToUpdate}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    const updatedPlato = await response.json();
    setPlatos(platos.map(plato => plato.ID_PLATO === updatedPlato.ID_PLATO ? updatedPlato : plato));
    setPlatoToUpdate(null);
    setFormData({
      nombre_Plato: '',
      descripcion_Plato: '',
      precio: '',
      foto_Url: '',
      FK_ID_CATEGORIA: ''
    });
  };

  const handleDeletePlato = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:3001/eliminarPlato/${platoToDelete}`, {
      method: 'DELETE'
    });
    const result = await response.json();
    if (result.message.includes('eliminado')) {
      setPlatos(platos.filter(plato => plato.ID_PLATO !== parseInt(platoToDelete)));
    }
    setPlatoToDelete('');
  };

  const handleSelectPlatoToUpdate = (e) => {
    const selectedPlato = platos.find(plato => plato.ID_PLATO === parseInt(e.target.value));
    if (selectedPlato) {
      setPlatoToUpdate(selectedPlato.ID_PLATO);
      setFormData({
        nombre_Plato: selectedPlato.nombre_Plato,
        descripcion_Plato: selectedPlato.descripcion_Plato,
        precio: selectedPlato.precio,
        foto_Url: selectedPlato.foto_Url,
        FK_ID_CATEGORIA: selectedPlato.FK_ID_CATEGORIA
      });
    }
  };

  const handleLogout = () => {
   
    localStorage.removeItem('token'); 

    
    navigate('/login');
  };

  return (
    <div className={styles.adminPanel}>
      <div className={styles.header}>
        <h1>Panel de Administración</h1>
    
        <button onClick={handleLogout} className={styles.logoutButton}>Cerrar sesión</button>
      </div>

     
      <div className={styles.card}>
        <h3>Agregar Nuevo Plato</h3>
        <form onSubmit={handleAddPlato}>
          <input
            type="text"
            name="nombre_Plato"
            placeholder="Nombre del Plato"
            value={formData.nombre_Plato}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="descripcion_Plato"
            placeholder="Descripción"
            value={formData.descripcion_Plato}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="precio"
            placeholder="Precio"
            value={formData.precio}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="foto_Url"
            placeholder="URL de la Foto"
            value={formData.foto_Url}
            onChange={handleInputChange}
          />
          <select
            name="FK_ID_CATEGORIA"
            value={formData.FK_ID_CATEGORIA}
            onChange={handleInputChange}
          >
            {categorias.map(categoria => (
              <option key={categoria.ID_CATEGORIA} value={categoria.ID_CATEGORIA}>
                {categoria.nombre_Categoria}
              </option>
            ))}
          </select>
          <button type="submit">Agregar Plato</button>
        </form>
      </div>

     
      <div className={styles.card}>
        <h3>Actualizar Plato</h3>
        <form onSubmit={handleUpdatePlato}>
          <select onChange={handleSelectPlatoToUpdate} value={platoToUpdate || ''}>
            <option value="">Seleccione un Plato para Actualizar</option>
            {platos.map(plato => (
              <option key={plato.ID_PLATO} value={plato.ID_PLATO}>
                {plato.nombre_Plato}
              </option>
            ))}
          </select>
          {platoToUpdate && (
            <>
              <input
                type="text"
                name="nombre_Plato"
                placeholder="Nuevo Nombre"
                value={formData.nombre_Plato}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="descripcion_Plato"
                placeholder="Nueva Descripción"
                value={formData.descripcion_Plato}
                onChange={handleInputChange}
              />
              <input
                type="number"
                name="precio"
                placeholder="Nuevo Precio"
                value={formData.precio}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="foto_Url"
                placeholder="Nueva URL de Foto"
                value={formData.foto_Url}
                onChange={handleInputChange}
              />
              <select
                name="FK_ID_CATEGORIA"
                value={formData.FK_ID_CATEGORIA}
                onChange={handleInputChange}
              >
                {categorias.map(categoria => (
                  <option key={categoria.ID_CATEGORIA} value={categoria.ID_CATEGORIA}>
                    {categoria.nombre_Categoria}
                  </option>
                ))}
              </select>
              <button type="submit">Actualizar Plato</button>
            </>
          )}
        </form>
      </div>

    
      <div className={styles.card}>
        <h3>Eliminar Plato</h3>
        <form onSubmit={handleDeletePlato}>
          <select
            name="platoToDelete"
            value={platoToDelete}
            onChange={(e) => setPlatoToDelete(e.target.value)}
          >
            <option value="">Seleccione un plato</option>
            {platos.map(plato => (
              <option key={plato.ID_PLATO} value={plato.ID_PLATO}>
                {plato.nombre_Plato}
              </option>
            ))}
          </select>
          <button type="submit">Eliminar Plato</button>
        </form>
      </div>
    </div>
  );
}

export default Admin;
