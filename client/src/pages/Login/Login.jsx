import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';

function Login() {
  const [formData, setFormData] = useState({ nombre_Usuario: '', email: '', password: '' });
  console.log(formData)
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

   
    const response = await fetch('http://localhost:3001/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password,
      }),
    });

    const data = await response.json();

    if (response.ok) {
     
      if (formData.email === "admin@gmail.com" && formData.password === "admin") {
       
        navigate('/admin', { state: {user: formData.nombre_Usuario} });
      } else {
       
        navigate('/landing', { state: {user: formData.nombre_Usuario} });
      }
    } else {
      
      setError(data.message || 'Credenciales incorrectas');
    }
  };

  return (
    <>
      <div className={styles.container}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h2 className={styles.title}>Iniciar Sesión</h2>
          <div className={styles.field}>
            <label htmlFor="nombre_Usuario">Nomber de Usuario</label>
            <input
              type="text"
              id="nombre_Usuario"
              name="nombre_Usuario"
              className={styles.input}
              value={formData.nombre_Usuario}
              onChange={handleChange}
              placeholder="Ingresa tu usuario"
              required
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="email">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              name="email"
              className={styles.input}
              value={formData.email}
              onChange={handleChange}
              placeholder="Ingresa tu correo"
              required
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              className={styles.input}
              value={formData.password}
              onChange={handleChange}
              placeholder="Ingresa tu contraseña"
              required
            />
          </div>
          <button type="submit" className={styles.button}>
            Ingresar
          </button>
          {error && <p className={styles.error}>{error}</p>} 
          <p className={styles.text}>
            ¿No tienes una cuenta? <a href="/register">Regístrate</a>
          </p>
        </form>
      </div>
    </>
  );
}

export default Login;
