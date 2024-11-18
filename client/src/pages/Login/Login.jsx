import { useState } from 'react';
import styles from './Login.module.css';

function Login() {
  const [formData, setFormData] = useState({ nombre: '', email: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos enviados:', formData);
  };

  return (
    <>
      <div className={styles.container}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h2 className={styles.title}>Iniciar Sesión</h2>
          <div className={styles.field}>
            <label htmlFor="nombre">Nombre de Usuario</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              className={styles.input}
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Ingresa tu nombre"
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
          <p className={styles.text}>
            ¿No tienes una cuenta? <a href="/register">Regístrate</a>
          </p>
        </form>
      </div>
    </>
  );
}

export default Login;
