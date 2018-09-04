// 设置模板
var dataTableTmp = '<tr>' +
					'    <td align="center">date</td>' +
					'    <td>platform</td>' +
					'    <td>small_regional_micro</td>' +
					'    <td align="center">regional_star</td>' +
					'    <td>partition</td>' +
					'    <td align="right">stage_goal</td>' +
					'    <td align="right">practical</td>' +
					'    <td align="right">percentage_complete</td>' +
					'    <td align="right">target_villages_num</td>' +
					'    <td align="right">contact_coverage_practical</td>' +
					'    <td align="right">fraction_of_coverage</td>' +
					'    <td align="right">contact_total_num</td>' +
					'    <td align="right">five_star_contacts_num</td>' +
					'    <td align="right">proportion</td>' +
					'    <td align="right">lifetime_users</td>' +
					'</tr>';
var dataType = '';
var htmlPath = getHtmlPath();
if (htmlPath == 'three_pages') {
	dataType = 'xing_spt_quyu_01';
} else if (htmlPath == 'three_pages_lx') {
	dataType = 'xing_spt_quyu_0103';
}
//查询方法
function query(first) {
	//from表单转json对象
	var form = $("form").serializeObject();
	
	var url = dataOp.baseUrl + '/common/inter?dateDtKpi=' + form.date + '&dataType=' + dataType + '&fresh=1&params=page::' + (context.option.curr - 1) * pageNum + ';;pageNum::' + pageNum + ';;xing::' + form.starLevel + ';;sub_center_name::' + form.sub_center_name + ';;fenqu::' + form.fenqu + ';;date_dt_jx::' + form.date_dt_jx;

	if(dataType == 'xing_spt_quyu_0103'){
		url += ';;date_dt_fqjx::' + form.date_dt_fqjx + ";;fenqu_lx::" + form.fenqu_lx;
	}
	//get请求刷新表格数据
	$.get(url,function(data) {
			var totalPages = Math.ceil(data.spt_quyu_count.page_size / pageNum);
			
			$("#curr").val(context.option.curr);
			$("#totalPages").text(totalPages);
			$("#total").text(data.spt_quyu_count.page_size);
			$("#tableBody").html('');

			//设置总页数
			context.option.pages = totalPages ;

			if (searchFlag) {
				searchFlag = false;
				context.setGroups(totalPages > 5 ? 5 : totalPages);
			}

			if (data.spt_quyu_count.page_size == 0) {
				return;
			}

			//获取数据对象
			var spt_quyu_01 = data.spt_quyu_01;
			if (!spt_quyu_01) {
				return;
			}
			//获取数据个数
			var len = spt_quyu_01.fetch_at.length;
			//拼接表格数据加载到表格中
			var htmls = "";
			for (var i = 0; i < len; i++) {
				htmls += dataTableTmp
					.replace("date", FormatDateTime(spt_quyu_01.fetch_at[i]))
					.replace("platform", spt_quyu_01.pingtai[i])
					.replace("small_regional_micro", spt_quyu_01.sub_center_name[i])
					.replace("regional_star", GetStarIcon(spt_quyu_01.xing[i]))
					.replace("partition", showPartitionName(spt_quyu_01.fenqu[i]))
					.replace("stage_goal", spt_quyu_01.sr_mb[i] == null ? 0 : spt_quyu_01.sr_mb[i])
					.replace("practical", spt_quyu_01.sr_sj_sum[i])
					.replace("percentage_complete", /*fixTwochengParcent(*/spt_quyu_01.sr_wcl[i])
					.replace("target_villages_num", spt_quyu_01.xc_num[i])
					.replace("contact_coverage_practical", spt_quyu_01.cdsj[i])
					.replace("fraction_of_coverage", /*fixTwochengParcent(*/spt_quyu_01.cd_fgl[i])
					.replace("contact_total_num", spt_quyu_01.cd_count[i])
					.replace("five_star_contacts_num", spt_quyu_01.wuxing_num[i])
					.replace("proportion", /*fixTwochengParcent(*/spt_quyu_01.wuxing_zb[i])
					.replace("lifetime_users", spt_quyu_01.total_user_sum[i])
			}
			$("#tableBody").append(htmls);
		},
		'json'
	);
}