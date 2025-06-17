const path = require ('node:path')
const express = require('express')

const app = express()

process.loadEnvFile()
const PORT = process.env.PORT || 8888

const jsonData = require('./ventas.json')
// console.log(jsonData);

app.get('/',(req,res) => res.send('Hello World!'))


app.get("/api", (req, res) => {
    console.log(req.query);

    if (req.query.any && req.query.any== "desc" && req.query.pais== "asc" ){
        return res.json(jsonData.sort((a, b) => b.anyo - a.anyo ))
    }
    
    if (req.query.any && req.query.any== "desc"  ){
        return res.json(jsonData.sort((a, b) => b.anyo - a.anyo ))
    }

    res.json(jsonData)
})


app.listen(PORT, () => console.log(`Example app listening on http://localhost:${PORT}`));