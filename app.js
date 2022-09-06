const { leerInput, inquireMenu, pausa, listarLugares } = require("./helpers/inquirer");
const Busquedas = require("./models/busqueda");


const main = async()=>{
    let opt;

    const busqueda = new Busquedas();
    
    do {
        opt = await inquireMenu();
        
        switch (opt) {
            case 1:

                const termino = await leerInput('Ciudad: ');
                // Buscar los lugares
                const lugares = await busqueda.ciudad(termino)
                
                // Seleccionar lugar
                const id = await listarLugares(lugares);
                if(id==='0')continue;
                const lugarSel = lugares.find(l=>l.id===id);
                busqueda.agregarHistorial(lugarSel.nombre)
                console.log({id})
                console.log(lugarSel);
                //Clima
                const climaSel = await busqueda.climaLugar(lugarSel.lat,lugarSel.lng);
                console.log(climaSel);


                //Mostrar resultados
                console.log('\nInformacion de la ciudad\n'.green);
                console.log('Ciudad: ', lugarSel.nombre)
                console.log('Lat: ', lugarSel.lat)
                console.log('Lng: ', lugarSel.lng)
                console.log('Temperatura: ', climaSel.temp)
                console.log('Mínima: ', climaSel.min)
                console.log('Maxima: ', climaSel.max)
                console.log('Descripción: ', climaSel.desc)

            break;
            case 2:
            busqueda.historialCapitalizao.forEach((lugar,i)=>{
                const idx = `${i+1}.`.green;
                console.log(`${idx} ${lugar}`);
            })
            break;
                
                default:
                    break;
                }
        if(opt !== 0)await pausa();
                
            } while (opt!==0);
}

main();