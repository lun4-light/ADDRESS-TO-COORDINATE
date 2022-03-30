import axios from 'axios';
import { KAKAOKEY } from './keys'
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

        if (!data.documents[0]) {
            continue;
        }

        const coordinate = [];

        coordinate.push(trashcanData.index);
        coordinate.push(data.documents[0].x);
        coordinate.push(data.documents[0].y);

        result.push(coordinate);
    }

    var len = result.length;

    for (var idx = 0; idx < len; idx++) {
        console.log(result[idx]);
    }

    return result;
}

export { addressToCoordinate }