// 每页显示记录数标志
var pageNum = 100;
//查询状态为
var searchFlag = false;
// 分页信息对象
var context = {};

/*
 * 分区流向跳转到三级页面
 */
/*var lx = getUrlParam('lx');
var date_dt_fqjx ='';
if(lx){
	$('form').prepend('<input type="text" name="date_dt_fqjx" id="date_dt_fqjx"/>');
	$('#date_dt_fqjx').val(getUrlParam('date_dt_fqjx'));
	
	// $('.am-topbar:eq(1)').css('min-height','0');
	
	var text = $('.custom-header a:eq(0)').text().replace('Haier', '');
	$('.custom-header a:eq(0)').html('<span>Haier</span>'+ text + '（分区流向）');
	$('.custom-search').hide();
}*/
/*加载滚动条样式*/
document.writeln("<link rel=\'stylesheet\' href=\'../../assets/css/jquery.mCustomScrollbar.css\' />");
document.writeln("<script src=\'../../assets/js/jquery.mCustomScrollbar.concat.min.js\'></script>");

$(function() {
	// 设置表格高度
	setTableHeight("table_div", 440);
	// 设置分页外边距
	$('#curr').parent().css('margin-bottom','15px');
	// 固定表头
	/*$('#tbHead')*/
	
	/*$("body").on('scroll','#table_div',function() {
		 alert(1);
	});*/
	
	// $('#table_div tbody').css('height','420px');
	// 分区基线日期
	Haier.timeBarAndDefaultVal('date_dt_fqjx', '2018-8-1');
	// 基线日期
	Haier.timeBarAndDefaultVal('date_dt_jx', '2018-07-11');
	// 设置昨天之后的日期不可选
	Haier.setToadyBefor("date");
	//名称文本框默认值
	Haier.textDefaultVal("sub_center_name");
	// 星级下拉
	Haier.dropDefaultVal('starLevel');
	// 分区下拉
	Haier.dropDefaultVal('fenqu');
	// 流向分区下拉
	Haier.dropDefaultVal('fenqu_lx');
	
	// 表格滚动条滚动样式  		minimal-dark 	dark-3
	/*$.mCustomScrollbar.defaults.theme="minimal-dark"; //set "light-2" as the default theme
	$("#table_div").mCustomScrollbar({
		axis:"yx",
		callbacks:{
			whileScrolling:function(){
//            	console.log(this.mcs.left);
            	$('#tbHead div:eq(0)').css('left',this.mcs.left+'px');
            	if($('#table_div').height() > 420){
//            		margin-right: 30px;
            		$('#tbHead').css('margin-right','30px');
            	}
            	
            },
            
        },
		advanced:{autoExpandHorizontalScroll:true}
		
	});
	$('.mCSB_scrollTools.mCSB_scrollTools_horizontal .mCSB_dragger .mCSB_dragger_bar').css('height','6px');
	$('#mCSB_1_dragger_vertical .mCSB_dragger_bar').css('width','6px');*/
	//分页插件初始化
	var $page = $("#page").page({
		pages : 1, //数据总页数
		groups : 5, //连续显示分页数
		curr : 1, //设置当前页数
		jump : function(my_context, first) {
			context = my_context;
			query(first);
		}
	});
	// 查询按钮单击事件
	$("#query").on("click", function() {

		searchFlag = true;
		if ($page.option.curr == 1) {
			$page._jump();
		} else {
			$page.setCurr(1);
		}
	});
	// 初始化执行查询
	$("#query").click();
	/*
	 * 第{n}页键盘按下事件
	 */
	$('#curr').on('keydown', function(event) {
		if (event.keyCode == 13) {
			var curr = Number($(this).val());
			var totalPages = Number($('#totalPages').text());
			if (curr > totalPages || curr < 1) {
				alert("输入的页码没有数据");
				return;
			}
			$page.setCurr(curr);
		}
	});
	/*
	 * 每页记录数键盘按下事件
	 */
	$('#pageNum').on('keydown', function(event) {
		if (event.keyCode == 13) {
			pageNum = $(this).val();
			$("#query").trigger('click');
		}
	});
	$("#type1,#type2").change(function() {
		var param = $("form").serialize();
		tableGo('?' + param);
	});
	
	$('#myCollapse').on('click',function(){
		$(this).prev().find('.am-form').toggle();
	});

	//导出按钮单击事件
	$("#exportBtn").on('click', function() {
		//from表单转json对象
		var form = $("form").serializeObject();
		//日期格式化 : yyyy-MM-dd ---> yyyyMMdd(去除'-')
		form.date = form.date.replace(/-/g, "");
		// form.date_dt_jx = form.date_dt_jx.replace(/-/g, "");

		// http://10.138.42.215:19805/operationExcel/export?dateDtKpi=20180719&dataType=xing_spt_quyu_01&fresh=1&params=page::0;;pageNum::100000;;date_dt_jx::2018-07-17;;xing::0;;fenqu::0;;sub_center_name::;;operator_name::
		location.href = dataOp.baseUrl + '/operationExcel/export?'
										+ 'dateDtKpi=' + form.date
										+ '&dataType=' + dataType
										+ '&fresh=1'
										+ '&params=page::0'
										+ ';;pageNum::1000000'
										+ ';;xing::' + form.starLevel
										+ ';;sub_center_name::' + form.sub_center_name
										+ ';;fenqu::' + form.fenqu
										+ ';;date_dt_jx::' + form.date_dt_jx;

	});

	if (dataType.indexOf('quyu') != -1 && dataType.indexOf('scy_quyu') == -1) {
		// 表格行单击事件
		$("#tableBody").on('dblclick', 'tr', function(event) {
			//if (event.ctrlKey && event.button == 0) { // 鼠标左键 }
			var url = window.location.href;
			var tmp = url.split("?"); //按照"/"分割 
			// 获取平台区域页面对应的触电页面
			url = tmp[0].replace('quyu', 'chudian');
			// 获取请求参数的值
			var date_dt_jx = $('#date_dt_jx').val();
			var date = $('#date').val();
			var index = $(this).parent().prev().find('th:contains("区域小微")').index();
			var sub_center_name = $(this).find('td:eq(' + index + ')').text();
			// 拼接请求参数
			url += '?date_dt_jx=' + date_dt_jx + '&date=' + date + '&sub_center_name=' + sub_center_name;
			// 跳转页面
			window.location.href = url;
		});
	}
/*if(dataType.indexOf('yonghu') != -1){
	// 表格行单击事件
	$("#tableBody").on('dblclick', 'tr', function(event) {
		//if (event.ctrlKey && event.button == 0) { // 鼠标左键 }
		var url = window.location.href;
		var tmp = url.split("?"); //按照"/"分割 
		// 获取平台区域页面对应的触电页面
		url = tmp[0].replace('yonghu', 'quyu');
		// 获取请求参数的值
		var date_dt_jx = $('#date_dt_jx').val();
		var date = $('#date').val();
		var index = $(this).parent().prev().find('th:contains("区域小微")').index(); 
		var sub_center_name = $(this).find('td:eq('+index+')').text();
		// 拼接请求参数
		url += '?date_dt_jx='+date_dt_jx+'&date='+date+'&sub_center_name='+sub_center_name;
		// 跳转页面
		window.location.href = url;
	});
}*/
});