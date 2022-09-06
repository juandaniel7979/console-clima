const inquirer = require('inquirer');
require('colors')

const preguntas= [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Que desea hacer?',
        choices: [
            {
                value: 1,
                name: `${'1.'.green} Buscar ciudad`
            },
            {
                value: 2,
                name: `${'2.'.green} Historial`
            },
            {
                value: 0,
                name: `${'0.'.green} Salir`
            },
        ]
    }
]

const inquireMenu = async()=>{
    // console.clear();
    console.log('=============================='.green)
    console.log('   Seleccione una opción:');
    console.log('==============================\n'.green)


    const {opcion} = await inquirer.prompt(preguntas)
    // console.log('opcion seleccionada',opcion);
    return opcion;
}


const pausaOpt= [
    {
        type: 'input',
        name: 'pausa',
        message: `Presione: ${'Enter'.green} para continuar\n`,
    }
]
const pausa = async()=>{
    // console.clear();
    console.log('\n')
    const {pausa} = await inquirer.prompt(pausaOpt)
    return pausa;
}

const leerInput = async(message) => {
    const question={
        type:'input',
        name:'desc',
        message,
        validate(value){
            if(value.length===0){
                return 'Por favor ingrese un valor'
            }
            return true;
        }
    }

    const {desc} = await inquirer.prompt(question);
    return desc;
}


const listarLugares = async (lugares = [])=>{
    const choices = lugares.map( (lugar,idx)=>{
        const index = `${ idx + 1}.`.green
        return {
            value: lugar.id,
            name: `${index} ${lugar.nombre}`
        }
    })

    choices.unshift({
        value:'0',
        name: '0.'.green + ' Cancelar'
    })
    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Seleccione lugar: ',
            choices
        }
    ]
    const {id} = await inquirer.prompt(preguntas);
    return id;
}

const confirmar = async(message) =>{
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];
    const {ok} = await inquirer.prompt(question)
    return ok;
}


const mostrarListadoCheckList = async (tareas = [])=>{
    const choices = tareas.map( (tarea,idx)=>{
        const index = `${ idx + 1}.`.green
        return {
            value: tarea.id,
            name: `${index} ${tarea.desc}`,
            checked: (tarea.completadoEn) ? true : false
        }
    })

    const pregunta = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Selecciones',
            choices
        }
    ]
    const {ids} = await inquirer.prompt(pregunta);
    return ids;
}

module.exports={
    inquireMenu,
    pausa,
    leerInput,
    listarLugares,
    confirmar,
    mostrarListadoCheckList
}