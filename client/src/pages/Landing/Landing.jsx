import { useState } from 'react'
import styles from './Landing.module.css'

const ObtenerRestaurante = async () => {
  try {
    const data = await fetch(`http://localhost:3001/restaurante`);
    const results = await data.json();
    return results;
  } catch (err) {
    console.error(err);
  }
}

const ObtenerPlatos = async () => {
  try {
    const data = await fetch(`http://localhost:3001/platos`);
    const results = await data.json();
    return results;
  } catch (err) {
    console.error(err);
  }
}

const ObtenerCategorias = async () => {
  try {
    const data = await fetch(`http://localhost:3001/categorias`);
    const results = await data.json();
    return results;
  } catch (err) {
    console.error(err);
  }
}

const Usuario_Actual = "Federico"

const RESTO = await ObtenerRestaurante()

const PLATOS = await ObtenerPlatos()

const CATEGORIAS = await ObtenerCategorias()

let portada_resto = "https://i.sstatic.net/lnYep.png"
let nombre_resto = "No Encontrado"

RESTO.map(elemento => {
  portada_resto = elemento.foto_Portada_Url
  nombre_resto = elemento.nombre_Restaurante
})

function Landing() {
  return (
    <>
      <header style={{backgroundImage: 'url('+portada_resto+')'}}>
        <section className={styles.portada}>
          <div className={styles.saludo}>
            <h1>Buenos Días, {Usuario_Actual}</h1>
            <h4>Bienvenido a {nombre_resto}</h4>
          </div>
          <div className={styles.buscador}>
            <div className={styles.icono}>
              <i className="material-icons-outlined">room</i>
            </div>
            <input type="search" placeholder="Ingrese algo"/>
            <input className="material-icons-outlined" type="submit" value="search"/>
          </div>
        </section>
        <nav className={styles.categorias}>
          {CATEGORIAS.map(ele => {
            return(
              <>
                <a href="#" className={styles.btnCat}>
                  <i className="material-icons-outlined">ramen_dining</i>
                  {ele.nombre_Categoria}
                </a>
              </>
            )
            })}
        </nav>
      </header>
      <main>
        <h2>MENU</h2>
        <br/>
        <section className={styles.platos}>
          {PLATOS.map(e => {
            let estrellas = []
            for(let x = 0; x < 5; x++){
              if(x < e.promedioCalificacion){
                estrellas.push(<i className="material-icons-outlined">star</i>)
              } else {
                estrellas.push(<i className="material-icons-outlined">star_border</i>)
              }
            }
            return(
              <>
                <article className={styles.plato}>
                  <a href={"/details?id="+e.ID_PLATO}>
                    <div className={styles.imagen_plato} style={{backgroundImage: 'url("'+e.foto_Url+'")'}}></div>
                    <div className={styles.desc_plato}>
                      <h3>{e.nombre_Plato}</h3>
                      <h5 className={styles.gris_txt}>
                          <p>{e.descripcion_Plato}</p>
                      </h5>
                      <div className={styles.precio_val}>
                        <div className={styles.valoraciones}>
                            {estrellas.map(elem => {
                              return(<>
                                {elem}
                              </>)
                            })}
                        </div>
                        <div className={styles.precio}>
                            <p className={styles.verde_txt}>{"$"+e.precio}</p>
                        </div>
                        </div>
                      </div>
                  </a>
                  <div className={styles.puntuacion}>{e.promedioCalificacion}</div>
                </article>
              </>
            )
          })}
        </section>
      </main>
    </>
  )
}

export default Landing
