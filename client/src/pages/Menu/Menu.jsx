import { useState } from 'react'
import styles from './Menu.module.css'

/*const ObtenerDatos = async => {
  try {
    const data = await fetch(``);
    const results = await data.json();
    return results;
  } catch (err) {
    console.error(err);
  }
}*/

function Menu() {
  return (
    <>
        <header className={styles.headerMenu}>
            <div className={styles.contenedor}>
                <div className={styles.close_menu}><a href="/"><i className="material-icons-outlined">close</i></a></div>
                <div className={styles.titleResto}><p>La Tablita</p></div>
            </div>
        </header>
        <main className={styles.mainMenu}>
            <div className={styles.platoTituloMain}>
                <p>MAIN DISHES</p>
            </div>
            <section className={styles.platos}>
                <a href="">
                    <article className={styles.plato}>
                        <div className={styles.imgPlato}>
                            <div className={styles.precioPlato}>$7.99</div>
                        </div>
                        <div className={styles.descPlato}>
                            <h3>Ensalada Caesar</h3>
                            <h4>Uma Delicia</h4>
                        </div>
                    </article>
                </a>
            </section>
        </main>
        <nav className={styles.menuinferior}>
            <a className={styles.btnDir} href="/details"><button className={styles.btnDef} type="button">DETALLES</button></a>
            <button className={styles.focused} type="button">MENU</button>
            <a className={styles.btnDir} href="/reviews"><button className={styles.btnDef} type="button">RESEÑAS</button></a>
        </nav>
    </>
  )
}

export default Menu