import axios from 'axios';
import { KAKAOKEY } from './keys'

const makeCoordinateArray = ( index, address, x, y ) => {
    const array = [];
    array.push(index);
    array.push(address);
    array.push(x);
    array.push(y);

    return array;
}

const searchByQuery = async ( searchType, query ) => {
    const searchURI =
        "https://dapi.kakao.com/v2/local/search/" +
        searchType +
        ".json?query=" +
        encodeURI(query);

    const { data } = await axios.get(searchURI, {
        headers: {
            Authorization: `KakaoAK ${KAKAOKEY}`,
        },
    });

    return data;
}

const addressToCoordinate = async ( jsonData, busData ) => {
    const result = [];

    for (const trashcanData of jsonData) {
        if (trashcanData.point === "정류장(버스,택시 등)") {
            const busCoordinate = busData.get(parseInt(trashcanData.ARSID));

            if (busCoordinate) {
                result.push(makeCoordinateArray(trashcanData.index, trashcanData.address, busCoordinate[0], busCoordinate[1]));
            }
        }
        else {
            const addressSearchData = await searchByQuery("address", trashcanData.address);

            if (!addressSearchData.documents[0]) {
                const keywordSearchData = await searchByQuery("keyword", trashcanData.address);
                
                if (!keywordSearchData.documents[0]) {
                    result.push(makeCoordinateArray(trashcanData.index, trashcanData.address,-1, -1));
                }
                else {
                    result.push(makeCoordinateArray(trashcanData.index, trashcanData.address, keywordSearchData.documents[0].x, keywordSearchData.documents[0].y));
                }
            }
            else {
                result.push(makeCoordinateArray(trashcanData.index, trashcanData.address, addressSearchData.documents[0].x, addressSearchData.documents[0].y)); 
            }
        }
    }
    
    return result;
}

export { addressToCoordinate }