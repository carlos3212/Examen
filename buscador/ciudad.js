const validCiudad = require('./cod.json');
const  csv  =  require ( 'csv-parser' ) 
const { promises: fs } = require('fs');


const impdatos = async (file) => {
    const csvFile = await fs.readFile(file, 'utf-8')
        .catch(err => { throw new Error('Error no se encuentra el archivo ingrese nuevamente.') })

    let lines = csvFile.split(/\r?\n/);
    let csvString = ''
    lines.filter((value, index) => {
        if (index >= 4) {
            csvString += value + '\n'
        }
    });

    let csvData = await csv().fromString(csvString);
    if (csvData.length === 0) {
        throw new Error('Error formato incorrecto ingrese nuevamente.')
    }

    csvData = csvData.filter(record => {
        if (valCont(record['Country Code'])) {
            // delete record['Indicator Name']
            delete record['Indicator Code']
            delete record['field65']
            return record
        }
    });

    return csvData;
}


const valCont = (countryCode) => {
    const valCod = validCiudad.code;
    let valid = valCod.includes(countryCode);
    return valid;
}

const valAno = (country, year) => {
    if (isNaN(year)) {
        throw new Error('El anio debe ser un numero.')
    }
    let compAno = Object.keys(country)
    compAno = compAno.map(year => +year)
    compAno = compAno.filter(year => !isNaN(year))

    return compAno.includes(year)
}

module.exports = {
    impdatos,
    valCont,
    valAno
}