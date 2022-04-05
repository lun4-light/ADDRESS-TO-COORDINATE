import axios from 'axios';
import { KAKAOKEY } from './keys'

const makeCoordinateArray = ( index, x, y ) => {
    const array = [];
    array.push(index);
    array.push(x);
    array.push(y);

    return array;
}

const addressToCoordinate = async ( jsonData, busData ) => {
    const result = [];

    for (const trashcanData of jsonData) {
        if (trashcanData.point === "정류장(버스,택시 등)") {
            const busCoordinate = busData.get(parseInt(trashcanData.ARSID));
            if (busCoordinate) {
                result.push(makeCoordinateArray(trashcanData.index, busCoordinate[0], busCoordinate[1]));
            }
        }
        else {
            const address = trashcanData.address;

            const url = 
            "https://dapi.kakao.com/v2/local/search/address.json?query=" +
            encodeURI(address);
        
            const { data } = await axios.get(url, {
                headers: {
                    Authorization: `KakaoAK ${KAKAOKEY}`,
                },
            });
    
            if (!data.documents[0]) {
                result.push(makeCoordinateArray(trashcanData.index, -1, -1));
            }
            else {
                result.push(makeCoordinateArray(trashcanData.index, data.documents[0].x, data.documents[0].y)); 
            }
        }
    }
    
    return result;
}

export { addressToCoordinate }