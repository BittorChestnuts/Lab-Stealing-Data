require("dotenv").config()
const mongoose = require("mongoose")
const CharacterModel = require('./character.model')
const Character = require("./character.model")

const URI = process.env.MONGO_URI

mongoose.connect(URI)
    .then(() => console.log("connected to the Database"))

    .catch((error) => console.log(error))

//const newModel = moongose.model("cleanedArray", CharacterModel)



fetch("https://rickandmortyapi.com/api/character")
    .then((data) => data.json())
    .then((jsonData) => {
        const cleanedArray = []
        jsonData.results.forEach(element => {
            const object = { name: element.name, imageUrl: element.image }
            cleanedArray.push(object)
        });
        return cleanedArray
    })
    .then((cleanedArray) => {
        return Character.insertMany(cleanedArray)
    })

    .then((characters) => {console.log("characters created", characters) })
    .catch((error) => console.log(error))

