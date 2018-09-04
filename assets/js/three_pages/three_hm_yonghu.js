// 设置模板
var dataTableTmp = '<tr>' +
					'    <td align="center">data[1]</td>' +
					'    <td>data[2]</td>' +
					'    <td>data[3]</td>' +
					'    <td>data[4]</td>' +
					'    <td>data[5]</td>' +
					'    <td>data[6]</td>' +
					'    <td align="right">data[7]</td>' +
					'    <td align="right">data[8]</td>' +
					'    <td align="right">data[9]</td>' +
					'    <td align="right">data[10]</td>' +
					'    <td align="right">data[11]</td>' +
					'</tr>';
var dataType = "xing_hm_yonghu_01";
//查询方法
function query(first) {
	//from表单转json对象
	var form = $("form").serializeObject();
	//get请求刷新表格数据
	$.get(dataOp.baseUrl + '/common/inter?dateDtKpi=' + form.date + '&dataType=' + dataType + '&fresh=1&params=page::' + (context.option.curr - 1) * pageNum + ';;pageNum::' + pageNum + ';;xing::' + form.starLevel + ';;sub_center_name::' + form.sub_center_name + ';;fenqu::' + form.fenqu + ';;date_dt_jx::' + form.date_dt_jx,
		function(data) {
			var totalPages = Math.ceil(data.scy_yonghu_count.page_size / pageNum);
			
			$("#curr").val(context.option.curr);
			$("#totalPages").text(totalPages);
			$("#total").text(data.scy_yonghu_count.page_size);
			$("#tableBody").html('');

			//设置总页数
			context.option.pages = totalPages ;

			if (searchFlag) {
				searchFlag = false;
				context.setGroups(totalPages > 5 ? 5 : totalPages);
			}

			if (data.scy_yonghu_count.page_size == 0) {
				return;
			}

			//获取数据对象
			var scy_yonghu_01 = data.scy_yonghu_01;
			if (!scy_yonghu_01) {
				return;
			}
			//获取数据个数
			var len = scy_yonghu_01.cversion.length;
			//拼接表格数据加载到表格中
			var htmls = "";
			for (var i = 0; i < len; i++) {
				htmls += dataTableTmp
					.replace("data[1]", FormatDateTime(scy_yonghu_01.cversion[i]))
					.replace("data[2]", scy_yonghu_01.pingtai[i])
					.replace("data[3]", scy_yonghu_01.cxw_code[i])
					.replace("data[4]", scy_yonghu_01.cxw_name[i])
					.replace("data[5]", GetStarIcon(scy_yonghu_01.xing[i]))
					.replace("data[6]", showPartitionName(scy_yonghu_01.fenqu[i]))
					.replace("data[7]", fixTwo(changeNull(scy_yonghu_01.nlj_shr[i])))
					.replace("data[8]", fixTwo(changeNull(scy_yonghu_01.mb_nlj_shr[i])))
					.replace("data[9]", changeNull(scy_yonghu_01.qn_shr[i]))
					.replace("data[10]", changeNull(scy_yonghu_01.wcl[i]))
					.replace("data[11]", changeNull(scy_yonghu_01.zf[i]))
			}
			$("#tableBody").append(htmls);
		},
		'json'
	);
}
$(function(){
	$('#jyt_erj').on('change',function(){
		$('#query').click();	
	})
});