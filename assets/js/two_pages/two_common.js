// 详细页面跳转
var pie;
var pageType;
var dataTemp;

/* ---------------------------------------------函数--------------------------------------------- */
/**
 * 二级用户页面切换下拉
 * 
 */
function mySwitch(){
	$("#five-table table:visible").hide();
			
	var type = $("#type3").val();
	var areaNames =  $('#'+type+' span[id*="AreaName"]');
	for(i=0;i<areaNames.length;i++){
		areaNames.text('');
	}
	if(dataTemp[type].xing){
		areaNames.eq(dataTemp[type].xing[0] - 1).text($("#type3").find('option:selected').text());
	}
	
	$("#five-table #"+type+"").show();
}

function pageDetailGo(pt) {
	$('#mbTr td:eq(0) span').text('8.30');
	$('#mb2Tr td:eq(0) span').text('本周');
	$('#mbTr td:gt(0),#mb2Tr td:gt(0)').text('/');
	$("#sjTr").after('<tr id="jlTr" style="font-weight: bold;"><td>结论</td><td>/</td><td>/</td><td>/</td><td>/</td><td>/</td></tr>');
	
	//导航栏标题<a>标签单击事件
	$('.custom-header').on('click',' > a',function(event){
		event.preventDefault();
		var date_dt_fqjx = $('#date_dt_fqjx').val();
		var url = $(this).attr('href') + '?date=' + $('#date').val() + '&date_dt_jx=' + $('#date_dt_jx').val(); 
		if(date_dt_fqjx){
			url += '&date_dt_fqjx='+date_dt_fqjx;
		}
		location.href = url; 
	});
	
	// 分区基线日期
	Haier.timeBarAndDefaultVal('date_dt_fqjx', '2018-8-1');
	// 基线日期
	Haier.timeBarAndDefaultVal('date_dt_jx', '2018-07-11');
	// 设置昨天之后的日期不可选
	Haier.setToadyBefor("date");
	// 页面类型 1.触点 2.区域
	pageType = pt;
	// 表格数据
	var sjDate = $("#date").val().replace(/-/g, '.').substr(5) .replace(/\b(0+)/gi, "");
	var $tds2 = $("#sjTr").find("td");
	$tds2.eq(0).find("span").text(sjDate);

	pie = echarts.init(document.getElementById("start-level-pie"));

	$("#type1,#type2").change(
		function() {
			var type1 = $("#type1").val();
			var type2 = $("#type2").val();
			var type3 = $("#type3").val();
			//跳转地址存储
			var url = '';
			// 平台下拉文本框
			switch (type1) {
				case '1':
					url += 'two_lj';
					break;
				case '2':
					url += 'two_wl';
					break;
				case '3':
					url += 'two_spt';
					break;
				case '4':
					url += 'two_hm';
					break;
				case '5':
					url += 'two_scy';
					break;
				case '6':
					url += 'two_jj';
					break;
			}
			// 类别下拉文本框
			switch (type2) {
				case '1':
					url += '_chudian';
					break;
				case '2':
					url += '_quyu';
					break;
				case '3':
					url += '_yonghu';
					break;
			}
			var flag = 0;
			// 不存在页面处理
			if(url == 'two_jj_quyu'){
			   url = 'two_jj_chudian'
			}else if(url == 'two_scy_chudian'){
			   url = 'two_scy_quyu'
			}
			
			// 日期
			var date = $("#date").val();
			// 基线日期
			var date_dt_jx = $("#date_dt_jx").val();
			// 分区基线日期
			var date_dt_fqjx = $("#date_dt_fqjx").val();
			location.href = url += '.html?date=' + date + '&date_dt_jx=' + date_dt_jx +'&date_dt_fqjx=' + date_dt_fqjx ;
		}
	);
	

	$(".bg-blue").click(
		function() {
			var starLevel = $(this).attr("startLevel");
			var date = $("#date").val();
			var date_dt_jx = $("#date_dt_jx").val();
			tableGoByTwo("?starLevel=" + starLevel + "&date=" + date + "&date_dt_jx=" + date_dt_jx);
		}
	);

	$(".are_num").click(function() {
		var fenqu = $(this).attr("fenqu");
		var date = $("#date").val();
		var date_dt_jx = $("#date_dt_jx").val();
		tableGoByTwo("?fenqu=" + fenqu + "&date=" + date + '&date_dt_jx=' + date_dt_jx);
	});
	
	$(".flow").on('click','a',function() {
		event.preventDefault();
		// 分区
		var fenqu = $(this).closest('.flow').next().find('a').attr("fenqu");
		// 流向分区
		var fenqu_lx = $(this).data('fenqu');
		// console.info(fenqu_lx +":"+ fenqu);
		// 分区基线日期
		var date_dt_fqjx = $("#date_dt_fqjx").val();
		// 基线日期
		var date_dt_jx = $("#date_dt_jx").val();
		// 当前日期
		var date = $("#date").val();
		tableGoByTwoLX("?fenqu=" + fenqu + "&date=" + date + '&date_dt_jx=' + date_dt_jx + '&date_dt_fqjx=' + date_dt_fqjx +'&fenqu_lx='+fenqu_lx);
	});

	$(".star_num").click(function() {
		var starLevel = $(this).attr("startLevel");
		var date = $("#date").val();
		var date_dt_jx = $("#date_dt_jx").val();
		tableGoByTwo("?starLevel=" + starLevel + "&date=" + date + '&date_dt_jx=' + date_dt_jx);
	});

	$("#searchBtn").click(function() {
		var sjDate = $("#date").val().replace(/-/g, '.').substr(5) .replace(/\b(0+)/gi, "");
		var $tds2 = $("#sjTr").find("td");
		$tds2.eq(0).find("span").text(sjDate);
		// 基线日期
		var date_dt_jx = $("#date_dt_jx").val();
		// 分区基线日期
		var date_dt_fqjx = $("#date_dt_fqjx").val();
		
		var url = $(this).attr("url") + $("#date").val().replace(/-/g, "") + "&params=date_dt_jx::" + date_dt_jx +";;date_dt_fqjx::" + date_dt_fqjx;
		getDetailInfo(url);
	});
	$("#searchBtn").click();
	// chartSwitchOptions(chartData,'车小微',dataTemp['cxw'].xing[0] ? dataTemp['cxw'].xing[0] : 0);
	/*if(getHtmlDocName() == 'two_wl_yonghu'){
		chartSwitchOptions(chartData,'车小微',dataTemp['cxw'].xing[0] ? 0 : dataTemp['cxw'].xing[0]);
	}*/
}

