const fs = require('fs');
const axios = require('axios');
require('dotenv').config();

class Busquedas {

    historial = [];
    dbPath='./db/database.json'
    
    constructor(){
        // TODO: leer DB si existe

        this.leerDB();
    }


    get historialCapitalizao(){
        return this.historial.map(lugar=>{
            let palabras = lugar.split(' ');
            palabras = palabras.map(p => p[0].toUpperCase()+p.substring(1));

            return palabras.join(' ')
        })
    }

    get paramsMapBox(){
        return {
            'access_token':process.env.MAPBOX_KEY,
            'limit':5,
            'language':'es'
        }
    }

    get paramsOpenWeather(){
        return {
            'appid':process.env.OPENWEATHER_KEY,
            'lang': 'es',
            'units': 'metric'
        }
    }

    async ciudad(lugar=''){
        try {
            const instance = axios.create({
                baseURL:`https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                params: this.paramsMapBox
            })
            const resp = await instance.get();
            return resp.data.features.map(lugar=>({
                id:lugar.id,
                nombre:lugar.place_name,
                lng: lugar.center[0],
                lat: lugar.center[1]
            }))
            return [];            
        } catch (error) {
            return []; //retorna lugares
        }

    }

    async climaLugar(lat,lon){
        try {
            const instance = axios.create({
                // https://api.openweathermap.org/data/2.5/weather?lat=6.17194&lon=-75.58028&appid=5f6690b7e1f203b799ad24886607bb46&units=metric&lang=es
                baseURL:'https://api.openweathermap.org/data/2.5/weather',
                params: {...this.paramsOpenWeather,lat,lon,}
            })
            const resp = await instance.get();

            const {weather,main} = resp.data;

            return {
                desc: weather[0].description,
                min: main.temp_min,
                max: main.temp_max,
                temp: main.temp
            }

        } catch (error) {
            console.log('Fallo aqui')
        }

    }

    agregarHistorial(lugar=''){
        if(this.historial.includes(lugar.toLocaleLowerCase)){
            return;
        }
        this.historial.unshift(lugar.toLocaleLowerCase());
        this.guardarDB();
    } 

    guardarDB(){
        const payload = {
            historial:this.historial
        };

        fs.writeFileSync(this.dbPath,JSON.stringify(payload))
    }

    leerDB(){
        if(!fs.existsSync(this.dbPath)) return;
        const info = fs.readFileSync(this.dbPath,{encoding:'utf-8'});
        if(!info)return;
        const {historial} = JSON.parse(info);
        this.historial=[...historial];
    }

}

module.exports = Busquedas;
