// 设置模板
var dataTableTmp = '<tr style="line-height:30px;">' +
					'    <td align="center">DATE</td>' +
					'    <td>PLATFORM</td>' +
					'    <td>REGION_SMALL</td>' +
					'    <td align="right">CONTACT_ID</td>' +
					'    <td>CONTACT_NAME</td>' +
					'    <td align="center">CONTACT_STAR</td>' +
					'    <td>PARTITION</td>' +
					'    <td align="right">TRANSACTION_AMOUNT</td>' +
					'    <td align="right">NUMBER_LIFE_USERS</td>' +
					'</tr>';

//导出按钮单击事件
/*$("#exportBtn").on('click',function(){
	//from表单转json对象
	var form = $("form").serializeObject();
	var dataType = "xing_spt_chudian_01";
	
	$.get('http://10.138.42.215:19805/operationExcel/export?dateDtKpi=' + form.date + '&dataType=' + dataType + '&fresh=1&params=page::' + 0 + ';;pageNum::' + 1000000 + ';;xing::' + form.starLevel + ';;sub_center_name::' + form.sub_center_name + ';;operator_name::' + form.operator_name + ';;fenqu::' + form.fenqu + ';;date_dt_jx::' + form.date_dt_jx,
		function (data) {
			 
			 *  <th style="min-width: 100px">日期</th>
				<th style="min-width: 100px">平台</th>
				<th style="min-width: 100px">区域小微</th>
				<th style="min-width: 200px">触点ID</th>
				<th style="min-width: 100px">触点名称</th>
				<th style="min-width: 100px">触点星级</th>
				<th style="min-width: 100px">分区</th>
				<th style="min-width: 200px">横轴：交易额</th>
				<th style="min-width: 200px">纵轴：终身用户数</th>
				
				.replace("DATE", FormatDateTime(spt_chudian_01.fetch_at[i]))
				.replace("PLATFORM", spt_chudian_01.pingtai[i])
				.replace("REGION_SMALL", spt_chudian_01.sub_center_name[i])
				.replace("CONTACT_ID", spt_chudian_01.operator_id[i])
				.replace("CONTACT_NAME", spt_chudian_01.operator_name[i])
				.replace("CONTACT_STAR", GetStarIcon(spt_chudian_01.xing[i]))
				.replace("PARTITION", showPartitionName(spt_chudian_01.fenqu[i]))
				.replace("TRANSACTION_AMOUNT", spt_chudian_01.total_transaction[i])
				.replace("NUMBER_LIFE_USERS", spt_chudian_01.total_user_sum[i])
			
			 
			//获取数据对象
			var spt_chudian_01 = data.spt_chudian_01;
			//获取数据个数
			var len = spt_chudian_01.fetch_at.length;
			
			var tableHead='';
			tableHead += '<tr>'
			tableHead += '	<td style="width:100px;">日期</td>';
			tableHead += '	<td style="width:100px;">平台</td>';
			tableHead += '	<td style="width:100px;">区域小微</td>';
			tableHead += '	<td style="width:200px;">触点ID</td>';
			tableHead += '	<td style="width:100px;">触点名称</td>';
			tableHead += '	<td style="width:100px;">触点星级</td>';
			tableHead += '	<td style="width:100px;">分区</td>';
			tableHead += '	<td style="width:200px;">横轴：交易额</td>';
			tableHead += '	<td style="width:500px;">纵轴：终身用户数</td>';
			tableHead += '</tr>'
				
			var tableBody='';
			for (var i = 0; i < len; i++) {
				tableBody += dataTableTmp
					.replace("DATE", FormatDateTime(spt_chudian_01.fetch_at[i]))
					.replace("PLATFORM", spt_chudian_01.pingtai[i])
					.replace("REGION_SMALL", spt_chudian_01.sub_center_name[i])
					.replace("CONTACT_ID", spt_chudian_01.operator_id[i])
					.replace("CONTACT_NAME", spt_chudian_01.operator_name[i])
					.replace("CONTACT_STAR", GetStarIcon2(spt_chudian_01.xing[i]))
					.replace("PARTITION", showPartitionName(spt_chudian_01.fenqu[i]))
					.replace("TRANSACTION_AMOUNT", spt_chudian_01.total_transaction[i])
					.replace("NUMBER_LIFE_USERS", spt_chudian_01.total_user_sum[i])
			}
			
			// 调用函数
			exportExeclByTable(tableHead, tableBody, '乐农触点五星报表');
		}	
	);
});*/
var dataType = '';
var htmlPath = getHtmlPath();
if (htmlPath == 'three_pages') {
	dataType = 'xing_spt_chudian_01';
} else if (htmlPath == 'three_pages_lx') {
	dataType = 'xing_spt_chudian_0103';
}
//查询方法
function query(first) {
	//from表单转json对象
	var form = $("form").serializeObject();
	
	var url = dataOp.baseUrl + '/common/inter?dateDtKpi=' + form.date + '&dataType=' + dataType + '&fresh=1&params=page::' + (context.option.curr - 1) * pageNum + ';;pageNum::' + pageNum + ';;xing::' + form.starLevel + ';;sub_center_name::' + form.sub_center_name + ';;operator_name::' + form.operator_name + ';;fenqu::' + form.fenqu + ';;date_dt_jx::' + form.date_dt_jx;

	if(dataType == 'xing_spt_chudian_0103'){
		url += ';;date_dt_fqjx::' + form.date_dt_fqjx + ";;fenqu_lx::" + form.fenqu_lx;
	}
	//get请求刷新表格数据
	$.get(url,function(data) {
			var totalPages = Math.ceil(data.spt_chudian_count.page_size / pageNum);
			
			$("#curr").val(context.option.curr);
			$("#totalPages").text(totalPages);
			$("#total").text(data.spt_chudian_count.page_size);
			$("#tableBody").html('');
			//设置总页数
			context.option.pages = totalPages ;
			if (searchFlag) {
				searchFlag = false;
				context.setGroups(totalPages > 5 ? 5 : totalPages);
			}
			if (data.spt_chudian_count.page_size == 0) {
				return;
			}
			//获取数据对象
			var spt_chudian_01 = data.spt_chudian_01;

			//获取数据个数
			var len = spt_chudian_01.fetch_at.length;
			//拼接表格数据加载到表格中
			var htmls = "";

			for (var i = 0; i < len; i++) {
				htmls += dataTableTmp
					.replace("DATE", FormatDateTime(spt_chudian_01.fetch_at[i]))
					.replace("PLATFORM", spt_chudian_01.pingtai[i])
					.replace("REGION_SMALL", spt_chudian_01.sub_center_name[i])
					.replace("CONTACT_ID", spt_chudian_01.operator_id[i])
					.replace("CONTACT_NAME", spt_chudian_01.operator_name[i])
					.replace("CONTACT_STAR", GetStarIcon(spt_chudian_01.xing[i]))
					.replace("PARTITION", showPartitionName(spt_chudian_01.fenqu[i]))
					.replace("TRANSACTION_AMOUNT", spt_chudian_01.total_transaction[i])
					.replace("NUMBER_LIFE_USERS", spt_chudian_01.total_user_sum[i])
			}
			$("#tableBody").append(htmls);
		},
		'json'
	);
}