/*
 * 根据json数据导出Execl
 * 
 * 参数data：Json对象
 * 
 * 参数 columnInfo：列表信息
 * 
 * 参数 fileName：生成.xls的文件名
 * 
 */
function exportExeclByJson(data, columnInfo, fileName) {
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
	fileHead += "</head>";
	fileHead += "<body>";

	// 文件体
	var fileBody = '<table>';

	// 设置表头
	fileBody += "<tr>";
	for ( var i in columnInfo) {
		fileBody += "<td style='background-color:#6493da;color:rgba(14, 144, 210, .115)' align='center'>"
				+ columnInfo[i].title + '</td>';
	}
	// 换行
	fileBody += "</tr>";

	// 设置数据
	for (var i = 0; i < data.length; i++) {

		fileBody += "<tr>";

		var key = '';
		for ( var j in columnInfo) {
			// 获取json数据对应的key
			key = columnInfo[j].name;
			// console.log(data[i][key]);
			if (key && data[i][key]) {
				// console.log(data[i][key]);
				fileBody += '<td>' + data[i]['' + key] + '</td>';
			} else {
				fileBody += '<td></td>';
			}

		}
		fileBody += "</tr>";
	}

	fileBody += "</table>";

	// 文件尾部
	var fileFoot = "</body>";
	fileFoot += "</html>";

	var blob = new Blob([ fileHead, fileBody,fileBody,fileBody,fileBody,fileBody, fileFoot ], {
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

	console.info(fileHead, fileBody, fileFoot);

}

/* -----------------------------------------测试函数----------------------------------------- */
var columnInfo = [ {
	title : '集团',
	name : 'group'
}, {
	title : '用户名',
	name : 'userName'
}, {
	title : '密码',
	name : 'password'
}, {
	title : '电话',
	name : 'phone'
} ];
// 数据对象
var data = [];
// 模拟数据
for (i = 1; i <= 1000000; i++) {
	var obj = {
		"group" : "腾讯" + i,
		'userName' : '小明' + i,
		'password' : 'www1234zj' + i,
		'phone' : '15105420259---' + i,
	}
	data.push(obj);
}
// 调用函数
exportExeclByJson(data, columnInfo, '下载');