// 表格页面跳转
function pageTableGo() {
	$("#type1,#type2").change(function() {
		tableGo("");
	});
}
/**
 * 显示左侧分区
 */
function showFenQu(obj,rowNum){
	var flowHtml = '';
	var flows = $(".color-div").find(".flow");
	var i = 0;
	if(obj && obj.fenqu){
		var myHeight = 134 / obj.fenqu.length +'px';
		for(i = 0; i < obj.fenqu.length; i++){
			var num = obj.fenqu[i];
			//绿区
			if(num==1){
				flowHtml += '<div class="color-text" style="background-color: rgb(70, 202, 155);"><a href="javascript:;"  data-fenqu="1" >'+obj.fq_count[i]+'</a>个</div>';
			//蓝区
			}else if(num == 2){
				flowHtml += '<div class="color-text" style="background-color: rgb(58, 190, 229);"><a href="javascript:;" data-fenqu="2" >'+obj.fq_count[i]+'</a>个</div>';
			//黄区
			}else if(num == 3){
				flowHtml += '<div class="color-text" style="background-color: rgb(246, 200, 65);"><a href="javascript:;" data-fenqu="3" >'+obj.fq_count[i]+'</a>个</div>';
			//红区
			}else if(num == 4){
				flowHtml += '<div class="color-text" style="background-color: rgb(248, 83, 89);"><a href="javascript:;" data-fenqu="4" >'+obj.fq_count[i]+'</a>个</div>';
			}
		}
		flows.eq(rowNum).html(flowHtml);
		flows.eq(rowNum).find('.color-text').css({"height": myHeight,"line-height": myHeight});
	}else{
		flows.eq(rowNum).html('<div class="color-text"><a href="javascript:;">0</a>个</div>');
		flows.eq(rowNum).find('.color-text').css({"height": '134px',"line-height": '134px'});
	}
	
}
/**
 * 图表名称显示
 */
function showChartName(data,flag = ''){
	var id = '#' + flag + 'StarAreaName';
	var obj = data[flag+'_star'];
	if (obj && obj.name && obj.name.length > 0) {
		if(obj.name.length >= 3){
			$(id).text(obj.name.join(",")+"等 ");
		}else{
			$(id).text(obj.name.join(","));
		}
	}else{
		$(id).text('');
	}
}

