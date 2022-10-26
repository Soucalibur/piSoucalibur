const { Router } = require('express');

const fetch = require('node-fetch')
const Sequelize = require("sequelize");
const Op = Sequelize.Op;


const router = Router();
const {Country, Activity ,CountryActivity} = require("../db")


router.get("/countries",async(req,res)=>{
    const {name} = req.query
    try {
        
        const comprobacionPaises = await Country.findAll()
        

        if(!comprobacionPaises.length){
            
            const respuesta = await fetch("https://restcountries.com/v3/all")
            const api = await respuesta.json()
            
            for(let i in api){

                if(!api[i].capital){
                    capitalPais = "No existe"
                }else{
                    capitalPais = api[i].capital[0]
                };
                
        
                const pais = await Country.create({
                    id : api[i].cca3,
                    name: api[i].name.common,
                    continente : api[i].region,
                    img : api[i].flags[0],
                    capital : capitalPais,
                    subregion : api[i].subregion,
                    area : api[i].area,
                    poblacion : api[i].population
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
                attributes: ["name","id","img","continente","poblacion"]

            })
            if(!pais.length){
                throw new Error("No existe el país buscado")
            }
    
            res.status(200).send(pais)
        }else{
            const paises = await Country.findAll({
                attributes: ["name","img","continente","id","poblacion"]
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
