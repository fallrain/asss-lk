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
					'    <td align="right">data[17]</td>' +
					'    <td align="right">data[18]</td>' +
					'</tr>';
var dataType = '';
var htmlPath = getHtmlPath();
if (htmlPath == 'three_pages') {
	dataType = 'xing_wl_quyu_01';
} else if (htmlPath == 'three_pages_lx') {
	dataType = 'xing_wl_quyu_0103';
}
//查询方法
function query(first) {
	//from表单转json对象
	var form = $("form").serializeObject();
	
	var url = dataOp.baseUrl + '/common/inter?dateDtKpi=' + form.date + '&dataType=' + dataType + '&fresh=1&params=page::' + (context.option.curr - 1) * pageNum + ';;pageNum::' + pageNum + ';;xing::' + form.starLevel + ';;sub_center_name::' + form.sub_center_name + ';;fenqu::' + form.fenqu + ';;date_dt_jx::' + form.date_dt_jx;
	
	if(dataType == 'xing_wl_quyu_0103'){
		url += ';;date_dt_fqjx::' + form.date_dt_fqjx + ";;fenqu_lx::" + form.fenqu_lx;
	}
	//get请求刷新表格数据
	$.get(url,function(data) {
			var totalPages = Math.ceil(data.wl_quyu_count.page_size / pageNum);
			
			$("#curr").val(context.option.curr);
			$("#totalPages").text(totalPages);
			$("#total").text(data.wl_quyu_count.page_size);
			$("#tableBody").html('');

			//设置总页数
			context.option.pages = totalPages ;

			if (searchFlag) {
				searchFlag = false;
				context.setGroups(totalPages > 5 ? 5 : totalPages);
			}

			if (data.wl_quyu_count.page_size == 0) {
				return;
			}

			//获取数据对象
			var wl_quyu_01 = data.wl_quyu_01;
			if (!wl_quyu_01) {
				return;
			}
			//获取数据个数
			var len = wl_quyu_01.fetch_at.length;
			//拼接表格数据加载到表格中
			var htmls = "";
			for (var i = 0; i < len; i++) {
				htmls += dataTableTmp
					.replace("data[1]", FormatDateTime(wl_quyu_01.fetch_at[i]))
					.replace("data[2]", wl_quyu_01.pingtai[i])
					.replace("data[3]", wl_quyu_01.sub_center_name[i])
					.replace("data[4]", GetStarIcon(wl_quyu_01.xing[i]))
					.replace("data[5]", showPartitionName(wl_quyu_01.fenqu[i]))
					
					.replace("data[6]", wl_quyu_01.sr_mb[i])
					.replace("data[7]", wl_quyu_01.sr_sj_sum[i])
					.replace("data[8]", wl_quyu_01.sr_wcl[i])
					
					.replace("data[9]", wl_quyu_01.dsr_zpf[i])
					.replace("data[10]", wl_quyu_01.md_zpf[i])
					.replace("data[11]", wl_quyu_01.mdl_kb[i])
					
					.replace("data[12]", wl_quyu_01.gdmb[i])
					.replace("data[13]", wl_quyu_01.cdsj[i])
					.replace("data[14]", wl_quyu_01.cd_fgl[i])
					
					.replace("data[15]", wl_quyu_01.cd_count[i])
					.replace("data[16]", wl_quyu_01.wuxing_num[i])
					.replace("data[17]", wl_quyu_01.wuxing_zb[i])
					
					.replace("data[18]", wl_quyu_01.total_user_sum[i])
			}
			$("#tableBody").append(htmls);
		},
		'json'
	);
}