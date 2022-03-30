import { xmlRead } from './readXMLFile'
import { xmlWrite } from './writeXMLFile';
import { addressToCoordinate } from './address-to-coordinate'

const xmlToJSON = async() => {
    const trashcanData = xmlRead();

    const coordinateData = await addressToCoordinate(trashcanData);

    xmlWrite(coordinateData);
}

xmlToJSON();