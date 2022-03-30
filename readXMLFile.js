import xlsx from 'xlsx'

const xmlRead = () => {
    /* Get excel file from static root */
    const xmlFile = xlsx.readFile("static/input.xlsx");

    /* Get sheet data from excel file */
    const sheetName = xmlFile.SheetNames[0];
    const sheet = xmlFile.Sheets[sheetName];

    /* sheetData to json */
    const jsonData = xlsx.utils.sheet_to_json(sheet);

    return jsonData;
}

export { xmlRead }