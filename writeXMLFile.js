const xlsx = require("xlsx");

const xmlWrite = ( arrayData ) => {
    const worksheet = xlsx.utils.aoa_to_sheet(arrayData);
    const new_workbook = xlsx.utils.book_new();

    xlsx.utils.book_append_sheet(new_workbook, worksheet, 'SheetJS'); 
    xlsx.writeFile(new_workbook, 'static/output.xlsx');
}

export { xmlWrite }