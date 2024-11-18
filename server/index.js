const express = require('express');
const mysql = require('mysql2');
require('dotenv').config();

const api = express();
api.use(express.json());

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
})

db.connect((err) => {
    if(err){
        console.log("error: ", err);
        return;
    } else {
        console.log('conectado');
    }
})

const PORT = 3001;
api.listen(PORT, () => {
    console.log(`${PORT}`);
})
//Trae toda la info del resto
api.get('/restaurante',(req,res) => {
    db.query('SELECT * FROM restaurante__restaurante', (err,results) => {
        if(err){ 
            res.status(500).json({message : err.message});
            return;
        } else {
            if(results){
                res.json(results);
            } else {
                console.log('No hay datos');
            }
        }
    })
})

//Trae todas las categoria de los platos
api.get('/categorias',(req,res) => {
    db.query('SELECT * FROM restaurante__categorias', (err,results) => {
        if(err){ 
            res.status(500).json({message : err.message});
            return;
        } else {
            if(results){
                res.json(results);
            } else {
                console.log('No hay datos');
            }
        }
    })
})

//Trae todo los platos
api.get('/platos',(req,res) => {
    db.query('SELECT* FROM restaurante__platos', (err,results) => {
        if(err){ 
            res.status(500).json({message : err.message});
            return;
        } else {
            if(results){
                res.json(results);
            } else {
                console.log('No hay datos');
            }
        }
    })
})

//Trae todas las reviews
api.get('/reviews',(req,res) => {
    db.query('SELECT * FROM restaurante__review', (err,results) => {
        if(err){ 
            res.status(500).json({message : err.message});
            return;
        } else {
            if(results){
                res.json(results);
            } else {
                console.log('No hay datos');
            }
        }
    })
})

//Trae toda la informacion segun el id de la categoria
api.get('/categoria/:categoria',(req,res) => {
    const {categoria} = req.params;
    db.query('SELECT * FROM restaurante__platos WHERE restaurante_platos.FK_ID_CATEGORIA = ?',[categoria], (err,results) => {
        if(err){ 
            res.status(500).json({message : err.message});
            return;
        } else {
            if(results){
                res.json(results);
            } else {
                console.log('No hay datos');
            }
        }
    })
})

//Trae toda la informacion de un plato especifico
api.get('/platos/:plato',(req,res) => {
    const {plato} = req.params;
    db.query('SELECT * FROM restaurante__platos WHERE restaurante_platos.ID_PLATO = ?',[plato], (err,results) => {
        if(err){ 
            res.status(500).json({message : err.message});
            return;
        } else {
            if(results){
                res.json(results);
            } else {
                console.log('No hay datos');
            }
        }
    })
})

//Trae todas las reseñas segun el id del plato
api.get('/rev/:plato',(req,res) => {
    const {plato} = req.params;
    db.query('SELECT * FROM restaurante__review INNER JOIN restaurante__platos ON restaurante__review.FK_ID_PLATO = restaurante__platos.ID_PLATO WHERE restaurante__platos.ID_PLATO = ?',[plato], (err,results) => {
        if(err){ 
            res.status(500).json({message : err.message});
            return;
        } else {
            if(results){
                res.json(results);
            } else {
                console.log('No hay datos');
            }
        }
    })
})
 
api.post('/agregarPlato', (req,res) =>{
    const {nombre_Plato, descripcion_Plato, precio, foto_Url, FK_ID_CATEGORIA} = req.body;
    db.query('INSERT INTO restaurante__platos (restaurante__platos.nombre_Plato, restaurante__platos.descripcion_Plato, restaurante__platos.precio, restaurante__platos.foto_Url, restaurante__platos.FK_ID_CATEGORIA) VALUES(?, ?, ?, ?, ?)', [nombre_Plato, descripcion_Plato, precio, foto_Url, FK_ID_CATEGORIA], (err, results) => {
        if(err){ 
            res.status(500).json({message : err.message});
            return;
        } else {
            if(results){
                res.json(results);
            } else {
                console.log('No hay datos');
            }
        }
    })
})

//Este endpoint actualiza los datos de un plato utilizando un id
api.put('/actualizarPlato/:id', (request,res) => {
    const {nombre_Plato, descripcion_Plato, precio, foto_Url, FK_ID_CATEGORIA} = request.body;
    const {id} = request.params;
    db.query(`UPDATE restaurante__platos
              SET restaurante__platos.nombre_Plato = ?, restaurante__platos.descripcion_Plato = ?, restaurante__platos.precio = ?, restaurante__platos.foto_Url = ?, restaurante__platos.FK_ID_CATEGORIA = ? 
              WHERE restaurante__platos.ID_PLATO = ?`, [nombre_Plato, descripcion_Plato, precio, foto_Url, FK_ID_CATEGORIA, id], (err, results) => {
        if(err){ 
            res.status(500).json({message : err.message});
            return;
        } else {
            if(results){
                res.json(results);
            } else {
                console.log('No hay datos');
            }
        }

    })
})