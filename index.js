import { xmlRead } from './readXMLFile'
import { xmlWrite } from './writeXMLFile';
import { addressToCoordinate } from './address-to-coordinate'
import { busToMap } from './readCSVFile';

const xmlToJSON = async() => {
    const trashcanData = xmlRead();
    
    const busData = await busToMap();

    const coordinateData = await addressToCoordinate(trashcanData, busData);

    xmlWrite(coordinateData);
}

xmlToJSON();