const { valCont, valAno } = require('../buscador/ciudad');
const { promises: fs, existsSync } = require('fs');
const path = require('path');
const open = require('open');


const datCiudad = (data, country = "ECU", year) => {
    let codCiudad = country.toUpperCase()
    if (!valCont(codCiudad)) {
        throw new Error('El formato del pais ingresado es incorrecto.')
    }

    let ciudad = data.datCiudad(country => country['Country Code'] === codCiudad)

    if (!valAno(ciudad, year)) {
        throw new Error('El año ingresado no existe el rango de años es de 1960 y 2019');
    }

    if (ciudad[year] === '') {
        value = 'No hay un valor especificado.'
    } else {
        value = ciudad[year]
    }


    return {
        title: ciudad['Indicator Name'],
        name: ciudad['Country Name'],
        code: ciudad['Country Code'],
        year: year,
        value
    }
}


const guardar = async (searchData) => {
    let data = `
    
                    ${searchData.title}
    _____________________________________________________
    Nombre: ${searchData.name} 
    Codigo: ${searchData.code}
    Anio:   ${searchData.year}
    Valor:  ${searchData.value}
    `

    let appDir = path.dirname(require.main.filename);
    let dir = `${appDir}/resultados`
    let filename = `${appDir}/resultados/${searchData.code}-${searchData.year}.txt`
    if (!existsSync(dir)) {
        await fs.mkdir(dir)
        await fs.writeFile(
            filename,
            data
        )
        await open(filename)
    } else {
        await fs.writeFile(
            filename,
            data
        )
        await open(filename)
    }

    return filename
}

module.exports = {
    datCiudad,
    guardar
}