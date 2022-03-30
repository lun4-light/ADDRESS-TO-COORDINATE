import xlsx from 'xlsx'

const xmlRead = () => {
    /* Get excel file from static root */
    const xmlFile = xlsx.readFile("static/input.xlsx");

    /* Get sheet data from excel file */
    const sheetName = xmlFile.SheetNames[0];
    const sheet = xmlFile.Sheets[sheetName];

    /* sheetData to json */
    const jsonData = xlsx.utils.sheet_to_json(sheet);

    for (var trashcanData of jsonData) {
        const address = trashcanData.district + " " + trashcanData.road + " " + trashcanData.address;
    }

    return jsonData;
}

export { xmlRead }