import { xmlRead } from './readXMLFile'
import { addressToCoordinate } from './address-to-coordinate'

const xmlToJSON = async() => {
    const trashcanData = xmlRead();

    const coordinateData = await addressToCoordinate(trashcanData);
}

xmlToJSON();