import * as XLSX from 'xlsx';

export function exportExcelFromTable( tableHtmlElement, subTableHtmlElementCollection, fileName ) {
    var workbook = XLSX.utils.book_new();

    var sheetOverview = XLSX.utils.table_to_sheet(tableHtmlElement);
    XLSX.utils.book_append_sheet(workbook, sheetOverview, 'Overview');

    for (let i = 0; i < subTableHtmlElementCollection.length; i++) {
        var sheet = XLSX.utils.table_to_sheet(subTableHtmlElementCollection[i]);
        XLSX.utils.book_append_sheet(workbook, sheet, `Attempt ${i + 1}`);
    }

    const excelFile = XLSX.writeFile(workbook, `${fileName}.xlsx`);

    return excelFile;
}
