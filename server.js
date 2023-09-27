import express from 'express';

const app = express();

// config para que las url reciban info compleja- interpreta mejor los datos y los mapea correctamente en el query
app.use(express.urlencoded({extended:true}))

//ejemplo de queries
app.get('/ejemploQueries', (req,res) =>{

  let consultas = req.query;
  let {nombre,apellido,edad} = req.query

  res.send(consultas)
})

//arrays de usuarios
const usuarios = [
  {
    id:'1',
   nombre:'Onelia',
   apellido:'Fermani',
   edad:25, 
   genero:'F'
  },
  {
    id:'2',
    nombre:'Mariano',
    apellido:'Fermani',
    edad:25, 
    genero:'M'
   },
   {
    id:'3',
    nombre:'Mercedes',
    apellido:'Fermani',
    edad:25, 
    genero:'F'
   }, 
]

//ruta principal - responde con los usuarios - ejemplo params
app.get('/', (req, res) => {
    
  //agrego filtro para genero
  let genero = req.query.genero;
  if(!genero||(genero!=='M'&&genero!=='F')) return res.send({usuarios})

  let usuariosFiltrados = usuarios.find(usuario=>usuario.genero===genero);
  res.send({usuarios:usuariosFiltrados})
})

//definimos parametros en las rutas para cada usuario
app.get('/:idUsuario', (req, res) => {
  let idUsuario = req.params.idUsuario;
  let usuario = usuarios.find(u=>u.id===idUsuario); 
  
  if(!usuario) return res.send({error: "usuario no encontrado"})
  res.send({usuario})
})



app.listen(8080, () => {
  console.log(`Servidor escuchando en el puerto 8080`);
});
