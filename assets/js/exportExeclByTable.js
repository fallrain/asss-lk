/*
 * 根据Table数据导出Execl
 * 
 * 参数data：Json对象
 * 
 * 参数 columnInfo：列表信息
 * 
 * 参数 fileName：生成.xls的文件名
 * 
 */
function exportExeclByTable(tableHead, tableBody, fileName) {
	// 文件头部
	var fileHead = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:x='urn:schemas-microsoft-com:office:excel' xmlns='http://www.w3.org/TR/REC-html40'>";
	fileHead += '<meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8">';
	fileHead += '<meta http-equiv="content-type" content="application/vnd.ms-excel';
	fileHead += '; charset=UTF-8">';
	fileHead += "<head>";
	fileHead += "<!--[if gte mso 9]>";
	fileHead += "<xml>";
	fileHead += "<x:ExcelWorkbook>";
	fileHead += "<x:ExcelWorksheets>";
	fileHead += "<x:ExcelWorksheet>";
	fileHead += "<x:Name>";
	fileHead += "{worksheet}";
	fileHead += "</x:Name>";
	fileHead += "<x:WorksheetOptions>";
	fileHead += "<x:DisplayGridlines/>";
	fileHead += "</x:WorksheetOptions>";
	fileHead += "</x:ExcelWorksheet>";
	fileHead += "</x:ExcelWorksheets>";
	fileHead += "</x:ExcelWorkbook>";
	fileHead += "</xml>";
	fileHead += "<![endif]-->";
	
	fileHead += '<style type="text/css">';
	fileHead += 'table tr td,table tr th{';
	fileHead += '	font-size:16px;';
	fileHead += '	height: 30px;';
	fileHead += '	padding: 15px;';
	fileHead += '}';
	fileHead += 'table tr td{';
	fileHead += '	background-color:#6493da;';
	fileHead += '	color:#fff';
	fileHead += '}';
	fileHead += '</style>';
	
	fileHead += "</head>";
	fileHead += "<body>";
	
	// 文件体
	var fileBody = '<table>';
	
	fileBody += tableHead + tableBody;
	fileBody += "</table'>";

	// 文件尾部
	var fileFoot = "</body>";
	fileFoot += "</html>";
	
	var blob = new Blob([fileHead, fileBody, fileFoot], {
		// application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
		type : "application/vnd.ms-excel;charset=utf-8"
	// type : "application/vnd.ms-excel;charset=utf-8"
	});

	var link = document.createElement("a");
	link.href = URL.createObjectURL(blob);

	console.log(link.href);

	link.style = "visibility:hidden";
	link.download = fileName + ".xls";

	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
	
}
