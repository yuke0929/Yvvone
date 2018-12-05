const Excel = require('exceljs');
const filename = 'Homepage.xlsx';


function createExcel() {
	var workbook = new Excel.Workbook(); //create a file
	const date = new Date();
	workbook.created = date;
	workbook.modified = date;

	let sheet = formatExcel(workbook, date);

	workbook.xlsx.writeFile(filename).then(function() {
		console.log('create excel success!');
	}, function(err) {
		console.log(err);
	});
}

function formatExcel(workbook, date) {
	//create a new sheet
	month = date.getMonth() + 1;
	day = date.getDate();
	var sheet = workbook.addWorksheet(month + '.' + day + '-' + month + '.' + (day + 7)); //create a worksheet
	let col = sheet.getColumn(1);
	col.header = ['', 'BASIC INFO(S)', 'LOAD TIME', 'TIME TO FIRSY BYTE', 'WHITE SCREEN TIME', 'AFTER DOM DOWNLOAD', 'TIME(S)', 'DWR', 'ODATA', 'CSS', 'JS', 'REQUESTS', 'DWR', 'ODATA', 'CSS', 'JS', 'SIZE(BYTE)', 'DWR', 'ODATA', 'CSS', 'JS', 'DWRINFO(S)', 'GETTILEINITIALIZER', 'GETCOMPLETEPERCENT', 'GETINITIALIZER', 'GETLEARNINGTODODETAILS'];
	col.width = 25;
	col.eachCell((cell, rowId) => {
		cell.border = {
			top: {
				style: 'thin'
			},
			left: {
				style: 'thin'
			},
			bottom: {
				style: 'thin'
			},
			right: {
				style: 'thin'
			}
		}
	});

	sheet.eachRow((row, rowId) => {
		if (rowId == 1) {
			row.height = 30;
			row.fill = {
				type: 'pattern',
				pattern: 'solid',
				fgColor: {
					argb: 'FFF0FFF0'
				}
			};
		} else if (rowId % 5 == 2) {
			row.height = 20;
			row.fill = {
				type: 'pattern',
				pattern: 'solid',
				fgColor: {
					argb: 'FFF0FFFF'
				}
			}
		} else {
			row.height = 15;
		}

	});
	return sheet;
}

function insertData(data) {
	//create file if not existed
	//read file
	let workbook = new Excel.Workbook();
	workbook.xlsx.readFile(filename).then(() => {
		console.log('read success!');
		// send mail and create a new sheet if over 7 days
		let sheetNum = 0;
		workbook.eachSheet(() => {
			sheetNum++;
		});

		let sheet = workbook.getWorksheet(sheetNum);
		let colNum = sheet.columnCount;
		if (colNum > 7) {
			if (sheetNum > 3) {
				resetWorkbook(workbook);
			}
			sheet = formatExcel(workbook, new Date());
			colNum = 1;
		}

		let col = sheet.getColumn(colNum + 1);
		col.width = 15;
		let leftCol = sheet.getColumn(colNum);
		let i = 0;
		const date = new Date();
		col.eachCell((cell, rowId) => {
			cell.border = {
				top: {
					style: 'thin'
				},
				left: {
					style: 'thin'
				},
				bottom: {
					style: 'thin'
				},
				right: {
					style: 'thin'
				}
			}
			if (rowId == 1) {
				cell.value = (date.getMonth() + 1) + '.' + date.getDate();
			}
			if (rowId % 5 != 2 && rowId != 1) {
				cell.value = data[i++];
				cell.alignment = {
					vertical: 'middle',
					horizontal: 'right'
				};
				if (cell.value / leftCol.values[rowId] > 1.3) {
					cell.fill = {
						type: 'pattern',
						pattern: 'solid',
						fgColor: {
							argb: 'F0FFC0CB'
						}
					}
				}
			}
		})
		workbook.xlsx.writeFile(filename).then(function() {
			console.log('write success');
		}, function(err) {
			console.log(err);
		});
	}, (err) => {
		console.log('ExcelFile not exist');
		createExcel();
		insertData(data);
	});
}

function resetWorkbook(workbook) {
	workbook.xlsx.writeFile('Homepage' + '-' + new Date().toDateString().split(' ')[1]+'.xlsx').then(function() {
		console.log('reset workbook success!');
	}, function(err) {
		console.log(err);
	});

	workbook.eachSheet((sheet,sheetid)=>{
		workbook.removeWorksheet(sheetid);
	});

}
module.exports = insertData;