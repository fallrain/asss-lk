/**
 * ajax方法封装 
 */
var dataOp = {
	// 请求地址
	baseUrl : "http://10.138.42.215:19805",
	comonConfig : function(config) {
		config.async = config.async ? config.async : true;
		config.dataType = config.dataType ? config.dataType : "json";
		config.contentType = config.contentType ? config.contentType
			: "application/x-www-form-urlencoded";
		config.timeout = config.timeout ? config.timeout : 3000;
		return config;
	},

	get : function(config) {
		config = dataOp.comonConfig(config);
		$.ajax({
			type : "GET",
			url : config.url,
			data : config.data,
			async : config.async,
			dataType : config.dataType,
			success : function(data) {
				config.success(data);
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {},
			beforeSend : function(XMLHttpRequest) {},
			complete : function(XMLHttpRequest, textStatus) {}
		});
	},
	post : function(config) {
		config = dataOp.comonConfig(config);
		$.ajax({
			type : "POST",
			url : config.url,
			data : config.data,
			dataType : config.dataType,
			success : function(data) {
				config.success(data);
			}
		});
	}
};

/**
 * 正在加载处理
 */
$('body').prepend('<div class="divBG"><div class="loading"></div></div>');
/*设置全局 AJAX 默认选项。*/
/*$.ajaxSetup({
	beforeSend:function() {
		alert(1);
		$('.divBG').show();
	},
	complete:function() {
		alert(2);
		$('.divBG').hide();
	},
});*/
$(document).ajaxStart(function() {
	$('.divBG').show();
});
$(document).ajaxComplete(function() {
	$('.divBG').hide();
});

/*
 * js css 版本控制
 */
/*var versions = '1.1.0';
$('link').each(function(i){
	$(this).attr('href',$(this).attr('href')+'?v='+versions);
});
$('script').each(function(i){
	$(this).attr('script',$(this).attr('script')+'?v='+versions);
});*/

/*
 * html禁止缓存
 */
document.writeln("<meta http-equiv=\'Expires\' content=\'0\'>");
document.writeln("<meta http-equiv=\'Pragma\' content=\'no-cache\'>");
document.writeln("<meta http-equiv=\'Cache-control\' content=\'no-cache\'>");
document.writeln("<meta http-equiv=\'Cache\' content=\'no-cache\'>");

// 当前时间
var nowTemp = new Date();
// 当前日
var nowDay = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0).valueOf();
// 当前月
var nowMoth = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), 1, 0, 0, 0, 0).valueOf();
// 当前年
var nowYear = new Date(nowTemp.getFullYear(), 0, 1, 0, 0, 0, 0).valueOf();

/**
 * 我的函数
 */
var Haier = {
	/**
	 * 设置文本框默认值为昨天
	 */
	setToadyBefor : function(id) {
		var $yesterdayDateInput;
		$yesterdayDateInput = $('#' + id).datepicker({
			onRender : function(date, viewMode) {
				// 获取今天是几号
				var viewDate = nowDay;
				return date.valueOf() >= viewDate ? 'am-disabled' : '';
			}
		}).data('amui.datepicker');

		var date = getUrlParam(id);
		if (date) {
			$yesterdayDateInput.setValue(date);
		} else {
			$yesterdayDateInput.setValue(getYesterdayDate());
		}
	},
	
	/**
	 * 限制今天及今天之后日期不可选 ，并设置日期默认值
	 */
	timeBarAndDefaultVal : function(id = '', defaultVal = '') {
		$dateInput = $('#' + id).datepicker({
			onRender : function(date, viewMode) {
				// 获取今天是几号
				var viewDate = nowDay;
				return date.valueOf() >= viewDate ? 'am-disabled' : '';
			}
		}).data('amui.datepicker');
		var date = getUrlParam(id);
		if($dateInput){
			if (date) {
				$dateInput.setValue(date);
			} else {
				$dateInput.setValue(defaultVal);
			}
		}
	},
	/**
	 * 下拉文本默认选中
	 */
	dropDefaultVal : function(id = '') {
		$("#" + id + " option[value='" + getUrlParam(id) + "']").prop("selected", true);
	},
	/**
	 * 文本框赋默认值
	 */
	textDefaultVal : function(name = '') {
		$('input[name=' + name + ']').val(getUrlParam(name));
	}
}


