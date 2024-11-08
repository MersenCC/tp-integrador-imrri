import { useState } from 'react'
import styles from './Details.module.css'

/*const ObtenerDatos = async => {
  try {
    const data = await fetch(``);
    const results = await data.json();
    return results;
  } catch (err) {
    console.error(err);
  }
}*/

function Details() {
  return (
        <>
            <main className={styles.mainResto}>
                <section className={styles.linkResto}>
                    <a href="/"><div className={styles.close}><i className="material-icons-outlined">close</i></div></a>
                    <div className={styles.picResto} style={{backgroundImage: 'url("https://avanti.com.uy/cdn/shop/articles/20220119164123-ravioles-de-verdura-con-salsa-rosa_1024x.png?v=1642610489")'}}></div>
                    <div className={styles.nameResto}>
                        <h1>La Tablita</h1>
                        <h4>Chinesse, Licour</h4>
                    </div>
                    <div className={styles.calificacion}>
                        <div className={styles.puntuResto}>3</div>
                        <div className={styles.priceResto}>
                            <p className={styles.gris_txt}>$245.99</p>
                        </div>
                    </div>
                </section>
                <section className={styles.descResto}>
                    <div className={styles.details}>
                        <div className={styles.info}>
                            <i className="material-icons-outlined">schedule</i>
                            <p>9AM-23PM</p>
                        </div>
                        <div className={styles.info}>
                            <i className="material-icons-outlined">place</i>
                            <p>3KM</p>
                        </div>
                        <div className={styles.info}>
                            <i className="material-icons-outlined">room_service</i>
                            <p>DELIVERY</p>
                        </div>
                    </div>
                    <div className={styles.textito}>
                        <p>Lorem ipsum dolor sit amet 
                        consectetur adipisicing elit. 
                        Alias deserunt reiciendis deleniti 
                        error voluptatum, beatae cupiditate 
                        esse blanditiis! Officia distinctio 
                        odio magni. Tenetur reprehenderit eum 
                        ratione possimus veritatis esse 
                        voluptatibus!</p>
                    </div>
                </section>
            </main>
            <nav className={styles.menuinferior}>
                <button className={styles.focused} type="button">DETALLES</button>
                <a className={styles.btnDir} href="/menu"><button className={styles.btnDef} type="button">MENU</button></a>
                <a className={styles.btnDir} href="/reviews"><button className={styles.btnDef} type="button">RESEÑAS</button></a>
            </nav>
        </>
    )
}

export default Details