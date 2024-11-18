import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import styles from './Details.module.css'

const ObtenerPlatos = async () => {
  try {
    const data = await fetch(`http://localhost:3001/platos`);
    const results = await data.json();
    return results;
  } catch (err) {
    console.error(err);
  }
}

const URL = window.location.href
const PLATO_SELECT = parseInt(URL.slice(-1))
const PLATOS = await ObtenerPlatos()

function Details() {
  return (
        <>
            <main className={styles.mainResto}>
                {PLATOS.map(element => {
                    if(element.ID_PLATO == PLATO_SELECT){
                        return (
                            <>
                                <section className={styles.linkResto}>
                                    <a href="/"><div className={styles.close}><i className="material-symbols-outlined">close</i></div></a>
                                    <div className={styles.picResto} style={{backgroundImage: 'url('+element.foto_Url+')'}}></div>
                                    <div className={styles.nameResto}>
                                        <h1>{element.nombre_Plato}</h1>
                                        <h4>Chinesse, Licour</h4>
                                    </div>
                                    <div className={styles.calificacion}>
                                        <div className={styles.puntuResto}>{element.promedioCalificacion}</div>
                                        <div className={styles.priceResto}>
                                            <p className={styles.gris_txt}>${element.precio}</p>
                                        </div>
                                    </div>
                                </section>
                                <section className={styles.descResto}>
                                    <div className={styles.textito}>
                                        <p>{element.descripcion_Plato}</p>
                                    </div>
                                </section>
                            </>
                        )
                    }
                })}
            </main>
            <nav className={styles.menuinferior}>
                <button className={styles.focused} type="button">DETALLES</button>
                <a className={styles.btnDir} href={"/menu?id="+PLATO_SELECT}><button className={styles.btnDef} type="button">MENU</button></a>
                <a className={styles.btnDir} href={"/reviews?id="+PLATO_SELECT}><button className={styles.btnDef} type="button">RESEÑAS</button></a>
            </nav>
        </>
    )
}

export default Details