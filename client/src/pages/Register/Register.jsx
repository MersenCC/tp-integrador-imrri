import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Register.module.css';

function Register() {
  const [formData, setFormData] = useState({
    nombre_Usuario: '',
    apellido_Usuario: '',
    foto_Url_Usuario: '',
    telefono: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const navigate = useNavigate(); 

    const response = await fetch('http://localhost:3001/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nombre_Usuario: formData.nombre_Usuario,
        apellido_Usuario: formData.apellido_Usuario,
        foto_Url_Usuario: formData.foto_Url_Usuario,
        telefono: formData.telefono,
        email: formData.email,
        password: formData.password
      }),
    });

    const data = await response.json();

    if (response.ok) {
      alert('Registro Exitoso');
      navigate('/login');
    } else {
      setError(data.message || 'Credenciales incorrectas');
    }
  };

  return (
    <>
      <div className={styles.container}>
        <h1>Registrarse</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label htmlFor="nombre_Usuario">Nombre</label>
          <input
            type="text"
            id="nombre_Usuario"
            name="nombre_Usuario"
            value={formData.nombre_Usuario}
            onChange={handleChange}
            required
          />

          <label htmlFor="apellido_Usuario">Apellido</label>
          <input
            type="text"
            id="apellido_Usuario"
            name="apellido_Usuario"
            value={formData.apellido_Usuario}
            onChange={handleChange}
            required
          />

          <label htmlFor="foto_Url_Usuario">Foto URL</label>
          <input
            type="url"
            id="foto_Url_Usuario"
            name="foto_Url_Usuario"
            value={formData.foto_Url_Usuario}
            onChange={handleChange}
            placeholder="URL de la foto (opcional)"
          />

          <label htmlFor="telefono">Teléfono</label>
          <input
            type="text"
            id="telefono"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
          />

          <label htmlFor="email">Correo Electrónico</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button type="submit" className={styles.btnRegister}>Registrarse</button>
        </form>

        <p className={styles.redirectText}>
          ¿Ya tienes una cuenta?{' '}
          <a href="/login" className={styles.loginLink}>Inicia sesión aquí</a>
        </p>
      </div>
    </>
  );
}

export default Register;
