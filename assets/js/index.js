// 改变null值为'-'
function changeNull(val) {
	if (val == null) {
		return "0";
	}
	return val;
}
var ljArr = [0,0,0,0];
// 加载表格数据
function tableLoadData(data,pt_flag,rowNum){
	var color_background = ['.green_background','.blue_background','.yellow_background','.red_background']
	var total = 0 ;
	var jielun_xing = [];
	var jielun_fenqu = [];
	if(data[pt_flag + '_fenqu_jielun'] && data[pt_flag + '_fenqu_jielun'].xing){
		jielun_xing = data[pt_flag + '_fenqu_jielun'].xing;
		jielun_fenqu = data[pt_flag + '_fenqu_jielun'].fenqu;
	}
	
	if(data[pt_flag + '_fenqu_star'] && data[pt_flag + '_fenqu_star'].fenqu &&data[pt_flag + '_fenqu_star'].fenqu.length >0){
		var arr = [pt_flag+'_fenqu_star_green',pt_flag+'_fenqu_star_blue',pt_flag+'_fenqu_star_yellow',pt_flag+'_fenqu_star_red'];
		var fenqu = data[pt_flag + '_fenqu_star'].fenqu;
		var xing = data[pt_flag + '_fenqu_star'].xing;
		
		for(var i =0 ; i < xing.length ; i++){
			total += xing[i];
		}
		var index = -1;
		for(var i = 0; i < 4; i++){
			index = fenqu.indexOf(i+1);
			if(data[pt_flag + '_fenqu_jielun'] && data[pt_flag + '_fenqu_jielun'].xing){
				index2 = jielun_fenqu.indexOf(i+1);
				if(index2 != -1){
					ljArr[i] += jielun_xing[index2];
				}
			}
			if(index != -1){
				var qukuai = arr[i];
				//alert(data[qukuai].name.join(','));
				var html = '';
				for(var j = 0 ; j < data[qukuai].name.length; j++){
					html  += '<div class="am-text-xs">'+data[qukuai].name[j]+'('+changeNull(data[qukuai].xing_jx[j])+'→'+changeNull(data[qukuai].xing_mb[j])+'→'+changeNull(data[qukuai].xing[j])+'星)</div>';
				}
				html += '<div class="am-text-xs">等'+xing[index]+'个</div>';
				
				// alert(color_background[i]+' > div:eq(1)');
				$(color_background[i]+':eq('+rowNum+') > div:eq(1)').html(html);
				$(color_background[i]+' .am-badge').eq(rowNum).html(xing[index] + ' / ' + total);
			}else{
				$(color_background[i]+':eq('+rowNum+') > div:eq(1)').html('');
				$(color_background[i]+' .am-badge').eq(rowNum).html(0 +' / '+ total);
			}
		}
	}else{
		for(var i = 0; i < 4; i++){
			$(color_background[i]+':eq('+rowNum+') > div:eq(1)').html('');
			$(color_background[i]+' .am-badge').eq(rowNum).html(0 +' / '+ total);
		}
	}
}
// 计算分区总数
function fenquTotalCount(){
	var str = '' ;
	$(".my_badge").each(function(i){
		var $tr = $(this).closest('td').nextAll();
		var num = 0 ;
		$tr.each(function(i){
			num += parseInt($(this).find('.am-badge').text().split(' / ')[0]);
		});
		var jisuan = 0;
		var color = 'black';
		jisuan = num - ljArr[i];
		if(jisuan > 0){
			str = '上升'+jisuan+'个';
			color = 'green';
		}else if(jisuan < 0){
			str = '下降'+(-jisuan)+'个';
			color = 'red';
		}else{
			str = '持平';
		}
		$(".my_td").eq(i).find('.am-vertical-align-middle .am-cf:eq(1) div').text(str);
		$(".my_td").eq(i).find('.am-vertical-align-middle .am-cf:eq(1) div').css('color',color);
		$(this).text(num);
	});
	ljArr = [0,0,0,0];
}

/**
 * 页面加载完执行函数
 */
$(function() {
	/*
	 * 时间输入框限制及赋值
	 */
	// 分区基线日期
	Haier.timeBarAndDefaultVal('date_dt_fqjx', setLastWednesday());
	// 基线日期
	Haier.timeBarAndDefaultVal('date_dt_jx', '2018-07-11');
	// 目标日期
	Haier.timeBarAndDefaultVal('date_dt_mb', '2018-08-30');
	// 当前日期
	Haier.setToadyBefor("date");
	
	// 获取请求标识
	var dataType = $("#query").data("type");
	/* 查询按钮单击事件 */
	$("#query").on("click", function() {
		// 基线日期
		var date_dt_jx = $("#date_dt_jx").val();
		// 目标日期
		var date_dt_mb = $("#date_dt_mb").val();
		// 分区基线日期
		var date_dt_fqjx = $("#date_dt_fqjx").val();
		// 当前日期
		var date = $("#date").val().replace(/-/g, "");
		
		$.get(dataOp.baseUrl + '/common/inter?'+ 'dateDtKpi=' + date  
				+ '&dataType=' + dataType
				+ '&fresh=1'
				+ '&params=date_dt_jx::'+ date_dt_jx
				+';;date_dt_mb::'+date_dt_mb
				+';;date_dt_fqjx::'+date_dt_fqjx/*url*/,
			function(data) {
			
				tableLoadData(data,'lj',0);
				tableLoadData(data,'wl',1);
				tableLoadData(data,'spt',2);
				tableLoadData(data,'hm',3);
				tableLoadData(data,'scy',4);
				
				// 计算分区总数
				fenquTotalCount(data);
				
			}, 'json');
	});
	
	$("#query").click();
	
	// 表格头部平台跳转单击事件
	$('.am-table th').on('click','a',function(event){
		event.preventDefault();
		var my_herf = $(this).attr('href');
		// 分区基线日期
		var date_dt_fqjx = $("#date_dt_fqjx").val();
		// 基线日期
		var date_dt_jx = $("#date_dt_jx").val();
		// 当前日期
		var date = $("#date").val();
		
		location.href = my_herf +'?date_dt_jx='+ date_dt_jx + '&date_dt_fqjx='+date_dt_fqjx + '&date=' + date;
		
	});
	// 导航栏右侧 li单击事件
	$('#doc-topbar-collapse ul').on('click','a',function(event){
		event.preventDefault();
		var my_herf = $(this).attr('href');
		// 分区基线日期
		var date_dt_fqjx = $("#date_dt_fqjx").val();
		// 基线日期
		var date_dt_jx = $("#date_dt_jx").val();
		// 目标日期
		var date_dt_mb = $("#date_dt_mb").val();
		// 当前日期
		var date = $("#date").val();
		
		location.href = my_herf + '?date_dt_jx='+ date_dt_jx + '&date_dt_fqjx='
						+date_dt_fqjx + '&date_dt_mb='+ date_dt_mb + '&date=' + date;
		
	});
	
	/* 导航条用户、触电 、区域<li>标签单击事件 */
	/*$("#doc-topbar-collapse").on("click", "ul li", function() {
		var obj = $(this);
		if (obj.hasClass("am-active")) {
			return;
		}
		obj.siblings(".am-active").removeClass("am-active");
		obj.addClass("am-active");
	});*/
});