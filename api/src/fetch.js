const fetch = require('node-fetch')

const api = undefined

if(api === undefined){
    api = async () => await fetch("https://restcountries.com/v3/all")
    .then((response) => response.json())
}else{
    
}


api()
console.log(api())

module.exports = api