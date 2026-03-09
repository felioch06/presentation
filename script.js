// test-ai-review.js

// Simula código con varios problemas para probar el AI reviewer

const express = require("express")
const app = express()

let users = []

// ❌ mala práctica: variable global mutable
var cache = {}


// ❌ función muy larga y poco clara
function getUserData(id) {

    // ❌ comparación débil
    if(id == null){
        return null
    }

    // ❌ posible error si id no es string
    if(id.length > 10){
        console.log("id too long")
    }

    // ❌ acceso inseguro
    if(cache[id]){
        return cache[id]
    }

    for(let i = 0; i < users.length; i++){

        // ❌ comparación débil
        if(users[i].id == id){

            // ❌ mutación innecesaria
            users[i].lastAccess = Date.now()

            cache[id] = users[i]

            return users[i]

        }

    }

    return null
}


// ❌ endpoint vulnerable
app.get("/user", (req, res) => {

    const id = req.query.id

    // ❌ posible crash
    const user = getUserData(id)

    // ❌ no valida input
    if(!user){
        res.send("User not found")
        return
    }

    // ❌ devuelve datos completos
    res.json(user)

})


// ❌ endpoint inseguro
app.post("/user", (req, res) => {

    const body = req.body

    // ❌ no validación
    users.push(body)

    res.send("ok")

})


// ❌ puerto hardcodeado
app.listen(3000, () => {
    console.log("server running")
})


// ❌ código inútil
function slowFunction(){

    let total = 0

    for(let i = 0; i < 100000000; i++){
        total += i
    }

    return total
}

slowFunction()
