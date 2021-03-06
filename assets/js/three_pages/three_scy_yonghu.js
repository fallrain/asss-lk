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
					'    <td align="right">data[12]</td>' +
					'</tr>';
var dataType = '';
var htmlPath = getHtmlPath();
if (htmlPath == 'three_pages') {
	dataType = 'xing_scy_yonghu_01';
} else if (htmlPath == 'three_pages_lx') {
	dataType = 'xing_scy_yonghu_0103';
}
//查询方法
function query(first) {
	//from表单转json对象
	var form = $("form").serializeObject();
	
	var url = dataOp.baseUrl + '/common/inter?dateDtKpi=' + form.date + '&dataType=' + dataType + '&fresh=1&params=page::' + (context.option.curr - 1) * pageNum + ';;pageNum::' + pageNum + ';;xing::' + form.starLevel + ';;sub_center_name::' + form.sub_center_name + ';;fenqu::' + form.fenqu + ';;date_dt_jx::' + form.date_dt_jx;

	if(dataType == 'xing_scy_yonghu_0103'){
		url += ';;date_dt_fqjx::' + form.date_dt_fqjx + ";;fenqu_lx::" + form.fenqu_lx;
	}
	//get请求刷新表格数据
	$.get(url,function(data) {
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
				/**
				 * t.cversion,	-- 日期
					'乐农' AS pingtai,	-- 平台
					t.cxw_code,	-- 小微编码
					t.cxw_name, -- 小微名称
					'5' as xingji, -- 用户星级
					'5' as fenqu, -- 分区
					t.nlj_shr, -- 今年累计收入
					m.nlj_shr as mb_nlj_shr ,-- 目标累计收入
					'1000' as qn_shr, -- 去年累计收入  111
					t.nlj_shr / m.nlj_shr  as wcl ,-- 完成率 11
					'12' as fd, -- 幅度 11
					t.nlj_zz -- 年累计纵轴	
				 */
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
					.replace("data[12]", changeNull(scy_yonghu_01.nlj_zz[i]))
			}
			$("#tableBody").append(htmls);
		},
		'json'
	);
}