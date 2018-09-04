// 设置模板
var dataTableTmp = '<tr>' +
					'    <td align="center">data[1]</td>' +
					'    <td>data[2]</td>' +
					'    <td>data[3]</td>' +
					'    <td align="right">data[4]</td>' +
					'    <td>data[5]</td>' +
					'    <td align="center">data[6]</td>' +
					'    <td>data[7]</td>' +
					'    <td align="right">data[8]</td>' +
					'    <td align="right">data[9]</td>' +
					'</tr>';
var dataType = '';
var htmlPath = getHtmlPath();
if (htmlPath == 'three_pages') {
	dataType = 'xing_wl_chudian_01';
} else if (htmlPath == 'three_pages_lx') {
	dataType = 'xing_wl_chudian_0103';
}
//查询方法
function query(first) {
	//from表单转json对象
	var form = $("form").serializeObject();
	
	var url = dataOp.baseUrl + '/common/inter?dateDtKpi=' + form.date + '&dataType=' + dataType + '&fresh=1&params=page::' + (context.option.curr - 1) * pageNum + ';;pageNum::' + pageNum + ';;xing::' + form.starLevel + ';;sub_center_name::' + form.sub_center_name + ';;operator_name::' + form.operator_name + ';;fenqu::' + form.fenqu + ';;date_dt_jx::' + form.date_dt_jx;

	if(dataType == 'xing_wl_chudian_0103'){
		url += ';;date_dt_fqjx::' + form.date_dt_fqjx + ";;fenqu_lx::" + form.fenqu_lx;
	}

	//get请求刷新表格数据
	$.get(url,function(data) {
			var totalPages = Math.ceil(data.wl_chudian_count.page_size / pageNum);
			
			$("#curr").val(context.option.curr);
			$("#totalPages").text(totalPages);
			$("#total").text(data.wl_chudian_count.page_size);
			$("#tableBody").html('');

			//设置总页数
			context.option.pages = totalPages ;

			if (searchFlag) {
				searchFlag = false;
				context.setGroups(totalPages > 5 ? 5 : totalPages);
			}

			if (data.wl_chudian_count.page_size == 0) {
				return;
			}

			//获取数据对象
			var wl_chudian_01 = data.wl_chudian_01;
			if (!wl_chudian_01) {
				return;
			}
			//获取数据个数
			var len = wl_chudian_01.gmt_modified.length;
			//拼接表格数据加载到表格中
			var htmls = "";
			for (var i = 0; i < len; i++) {
				htmls += dataTableTmp
					.replace("data[1]", FormatDateTime(wl_chudian_01.gmt_modified[i]))
					.replace("data[2]", wl_chudian_01.pingtai[i])
					.replace("data[3]", wl_chudian_01.trade_name[i])
					.replace("data[4]", wl_chudian_01.cd_id[i])
					.replace("data[5]", wl_chudian_01.sjxm[i])
					.replace("data[6]", GetStarIcon(wl_chudian_01.xing[i]))
					.replace("data[7]", showPartitionName(wl_chudian_01.fenqu[i]))
					
					.replace("data[8]", wl_chudian_01.stsy[i])
					.replace("data[9]", wl_chudian_01.zsyh[i])
			}
			$("#tableBody").append(htmls);
		},
		'json'
	);
}