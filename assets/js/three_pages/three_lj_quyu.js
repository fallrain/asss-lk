// 设置模板
var dataTableTmp = '<tr>'
				+ '    <td align="center">date</td>'
				+ '    <td>platform</td>'
				+ '    <td>region_small</td>'
				+ '    <td align="center">xing</td>'
				+ '    <td>fenqu</td>'
				
				+ '    <td align="right">platform_income_target</td>'
				+ '    <td align="right">platform_income_practical</td>'
				+ '    <td align="right">platform_income_percentage_complete</td>'
				
				+ '    <td align="right">ecological_income_target</td>'
				+ '    <td align="right">ecological_income_practical</td>'
				+ '    <td align="right">ecological_income_percentage_complete</td>'
				
				+ '    <td align="right">contact_width_target</td>'
				+ '    <td align="right">contact_width_practical</td>'
				+ '    <td align="right">contact_width_fraction_of_coverage</td>'
				
				+ '    <td align="right">contact_temperature_total</td>'
				+ '    <td align="right">contact_temperature_five_star_num</td>'
				+ '    <td align="right">contact_temperature_proportion</td>'
				
				+ '    <td align="right">contact_depth_target</td>'
				+ '    <td align="right">contact_depth_order_quantity</td>'
				+ '    <td align="right">contact_depth_percentage_complete</td>'
				
				+'</tr>';
var dataType = '';
var htmlPath = getHtmlPath();
if (htmlPath == 'three_pages') {
	dataType = 'xing_lj_quyu_01';
} else if (htmlPath == 'three_pages_lx') {
	dataType = 'xing_lj_quyu_0103';
}
//查询方法
function query(first) {
	//from表单转json对象
	var form = $("form").serializeObject();
	
	var url = dataOp.baseUrl + '/common/inter?'
	+ 'dateDtKpi=' + form.date  
	+ '&dataType=' + dataType
	+ '&fresh=1'
	+ '&params=page::'+ (context.option.curr - 1) * pageNum
		+ ';;pageNum::' + pageNum 
		+ ';;xing::'+ form.starLevel 
		+ ';;sub_center_name::'+ form.sub_center_name 
		+ ';;fenqu::'+ form.fenqu 
		+ ';;date_dt_jx::'+ form.date_dt_jx;

	if(dataType == 'xing_lj_quyu_0103'){
		url += ';;date_dt_fqjx::' + form.date_dt_fqjx + ";;fenqu_lx::" + form.fenqu_lx;
	}
	
	//get请求刷新表格数据
	$.get(url,function(data) {
			var totalPages = Math.ceil(data.lj_quyu_count.page_size / pageNum);
			
			$("#curr").val(context.option.curr);
			$("#totalPages").text(totalPages);
			$("#total").text(data.lj_quyu_count.page_size);
			$("#tableBody").html('');

			//设置总页数
			context.option.pages = totalPages;

			if (searchFlag) {
				searchFlag = false;
				context.setGroups(totalPages > 5 ? 5 : totalPages);
			}
			if (data.lj_quyu_count.page_size == 0) {
				return;
			}
			//获取数据对象
			var lj_quyu_01 = data.lj_quyu_01;
			if (!lj_quyu_01) {
				return;
			}
			//获取数据个数
			var len = lj_quyu_01.fetch_at.length;
			//拼接表格数据加载到表格中
			var htmls = "";
			for (var i = 0; i < len; i++) {
				htmls += dataTableTmp
					.replace("date",FormatDateTime(lj_quyu_01.fetch_at[i]))
					.replace("platform",lj_quyu_01.pingtai[i])
					.replace("region_small",lj_quyu_01.sub_center_name[i])
					.replace("xing",GetStarIcon(lj_quyu_01.xing[i]))
					.replace("fenqu", showPartitionName(lj_quyu_01.fenqu[i]))

					.replace("platform_income_target",changeNull(lj_quyu_01.ptsrmb[i]))
					.replace("platform_income_practical",changeNull(lj_quyu_01.ptsr_sj[i]))
					.replace("platform_income_percentage_complete",/*fixTwochengParcent(*/lj_quyu_01.ptsr_wcl[i])

					.replace("ecological_income_target",changeNull(lj_quyu_01.stsrmb[i]))
					.replace("ecological_income_practical",changeNull(lj_quyu_01.total_transaction[i]))
					.replace("ecological_income_percentage_complete",/*fixTwochengParcent(*/lj_quyu_01.stsr_wcl[i])

					.replace("contact_width_target",changeNull(lj_quyu_01.cdgd_mb[i]))
					.replace("contact_width_practical",lj_quyu_01.cdgd_sj[i])
					.replace("contact_width_fraction_of_coverage",/*fixTwochengParcent(*/lj_quyu_01.cdgd_fgl[i])

					.replace("contact_temperature_total",changeNull(lj_quyu_01.cdwd_mb[i]))
					.replace("contact_temperature_five_star_num",lj_quyu_01.cdwd_wuxing_num[i])
					.replace("contact_temperature_proportion",/*fixTwochengParcent(*/lj_quyu_01.cdwd_zb[i])

					.replace("contact_depth_target",changeNull(lj_quyu_01.cdsd_mb[i]))
					.replace("contact_depth_order_quantity",lj_quyu_01.cdsd_transaction_sum[i])
					.replace("contact_depth_percentage_complete",/*fixTwochengParcent(*/lj_quyu_01.cdsd_wcl[i])
			}
			$("#tableBody").append(htmls);
		}, 'json');
}