let options = {
    archivo: {
        require: true,
        alias: 'f',
        desc: 'Permite establecer el path del archivo CSV que contiene los datos a analizar.'

    },
    pais: {
        default: 'ECU',
        alias: 'c',
        desc: 'Permite determinar el país a analizar a través de su código ISO 3166 ALPHA-3.'
    },
    anio: {
        default: 1960,
        alias: 'y',
        desc: 'Permite especificar el año para el cual se requiere las estadísticas.'
    }
}

const argv = require('yargs')
    .command('mostrar', 'Este comando imprime en pantalla el resultado de la búsqueda', options)
    .command('guardar', 'Este comando genera un archivo de texto con el resultado de la búsqueda', options)
    .help()
    .demandCommand(1)
    .argv;

module.exports = {
    argv
}