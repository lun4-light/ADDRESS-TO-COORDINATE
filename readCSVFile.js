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

const busToMap = (jsonData) => {
    const result = new Map();

    for (var busStation of jsonData) {
        const key = busStation.ARSID;
        const value = [busStation.X, busStation.Y];

        result.set(key, value);
    }

    return result;
}

export { csvRead, busToMap }