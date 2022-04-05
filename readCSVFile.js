import fs from 'fs'
import csvparser from 'csv-parser'

const csvRead = async () => {
    const result = [];

    const stream = fs.createReadStream('static/bus.txt')
        .pipe(csvparser())
        .on('data', (data) => result.push(data));

    return new Promise((resolve, reject) => {
        stream.on('error', (err) => {
            console.log('File read error.');
            resolve(reject);
        })

        stream.on('end', () => {
            resolve(result);
        })
    })
}

const busToMap = async () => {
    const jsonData = await csvRead();
    const result = new Map();

    for (var busStation of jsonData) {
        const key = parseInt(busStation.ARSID);
        const value = [parseFloat(busStation.X), parseFloat(busStation.Y)];

        result.set(key, value);
    }

    return result;
}

export { csvRead, busToMap }