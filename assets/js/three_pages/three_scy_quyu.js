// 设置模板
var dataTableTmp = '<tr>' +
					'    <td align="center">data[1]</td>' +
					'    <td>data[2]</td>' +
					'    <td>data[3]</td>' +
					'    <td align="center">data[4]</td>' +
					'    <td>data[5]</td>' +
					'    <td align="right">data[6]</td>' +
					'    <td align="right">data[7]</td>' +
					'    <td align="right">data[8]</td>' +
					'    <td align="right">data[9]</td>' +
					'    <td align="right">data[10]</td>' +
					'    <td align="right">data[11]</td>' +
					'    <td align="right">data[12]</td>' +
					'    <td align="right">data[13]</td>' +
					'    <td align="right">data[14]</td>' +
					'    <td align="right">data[15]</td>' +
					'    <td align="right">data[16]</td>' +
					'</tr>';
var dataType = '';
var htmlPath = getHtmlPath();
if (htmlPath == 'three_pages') {
	dataType = 'xing_scy_quyu_01';
} else if (htmlPath == 'three_pages_lx') {
	dataType = 'xing_scy_quyu_0103';
}
//查询方法
function query(first) {
	//from表单转json对象
	var form = $("form").serializeObject();
	
	var url = dataOp.baseUrl + '/common/inter?dateDtKpi='
		+ form.date + '&dataType=' + dataType
		+ '&fresh=1&params=page::'
		+ (context.option.curr - 1) * pageNum
		+ ';;pageNum::' + pageNum + ';;xing::'
		+ form.starLevel + ';;sub_center_name::'
		+ form.sub_center_name
		/*+ ';;operator_name::' + form.operator_name*/
		+ ';;fenqu::' + form.fenqu
		+ ';;date_dt_jx::' + form.date_dt_jx;

	if(dataType == 'xing_scy_quyu_0103'){
		url += ';;date_dt_fqjx::' + form.date_dt_fqjx + ";;fenqu_lx::" + form.fenqu_lx;
	}
	//get请求刷新表格数据
	$.get(url,function(data) {
			var totalPages = Math.ceil(data.scy_quyu_count.page_size / pageNum);
			
			$("#curr").val(context.option.curr);
			$("#totalPages").text(totalPages);
			$("#total").text(data.scy_quyu_count.page_size);
			$("#tableBody").html('');

			//设置总页数
			context.option.pages = totalPages ;

			if (searchFlag) {
				searchFlag = false;
				context.setGroups(totalPages > 5 ? 5 : totalPages);
			}

			if (data.scy_quyu_count.page_size == 0) {
				return;
			}

			//获取数据对象
			var scy_quyu_01 = data.scy_quyu_01;
			if (!scy_quyu_01) {
				return;
			}
			//获取数据个数
			var len = scy_quyu_01.cversion.length;
			//拼接表格数据加载到表格中
			var htmls = "";
			for (var i = 0; i < len; i++) {
				htmls += dataTableTmp
					.replace("data[1]", FormatDateTime(scy_quyu_01.cversion[i]))
					.replace("data[2]", scy_quyu_01.pingtai[i])
					.replace("data[3]", scy_quyu_01.trade_name[i])
					.replace("data[4]", GetStarIcon(scy_quyu_01.xing[i]))
					.replace("data[5]", showPartitionName(scy_quyu_01.fenqu[i]))
					
					.replace("data[6]", fixTwo(scy_quyu_01.leijimb[i]))
					.replace("data[7]", fixTwo(scy_quyu_01.shijimb[i]))
					.replace("data[8]", scy_quyu_01.leijiwcl[i])
					
					.replace("data[9]", scy_quyu_01.jzlmb[i])
					.replace("data[10]", scy_quyu_01.xtmb[i])
					.replace("data[11]", scy_quyu_01.cjl[i])
					
					.replace("data[12]", scy_quyu_01.wgs[i])
					.replace("data[13]", scy_quyu_01.fgsj[i])
					.replace("data[14]", scy_quyu_01.fgl[i])
					
					.replace("data[15]", scy_quyu_01.khs[i])
					.replace("data[16]", scy_quyu_01.dbl[i])
			}
			$("#tableBody").append(htmls);
		},
		'json'
	);
}