// 设置模板(大项目)
var dataTableTmp1 = '<tr>' +
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
					'</tr>';
//设置模板(小家电)
var dataTableTmp2 = '<tr>' +
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
					'</tr>';
var dataType = '';
var htmlPath = getHtmlPath();
if (htmlPath == 'three_pages') {
	dataType = 'xing_hm_dxm_quyu_01';
} else if (htmlPath == 'three_pages_lx') {
	dataType = 'xing_hm_dxm_quyu_0103';
}
//查询方法
function query(first) {
//	return ;
	//from表单转json对象
	var form = $("form").serializeObject();
	
	var url = dataOp.baseUrl + '/common/inter?dateDtKpi=' + form.date + '&dataType=' + dataType + '&fresh=1&params=page::' + (context.option.curr - 1) * pageNum + ';;pageNum::' + pageNum + ';;xing::' + form.starLevel + ';;sub_center_name::' + form.sub_center_name + ';;fenqu::' + form.fenqu + ';;date_dt_jx::' + form.date_dt_jx;

	if(dataType == 'xing_hm_dxm_quyu_01'){
		url += ';;date_dt_fqjx::' + form.date_dt_fqjx + ";;fenqu_lx::" + form.fenqu_lx;
	}
	var jyt_erj = $('#jyt_erj').val();
	//get请求刷新表格数据
	$.get(url,function(data) {
			var totalPages = Math.ceil(data.hm_quyu_count.page_size / pageNum);
			
			$("#curr").val(context.option.curr);
			$("#totalPages").text(totalPages);
			$("#total").text(data.hm_quyu_count.page_size);
			$("#tableBody").html('');

			//设置总页数
			context.option.pages = totalPages ;

			if (searchFlag) {
				searchFlag = false;
				context.setGroups(totalPages > 5 ? 5 : totalPages);
			}

			if (data.hm_quyu_count.page_size == 0) {
				return;
			}

			//获取数据对象
			var hm_quyu_01 = data.hm_quyu_01;
			if (!hm_quyu_01) {
				return;
			}
			
			//拼接表格数据加载到表格中
			var htmls = "";
			
			//拼接表格数据加载到表格中
			var htmls = "";
			if(jyt_erj == '65A4'){// 大项目
				//获取数据个数
				var len = hm_quyu_01.riqi.length;
				
				for (var i = 0; i < len; i++) {
					htmls += dataTableTmp1
						.replace("data[1]", FormatDateTime(hm_quyu_01.riqi[i]))
						.replace("data[2]", hm_quyu_01.pingtai[i])
						.replace("data[3]", hm_quyu_01.scmc[i])
						.replace("data[4]", GetStarIcon(hm_quyu_01.xing[i]))
						.replace("data[5]", showPartitionName(hm_quyu_01.fenqu[i]))
						
						.replace("data[6]", hm_quyu_01.sjsr[i])
						.replace("data[7]", hm_quyu_01.ldqye[i])
						
						.replace("data[8]", hm_quyu_01.gjzs[i])
						.replace("data[9]", hm_quyu_01.wxgjzs[i])
						.replace("data[10]", hm_quyu_01.wxzb[i])
				}
			}else if(jyt_erj == '65A5'){// 小家电
				//获取数据个数
				var len = hm_quyu_01.riqi.length;
				
				for (var i = 0; i < len; i++) {
					htmls += dataTableTmp2
						.replace("data[1]", FormatDateTime(hm_quyu_01.riqi[i]))
						.replace("data[2]", hm_quyu_01.pingtai[i])
						.replace("data[3]", hm_quyu_01.quyu[i])
						.replace("data[4]", GetStarIcon(hm_quyu_01.xing[i]))
						.replace("data[5]", showPartitionName(hm_quyu_01.fenqu[i]))
						
						.replace("data[6]", hm_quyu_01.qymb[i])
						.replace("data[7]", hm_quyu_01.sjsr[i])
						.replace("data[8]", hm_quyu_01.wcl[i])
						
						.replace("data[9]", hm_quyu_01.xqyzs[i])
						.replace("data[10]", hm_quyu_01.wuxing_count[i])
						.replace("data[11]", hm_quyu_01.wxzb[i])
				}
			}
			$("#tableBody").append(htmls);
		},
		'json'
	);
}
var arr = {
	'65A4' : [ '市场名称', '区域收入规模(元)', '区域漏斗签约额','国家总数','五星国家数量','区域五星触点（国家）数量占比' ],
	'65A5' : [ '区域', '区域收入目标(元)','区域实际收入(元)', '预实零差完成率','小区域总数','五星小区域数量','区域五星触点（小区域）数量占比'],
};
/**
 * 切换大项目/小家电
 */
function mySwitch(){
	var my_val = $('#jyt_erj').val();
	if(my_val == '65A4'){
		$('#x-axis').attr('colspan',2);
		$('#y-axis').attr('colspan',3);
		dataType = 'xing_hm_dxm_quyu_01';
	}else{
		$('#x-axis').attr('colspan',3);
		$('#y-axis').attr('colspan',3);
		dataType = 'xing_hm_xjd_quyu_01';
	}
	$('#fanwei').text(arr[my_val][0]);
	$('#table_div table').find('thead:eq(0) tr:eq(1) th').remove();
	var html = '';
	for(i = 1 ;i < arr[my_val].length ; i++ ){
		console.log(arr[my_val][i]);
		html += '<th style="min-width: 200px">'+arr[my_val][i]+'</th>'
	}
	$('#table_div table').find('thead:eq(0) tr:eq(1)').append(html);
}
mySwitch();
$(function(){
	$('#jyt_erj').on('change',function(){
		mySwitch();
		$('#query').click();
	})
});