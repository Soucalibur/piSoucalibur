const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const fetch = require('node-fetch')
const Sequelize = require("sequelize");
const Op = Sequelize.Op;


const router = Router();
const {Country, Activity ,CountryActivity} = require("../db")

// const api = require("../fetch")

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/countries",async(req,res)=>{
    const {name} = req.query
    try {
        
        const algo = await Country.findAll()
        // console.log(algo)

        if(!algo.length){
            
            const respuesta = await fetch("https://restcountries.com/v3/all")
            const api = await respuesta.json()
            
            for(let i in api){

                const idPais = api[i].cca3;
                const namePais = api[i].name.common;
                const continentePais = api[i].region;
                const imgPais = api[i].flags[0];
                let capitalPais = ""
                if(!api[i].capital){
                    capitalPais = "No existe"
                }else{
                    capitalPais = api[i].capital[0]
                };
                const subregionPais = api[i].subregion;
                const areaPais = api[i].area;
                const poblacionPais = api[i].population
                
                
        
                const pais = await Country.create({
                    id : idPais,
                    name: namePais,
                    continente : continentePais,
                    img : imgPais,
                    capital : capitalPais,
                    subregion : subregionPais,
                    area : areaPais,
                    poblacion : poblacionPais
                })
        
                 
            };
            

        }

        if(name){
            const pais = await Country.findAll({
                where: {
                    name:{
                        [Op.or]:{
                            [Op.like]: `%${name.toLowerCase()}%`,
                            [Op.startsWith]: name[0].toUpperCase()+name.toLowerCase().substring(1),
                        }
                    }
                },
                attributes: ["name","id"]

            })
            if(!pais.length){
                throw new Error("No existe el país buscado")
            }
    
            res.status(200).send(pais)
        }else{
            const paises = await Country.findAll({
                attributes: ["name","id"]
            })
            res.status(200).send(paises)
        }

    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.get("/countries/:id",async(req,res)=>{
    
    const {id} = req.params;
    
    try {
        const idPais = await Country.findAll({
            where: {id},
            include:[{
                model: Activity,
                attributes: ["name","id","dificult","duration","season"],
                through:{
                    attributes:["CountryId","ActivityId"]
                }

            }]
        })

        if(!idPais){
            throw new Error("No se encuentra el país solicitado")
        }
        res.status(200).send(idPais)

    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.post("/activities",async(req,res)=>{
    try {
        const {name,dificult,duration,season,CountryId} = req.body
        const newActivity = await Activity.create({name,dificult,duration,season});
        await newActivity.setCountries(CountryId);
        res.status(200).send(newActivity)
    } catch (error) {
        res.status(400).send(error.message)        
    }
})




module.exports = router;