// 获取详细页面数据
function getDetailInfo(url) {
	dataOp.get({
		url : dataOp.baseUrl + url,
		async : false,
		data : {},
		dataType : 'json',
		success : function(data) {
			
			/*
			 * 左侧分区流向
			 */
			// 绿区流向
			showFenQu(data.fenqu_lx_green,0);
			// 蓝区流向
			showFenQu(data.fenqu_lx_blue,1);
			// 黄区流向
			showFenQu(data.fenqu_lx_yellow,2);
			// 红区流向
			showFenQu(data.fenqu_lx_red,3);
			
			// 分区 合计
			var colorAs = $(".color-div").find(".description-text a");
			if (data.fenqu && data.fenqu.fenqu) {
				var fenqu = data.fenqu;
				// var colorSpans = $(".color-div").find(".description-text span");
				var arr = fenqu.fenqu;
				for(i = 1;i <= 4; i++){
					index = arr.indexOf(i);
					if(index != -1){
						// colorSpans.eq(index).text(fenqu.sub_center_name[index]);
						colorAs.eq(i-1).text(fenqu.fenquCount[index]);
					}else{
						// colorSpans.eq(i).text('');
						colorAs.eq(i-1).text('0');
					}
				}
			}else{
				for(i = 1;i <= 4; i++){
					colorAs.eq(i-1).text('0');
				}
			}
			
			// 表格数据
			var sjDate = $("#date").val().replace(/-/g, '.').substr(5).replace(/\b(0+)/gi, "");
			var $tds2 = $("#sjTr").find("td");
			$tds2.eq(0).find("span").text(sjDate);
			
			// 图表名称显示
			showChartName(data, 'one');
			showChartName(data, 'two');
			showChartName(data, 'three');
			showChartName(data, 'four');
			showChartName(data, 'five');
			
			// 饼图显示表格星级多少
			var echartsData = [];
			var str =  '<td>结论</td>';
			// 下方表格数据
			$star_nums = $(".star_num");
			// 计算表格结论
			var jielun = data.jielun;
			var star = data.star;
			var arr = star.star;
			var arr2 = [];
			if(data.jielun){
				arr2 = jielun.star;
			}
			
			var index = -1;
			var index2 = -1;
			var week = ['一星','二星','三星','四星','五星']; 
			
			var jisuan = 0 ;
			var xingTotal = 0; 
			var divide = 1;	
			if(arr && arr.length > 0){
//				if (pageType == 1) {
//					divide = 10000 ;
//				} else if (pageType == 2) {
//					divide = 1 ;
//				}
				for(i = 1 ;i <= 5; i++){
					index = arr.indexOf(i);
					if(arr2){
						index2 = arr2.indexOf(i);
					}
					if(index != -1){
						xingTotal += star.starCount[index];
						if(arr2 && index2 != -1){
							jisuan = star.starCount[index] - jielun.starCount[index2];
						}else{
							jisuan = star.starCount[index] - 0;
						}
						$tds2.eq(i).text(star.starCount[index] / divide);
						$star_nums.eq(5-i).text(star.starCount[index]);
						echartsData.push({name:week[i-1],value:star.starCount[index]});
					}else{
						if(arr2 && index2 != -1){
							jisuan = 0 - jielun.starCount[index2];
						}else{
							jisuan = 0;
						}
						$tds2.eq(i).text('0');
						$star_nums.eq(5-i).text('0');
						echartsData.push({name:week[i-1],value:0});
					}
					
					if(jisuan > 0){
						str += '<td>上升'+jisuan+'个</td>';
					}else if(jisuan < 0){
						str += '<td>下降'+(-jisuan)+'个</td>';
					}else{
						str += '<td>持平</td>';
					}
				}
			}else{
				for(i = 1 ;i <= 5; i++){
					$tds2.eq(i).text('0');
					$star_nums.eq(5-i).text('0');
					if(arr){
						index2 = arr2.indexOf(i);
					}
					if(index2 != -1){
						str += '<td>下降'+(-jisuan)+'个</td>';
					}else{
						str += '<td>持平</td>';
					}
				}
			}
			/*var myStr = '';
			if(divide == 10000){
				myStr = '合计(万):' + xingTotal / 10000;
			}else{
				myStr = '合计(个):' + xingTotal;
			}*/
			
			$('.am-table  thead tr th:eq(0)').text('合计(个):' + xingTotal);
			
			$("#jlTr").html(str);
			// 饼状图数据
			var option = {
				title : {
					x : 'center'
				},
				tooltip : {
					trigger : 'item',
					formatter : "{a} <br/>{b} : {c} ({d}%)"
				},
				legend : {
					orient : 'vertical',
					x : 'left',
					data : week
				},
				series : [ {
					name : '星级实际占比',
					type : 'pie',
					radius : '65%',
					center : [ '65%', '40%' ],
					data : echartsData,
					itemStyle : {
						normal : {
							label : {
								show : false
							},
							labelLine : {
								show : false
							}
						}
					}
				} ]
			};
			pie.setOption(option);
			
			dataTemp = data;
			// 获取url文件名
			var htmlName = getHtmlDocName();
			
			if(htmlName == 'two_wl_yonghu'){
				chartSwitchOptions(chartData,'车小微',dataTemp['cxw'].xing ? dataTemp['cxw'].xing[0] : 0);
				$(".color-div").find(".flow").html('');
			}
			else if(htmlName == 'two_lj_yonghu'|| htmlName == 'two_spt_yonghu'){
				$star_nums.text('');
				/*var areaNames =  $('#gyy span[id*="AreaName"]');
				areaNames.eq(dataTemp['gyy'].xing[0] - 1).text('柜运营小微');*/
				mySwitch();
				$(".color-div").find(".flow").html('');
			}
		},
		error : function(e) {
			console.log(e);
		}
	});
}