// 日期格式转换
function FormatDateTime(UnixTime) {
	var a = ("" + UnixTime).replace("/Date(", "").replace(")/", "");
	var date = new Date(parseInt(a));
	var y = date.getFullYear();
	var m = date.getMonth() + 1;
	m = m < 10 ? ('0' + m) : m;
	var d = date.getDate();
	d = d < 10 ? ('0' + d) : d;
	return y + '-' + m + '-' + d;
}

/*setLastWednesday:function(id){
	
}*/
// 获取前一天日期  yyyy-MM--dd
function getYesterdayDate() {
	/*return "2018-07-19";*/
	var day1 = new Date();
	day1.setTime(day1.getTime() - 24 * 60 * 60 * 1000);
	var month = day1.getMonth() + 1;
	return day1.getFullYear() + "-" + month + "-" + day1.getDate();
}
/**
 * 设置上周三时间
 */
function setLastWednesday() {
	var day1 = new Date();
	day1.setTime(day1.getTime() - 24 * 60 * 60 * 1000 * (day1.getDay() + 4));
	var month = day1.getMonth() + 1;
	return day1.getFullYear() + "-" + month + "-" + day1.getDate();
}

// 获取请求参数
function getUrlParam(name) {
	// 正则表达式截取截取参数 
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	// 正则匹配
	var r = window.location.search.substr(1).match(reg);
	// 判断参数是否存在
	if (r != null) {
		return decodeURI(r[2]);
	}
	return '';
}
//from表单转json对象
$.fn.serializeObject = function() {
	var o = {};
	var a = this.serializeArray();
	$.each(a, function() {
		if (o[this.name] !== undefined) {
			if (!o[this.name].push) {
				o[this.name] = [ o[this.name] ];
			}
			o[this.name].push(this.value || '');
		} else {
			o[this.name] = this.value || '';
		}
	});
	return o;
};

//乘100保留两位小数加%
function fixTwochengParcent(val) {
	if (val == '——' || val == '—' || val == '-') {
		return "-";
	} else {
		var thisValue = parseFloat(val) * 100;
		return thisValue.toFixed(2) + "%";
	}
}

//判断值是否为“空”
function isNull(val) {
	if (val === undefined || val === null || val === "" || val === ''
		|| val === "undefined" || val === "null" || val === "NULL" || val.length == 0 || val === "-") {
		return true;
	}
	return false;
}

//保留两位小数
function fixTwo(val) {
	if (isNull(val)) {
		return "-";
	}
	return parseFloat(val).toFixed(2);
}

/**
 * 加万
 */
function addWan(val) {
	if (val != '-') {
		return val + '万';
	}
	return val;
}

/**
 * 改变null值为'-'
 */
function changeNull(val) {
	if (val == null) {
		return "-";
	}
	return val;
}
/**
 * 根据数字展示分区名称
 */
function showPartitionName(val) {
	if (val == 1) {
		return '绿区';
	} else if (val == 2) {
		return '蓝区';
	} else if (val == 3) {
		return '黄区';
	} else if (val == 4) {
		return '红区';
	}
}
/**
 * 获取表格高度
 */
function setTableHeight(tableId, headHeight) {
	//$("#" + tableId).height($(window).height() - headHeight);
	$("#" + tableId).height(440);
}
/**
 * 通过二级页面跳转三级页面
 */
function tableGoByTwo(param) {
	pageJumps(param,'../three_pages/');
}
/**
 * 通过二级页面跳转三级页面
 */
