import { useState } from 'react'
import styles from './Menu.module.css'

const ObtenerPlatos = async () => {
    try {
        const data = await fetch(`http://localhost:3001/platos`);
        const results = await data.json();
        return results;
    } catch (err) {
        console.error(err);
    }
}

const ObtenerDatos = async () => {
    try {
        const data = await fetch(`http://localhost:3001/restaurante`);
        const results = await data.json();
        return results;
    } catch (err) {
        console.error(err);
    }
}


const URL = window.location.href
const PLATO_SELECT = parseInt(URL.slice(-1))

const PLATOS = await ObtenerPlatos()
const RESTO = await ObtenerDatos()
let NombreResto

RESTO.map(e => {
   NombreResto = e.nombre_Restaurante
})

function Menu() {
  return (
    <>
        <header className={styles.headerMenu}>
            <div className={styles.contenedor}>
                <div className={styles.close_menu}><a href="/"><i className="material-symbols-outlined">close</i></a></div>
                <div className={styles.titleResto}><p>{NombreResto}</p></div>
            </div>
        </header>
        <main className={styles.mainMenu}>
            <div className={styles.platoTituloMain}>
                <p>PLATOS PRINCIPALES</p>
            </div>
            <section className={styles.platos}>
                {PLATOS.map(element => {
                    return(
                        <>
                            <a href={"/details?id="+element.ID_PLATO}>
                                <article className={styles.plato}>
                                    <div className={styles.imgPlato} style={{backgroundImage: 'url('+element.foto_Url+')'}}>
                                        <div className={styles.precioPlato}>${element.precio}</div>
                                    </div>
                                    <div className={styles.descPlato}>
                                        <h3>{element.nombre_Plato}</h3>
                                        <h4>{element.descripcion_Plato}</h4>
                                    </div>
                                </article>
                            </a>
                        </>
                    )
                })}
            </section>
        </main>
        <nav className={styles.menuinferior}>
            <a className={styles.btnDir} href={"/details?id="+PLATO_SELECT}><button className={styles.btnDef} type="button">DETALLES</button></a>
            <button className={styles.focused} type="button">MENU</button>
            <a className={styles.btnDir} href={"/reviews?id="+PLATO_SELECT}><button className={styles.btnDef} type="button">RESEÑAS</button></a>
        </nav>
    </>
  )
}

export default Menu