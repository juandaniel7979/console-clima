const { leerInput, inquireMenu, pausa } = require("./helpers/inquirer");
const Busquedas = require("./models/busqueda");


const main = async()=>{
    let opt;

    const busqueda = new Busquedas();
    
    do {
        opt = await inquireMenu();
        
        switch (opt) {
            case 1:
                const lugar = await leerInput('Ciudad: ');
                console.log(lugar);
                console.log('\nInformacion de la ciudad\n'.green);
                console.log('Ciudad: ')
            break;
                
                default:
                    break;
                }
        if(opt !== 0)await pausa();
                
            } while (opt!==0);
}

main();