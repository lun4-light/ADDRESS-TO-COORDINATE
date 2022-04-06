import axios from 'axios';
import { KAKAOKEY } from './keys'

const makeCoordinateArray = ( index, x, y ) => {
    const array = [];
    array.push(index);
    array.push(x);
    array.push(y);

    return array;
}

const searchByQuery = async ( searchType, address ) => {
    const searchURI =
        "https://dapi.kakao.com/v2/local/search/" +
        searchType +
        ".json?query=" +
        encodeURI(address);

    const { searchData } = await axios.get(searchURI, {
        headers: {
            Authorization: `KakaoAK ${KAKAOKEY}`,
        },
    });

    return searchData;
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
            const addressSearchData = searchByQuery("address", address);
    
            if (!addressSearchData.documents[0]) {
                const keywordSearchData = searchByQuery("keyword", address);

                if (!keywordSearchData.documents[0]) {
                    result.push(makeCoordinateArray(trashcanData.index, -1, -1));
                }
                else {
                    result.push(makeCoordinateArray(trashcanData.index, keywordSearchData.documents[0].x, keywordSearchData.documents[0].y));
                }
            }
            else {
                result.push(makeCoordinateArray(trashcanData.index, addrSearchData.documents[0].x, addrSearchData.documents[0].y)); 
            }
        }
    }
    
    return result;
}

export { addressToCoordinate }