function tableGoByTwoLX(param) {
	pageJumps(param,'../three_pages_lx/');
}
/**
 * 三级页面间相互跳转
 */
function tableGo(param) {
	pageJumps(param,'');
}
/**
 * 页面跳转函数
 */
function pageJumps(param, flag){
	var type1 = $("#type1").val();
	var type2 = $("#type2").val();
	// 乐家触点
	if (type1 == 1 && type2 == 1) {
		location.href = flag + "three_lj_chudian.html" + param
	}
	// 乐家区域
	else if (type1 == 1 && type2 == 2) {
		location.href = flag + "three_lj_quyu.html" + param
	}
	// 乐家用户
	else if (type1 == 1 && type2 == 3) {
		/*location.href = flag + "three_lj_yonghu.html" + param*/
		var type3 = $('#type3').val();
	    var date = $('#date').val()/* .replace(/-/g, '') */;
	    var dataType = 'xing_lj_yonghu_01_' + type3 ;
	    
	    location.href = '../three_pages/three_yonghu.html?'+ 'date=' + date + '&dataType=' + dataType;
	}
	//  物流用户
	else if (type1 == 2 && type2 == 3) {
		/*location.href = flag + "three_lj_yonghu.html" + param*/
		var type3 = $('#type3').val();
		var date = $('#date').val()/* .replace(/-/g, '') */;
		var dataType = 'xing_wl_yonghu_01_' + type3 ;
		
		location.href = '../three_pages/three_yonghu.html?'+ 'date=' + date + '&dataType=' + dataType;
	}
	//  健康用户
	else if (type1 == 3 && type2 == 3) {
		/*location.href = flag + "three_lj_yonghu.html" + param*/
		var type3 = $('#type3').val();
		var date = $('#date').val()/* .replace(/-/g, '') */;
		var dataType = 'xing_spt_yonghu_02_' + type3 ;
		
		location.href = '../three_pages/three_yonghu.html?'+ 'date=' + date + '&dataType=' + dataType;
	}
	
	// 物流区域
	else if (type1 == 2 && type2 == 2) {
		location.href = flag + "three_wl_quyu.html" + param
	}
	// 物流区域
	else if (type1 == 2 && type2 == 1) {
		location.href = flag + "three_wl_chudian.html" + param
	}
	
	// 乐农触点
	else if (type1 == 3 && type2 == 1) {
		location.href = flag + "three_spt_chudian.html" + param
	}
	// 乐农区域
	else if (type1 == 3 && type2 == 2) {
		location.href = flag + "three_spt_quyu.html" + param
	}
	
	// 国商用户
	/*else if (type1 == 4 && type2 == 3) {
		location.href = flag + "three_hm_yonghu.html" + param
	}*/
	// 国商区域
	else if (type1 == 4 && type2 == 2) {
		location.href = flag + "three_hm_quyu.html" + param
	}
	// 国商触点
	else if (type1 == 4 && type2 == 1) {
		location.href = flag + "three_hm_chudian.html" + param
	}
	
	// 水产业区域
	else if (type1 == 5 && (type2 == 2 || type2 == 1)) {
		location.href = flag + "three_scy_quyu.html" + param
	}
	// 水产业用户
	else if (type1 == 5 && type2 == 3) {
		location.href = flag + "three_scy_yonghu.html" + param
	}
	
	//页面不存在处理
	else{
		alert('将要跳转的页面不存在，请重新选择...');
	}
}

/**
 * 获取url中的文件名
 */
function getHtmlPath() {
    var str = window.location.href;
    str = str.substring(0 ,str.lastIndexOf("/"));
    str = str.substring(str.lastIndexOf("/") + 1);
    return str;
}

/**
 * 获取url中的文件名
 */
function getHtmlDocName() {
    var str = window.location.href;
    str = str.substring(str.lastIndexOf("/") + 1);
    str = str.substring(0, str.lastIndexOf("."));
    return str;
}
