#!/usr/bin/env node

const colors = require('colors');

const { argv } = require('./config/yargs');
const file = require('./buscador/ciudad');
const { datCiudad, guardar } = require('./buscador/buscar');

let command = argv._[0];
let path = argv.archivo
let country = argv.pais
let year = argv.anio

file.importData(path)
    .then(data => {
        switch (command) {
            case 'mostrar':
                let myData = datCiudad(data, country, year)
                console.log(`           ${myData.title}          `.green)
                console.log('****************************************'.green)
                console.log(chalk.cyan('Nombre: ', chalk.yellow(myData.name)))
                console.log(chalk.cyan('Codigo: ', chalk.yellow(myData.code)))
                console.log(chalk.cyan('Anio: ', chalk.yellow(myData.year)))
                console.log(chalk.cyan('Valor: ', chalk.yellow(myData.value)))
                break;

            case 'guardar':
                let myData2 = datCiudad(data, country, year)
                guardar(myData2)
                    .then(path => {
                        console.log('Archivo guardado exitosamente: '.green, chalk.yellow(path))
                    })
                    .catch(err =>
                        console.log('Error al escribir archivo'.red, err))
                break;

            default:
                console.log('Comando no valido.'.blue)
                break;
        }
    })
    .catch(console.log)
