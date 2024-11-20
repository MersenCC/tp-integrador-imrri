import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './Landing.module.css';

function Landing() {

  const [resto, setResto] = useState([]);
  const [plato, setPlato] = useState([]);
  const [cat, setCat] = useState([]);
  
  // Manejo de la carga de datos
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetch('http://localhost:3001/restaurante');
        const data2 = await fetch('http://localhost:3001/platos');
        const data3 = await fetch('http://localhost:3001/categorias');
        
        const results = await data.json();
        const results2 = await data2.json();
        const results3 = await data3.json();
        
        setResto(results);
        setPlato(results2);
        setCat(results3);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };
    
    fetchData(); // Llamada a la función asincrónica
  }, []); // El array vacío asegura que la llamada se haga solo una vez al cargar el componente
  
  let portada_resto = "https://i.sstatic.net/lnYep.png";
  let nombre_resto = "No Encontrado";

  // Asegúrate de que "resto" tenga datos antes de usar map
  if (resto.length > 0) {
    resto.map((elemento) => {
      portada_resto = elemento.foto_Portada_Url;
      nombre_resto = elemento.nombre_Restaurante;
    });
  }

  const location = useLocation();
  const { user } = location.state || {}; // Manejo de "user" de la ubicación

  const [carrito, setCarrito] = useState(() => {
    const savedCarrito = localStorage.getItem('carrito');
    return savedCarrito ? JSON.parse(savedCarrito) : [];
  });

  const agregarAlCarrito = (producto) => {
    const carritoActualizado = [...carrito];
    const productoExistente = carritoActualizado.find((p) => p.id === producto.id);

    if (productoExistente) {
      productoExistente.cantidad += 1;
    } else {
      carritoActualizado.push({ ...producto, cantidad: 1 });
    }

    setCarrito(carritoActualizado);
  };

  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }, [carrito]);

  const [searchTerm, setSearchTerm] = useState('');

  // Filtrar platos según el término de búsqueda
  const filteredPlatos = plato.filter((plato) =>
    plato.nombre_Plato.toLowerCase().includes(searchTerm.toLowerCase()) ||
    plato.descripcion_Plato.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <header style={{ backgroundImage: 'url(' + portada_resto + ')' }}>
        <section className={styles.portada}>
          <div className={styles.saludo}>
            <h1>Buenos Días, {user ? user : "Invitado"}</h1>
            <h4>Bienvenido a {nombre_resto}</h4>
          </div>
          <div className={styles.buscador}>
            <div className={styles.icono}>
              <i className="material-symbols-outlined">room</i>
            </div>
            <input
              type="search"
              placeholder="Buscar platos"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} 
            />
          </div>
        </section>

        {/* Navegación de categorías */}
        <nav className={styles.categorias}>
          {cat.length > 0 ? (
            cat.map((ele) => (
              <a href="#" className={styles.btnCat} key={ele.nombre_Categoria}>
                <i className="material-symbols-outlined">{ele.foto}</i>
                {ele.nombre_Categoria}
              </a>
            ))
          ) : (
            <p>Cargando categorías...</p>
          )}
        </nav>
      </header>

      <main className={styles.mainLanding}>
        <h2>MENU</h2>
        <br />
        <section className={styles.platos}>
          {filteredPlatos.length > 0 ? (
            filteredPlatos.map((e) => {
              let estrellas = [];
              for (let x = 0; x < 5; x++) {
                if (x < e.promedioCalificacion) {
                  estrellas.push(<i className="material-symbols-outlined" key={x}>star</i>);
                } else {
                  estrellas.push(<i className="material-symbols-outlined" key={x}>star_border</i>);
                }
              }

              return (
                <article className={styles.plato} key={e.ID_PLATO}>
                  <a href={"/details?id=" + e.ID_PLATO}>
                    <div className={styles.imagen_plato} style={{ backgroundImage: 'url(' + e.foto_Url + ')' }}></div>
                    <div className={styles.desc_plato}>
                      <h3>{e.nombre_Plato}</h3>
                      <h5 className={styles.gris_txt}>
                        <p>{e.descripcion_Plato}</p>
                      </h5>
                      <div className={styles.precio_val}>
                        <div className={styles.valoraciones}>
                          {estrellas.map((elem, index) => <span key={index}>{elem}</span>)}
                        </div>
                        <div className={styles.precio}>
                          <p className={styles.verde_txt}>{"$" + e.precio}</p>
                        </div>
                      </div>
                    </div>
                  </a>
                  <div className={styles.puntuacion}>{e.promedioCalificacion}</div>
                  <button className={styles.btnAgregarCarrito} onClick={() => agregarAlCarrito(e)}>
                    <i className="material-symbols-outlined">shopping_cart</i> Añadir al carrito
                  </button>
                </article>
              );
            })
          ) : (
            <p>Cargando platos...</p>
          )}
        </section>

        <div className={styles.btnCarrito}>
          <a href="/carrito">
            <i className="material-symbols-outlined">shopping_cart</i>
            <span>{carrito.length}</span> 
          </a>
        </div>
      </main>
    </>
  );
}

export default Landing;
