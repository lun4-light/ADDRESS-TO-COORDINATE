import axios from 'axios';
import { KAKAOKEY } from './keys'

const makeCoordinateArray = ( index, x, y ) => {
    const array = [];
    array.push(index);
    array.push(x);
    array.push(y);

    return array;
}

const addressToCoordinate = async ( jsonData ) => {    
    const result = [];

    for (const trashcanData of jsonData) {
        const address = trashcanData.address;

        const url = 
            "https://dapi.kakao.com/v2/local/search/address.json?query=" +
            encodeURI(address);
        
        const { data } = await axios.get(url, {
            headers: {
                Authorization: `KakaoAK ${KAKAOKEY}`,
            },
        });
        
        var arrayData;

        if (!data.documents[0]) {
            arrayData = makeCoordinateArray(trashcanData.index, -1, -1);
        }
        else { 
            arrayData = makeCoordinateArray(trashcanData.index, data.documents[0].x, data.documents[0].y);
        }

        result.push(arrayData);
    }
    
    return result;
}

export { addressToCoordinate }