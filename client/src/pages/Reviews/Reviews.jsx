import React, { useState, useEffect } from 'react';
import styles from './Reviews.module.css';

const obtenerReseñas = async () => {
  try {
    return [
      { id: 1, usuario: "Carlos", comentario: "Excelente comida y servicio. Muy recomendado!", puntuacion: 5 },
      { id: 2, usuario: "Lucía", comentario: "La comida estuvo bien, pero el servicio fue lento.", puntuacion: 3 },
      { id: 3, usuario: "Federico", comentario: "Un lugar acogedor, pero los precios son algo altos.", puntuacion: 4 },
    ];
  } catch (error) {
    console.error("Error obteniendo las reseñas:", error);
    return [];
  }
};

const URL = window.location.href
const PLATO_SELECT = parseInt(URL.slice(-1))

const Reviews = () => {
  const [reseñas, setReseñas] = useState([]);

  useEffect(() => {
    const cargarReseñas = async () => {
      const data = await obtenerReseñas();
      setReseñas(data);
    };
    cargarReseñas();
  }, []);

  return (
    <div className={styles.container}>
      <section className={styles.reviewsSection}>
        <h2>Reseñas de Clientes</h2>
        <div className={styles.reviewsList}>
          {reseñas.length === 0 ? (
            <p>No hay reseñas disponibles.</p>
          ) : (
            reseñas.map((reseña) => (
              <div key={reseña.id} className={styles.reviewCard}>
                <div className={styles.reviewHeader}>
                  <h3>{reseña.usuario}</h3>
                  <div className={styles.stars}>
                    {Array.from({ length: 5 }, (_, index) => (
                      <span key={index} className={index < reseña.puntuacion ? styles.filledStar : styles.emptyStar}>
                        &#9733;
                      </span>
                    ))}
                  </div>
                </div>
                <p className={styles.comentario}>{reseña.comentario}</p>
              </div>
            ))
          )}
        </div>
      </section>

      <nav className={styles.menuinferior}>
        <a className={styles.btnDir} href={"/details?id="+PLATO_SELECT}>
          <button className={styles.btnDef} type="button">DETALLES</button>
        </a>
        <button className={styles.focused} type="button">RESEÑAS</button>
      </nav>
    </div>
  );
};

export default Reviews;
