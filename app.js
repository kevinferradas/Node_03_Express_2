// Importa el módulo 'path' de Node.js para trabajar con rutas de archivos y directorios
const path = require("node:path");

// Importa el módulo 'express' para crear el servidor web
const express = require("express");

// Crea una instancia de una aplicación de Express
const app = express();

// Cargamos variables de entorno desde fichero .env
process.loadEnvFile();

// Define el puerto: la variable de entorno PORT, y si no funciona, usa 8888
const PORT = process.env.PORT || 8888;

// Importamos datos desde el archivo ventas.json.
// Lo convierte automáticamente en un objeto JavaScript
const jsonData = require("./ventas.json");
// console.log(jsonData);

// Ruta principal: responde con un mensaje simple cuando se accede a '/'
app.get("/", (req, res) => res.send("Hello World!"));

// /api
app.get("/api", (req, res) => {

    // query
//   console.table(req.query);

  if (req.query.year && req.query.year == "desc" && req.query.pais == "asc") {
    let json1 = jsonData.sort((a, b) => a.pais.localeCompare(b.pais, "es-ES", { numeric: true }))
    let json2 = json1.sort((a, b) => b.anyo - a.anyo)
    
    return res.json(json2);
  } else if (req.query.year && req.query.year == "desc") {
    return res.json(jsonData.sort((a, b) => b.anyo - a.anyo));
  }

  res.json(jsonData);

  
  })

 //'/api/paises' -> de cada país el total de las ventas de cada uno
 // [{"pais": "Italia", "ventas-totales": 2500},{"pais": "Francia", "ventas-totales": 3000}] 
app.get('/api/paises', (req,res) => {
    const resultado = []
    const ventaPorPais = {}
    for (let i = 0; i < jsonData.length; i++){
        const pais = jsonData[i].pais
        const venta = jsonData[i].venta

        if (!ventaPorPais[pais]){
            ventaPorPais[pais] = 0
        }
        ventaPorPais[pais] += venta
    }
    console.log(ventaPorPais);

    for (clave in ventaPorPais){
        resultado.push({"país": clave , "ventas-totales": ventaPorPais[clave]})
    }
    res.json (resultado)

    // en caso , por alguna razón, no se haya nada en el ventas.json
    if (resultado.length == 0) return res.json({"respuesta" : "No hay datos en este momento"})
    res.json (resultado)

    
});


  // '/api/paises/italia' -> los datos sobre Italia 
// app.get('/api/paises/:nombrePais', (req,res) => {
//     console.table(req.params.nombrePais);
// });

app.get('/api/paises/:nombrePais', (req,res) => {
     
    const objeto_pais = []

    const nombrePais = req.params.nombrePais.toLocaleLowerCase()

    for (let i = 0; i < jsonData.length; i++){

        if(jsonData[i].pais.toLocaleLowerCase() === nombrePais){

            objeto_pais.push(jsonData[i])
        }
    
    }

// const resultadoFilter = jsonData.filter(objeto => objeto.pais.toLocaleLowerCase() == nombrePais)
   console.log(nombrePais);
    res.json (objeto_pais)

});

// api/year/2024 --> objetos con años 2024
app.get('/api/year/:year', (req,res) => {

    let year = req.params.year
    const resultadoFilter = jsonData.filter(
        (objeto) => objeto.anyo == year 
    )
    console.log(resultadoFilter);
    if (resultadoFilter.length == 0) return res.json({"respuesta" : "No hay datos en este momento"})
    res.json (resultadoFilter)
})


// api/year/2024/Italia --> objetos con años 2024
app.get('/api/year/:year/:nombrePais', (req,res) => {

    let year = req.params.year
    const nombrePais = req.params.nombrePais.toLocaleLowerCase()

    const resultadoFilter = jsonData.filter(
        objeto => objeto.anyo == year && objeto.pais.toLocaleLowerCase() === nombrePais
    )
    console.log(resultadoFilter);
    if (resultadoFilter.length == 0) return res.json({"respuesta" : "No hay datos en este momento"})
    res.json (resultadoFilter)
})





app.listen(PORT, () =>
  console.log(`Example app listening on http://localhost:${PORT}`)
);