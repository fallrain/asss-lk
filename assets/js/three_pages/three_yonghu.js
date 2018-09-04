//设置昨天之后的日期不可选
Haier.setToadyBefor("date");
var dataType = getUrlParam('dataType') /*'xing_wl_yonghu_01_cxgj'*/ ;
/*
 *	{
	    title: '爱好',
	    key: 'like',
	    children: [ ]
	}
 */

/*
 * 公共表头
 */
var comArr = [
	{
		title : '日期',
		key : 'riqi',
	},
	{
		title : '平台',
		key : 'pingtai',
	},
	{
		title : '名称',
		key : 'name',
	},
	{
		title : '星级',
		key : 'xing',
	},
]
/*
 * 横、纵轴表头数组
 */
var data = {
	'xing_wl_yonghu_01_cxw' : [
		{
			title : '横轴',
			children : [
				{
					title : '收入增幅',
					key : 'srzf',
				},
			]
		},
		{
			title : '纵轴',
			children : [
				{
					title : '触点广度',
					key : 'cdgd_wcl',
				},
				{
					title : '触点温度',
					key : 'cdwd_wcl',
				},
				{
					title : '触点深度',
					key : 'cdsd_wcl',
				},
			]
		}
	],

	'xing_wl_yonghu_01_jkqc' : [
		{
			title : '横轴',
			children : [
				{
					title : '收入增幅',
					key : 'srzf',
				},
			]
		},
		{
			title : '纵轴',
			children : [
				{
					title : '触点共享',
					key : 'cdgx',
				},
				{
					title : '用户口碑',
					key : 'yhkb',
				},
				{
					title : '方案迭代',
					key : 'fadd',
				},
			]
		}
	],

	'xing_wl_yonghu_01_jjwl' : [
		{
			title : '横轴',
			children : [
				{
					title : '收入增幅',
					key : 'srzf',
				},
			]
		},
		{
			title : '纵轴',
			children : [
				{
					title : '触点共享',
					key : 'cdgx',
				},
				{
					title : '用户口碑',
					key : 'yhkb',
				},
				{
					title : '方案迭代',
					key : 'fadd',
				},
			]
		}
	],
	'xing_wl_yonghu_01_xsjj' : [
		{
			title : '横轴',
			children : [
				{
					title : '收入增幅',
					key : 'srzf',
				},
			]
		},
		{
			title : '纵轴',
			children : [
				{
					title : '触点共享',
					key : 'cdgx',
				},
				{
					title : '用户口碑',
					key : 'yhkb',
				},
				{
					title : '方案迭代',
					key : 'fadd',
				},
			]
		}
	],

	'xing_wl_yonghu_01_xsjd' : [
		{
			title : '横轴',
			children : [
				{
					title : '收入增幅',
					key : 'srzf',
				},
			]
		},
		{
			title : '纵轴',
			children : [
				{
					title : '用户口碑',
					key : 'yhkb',
				},
				{
					title : '触点温度',
					key : 'cdwd',
				},

			]
		}
	],

	'xing_wl_yonghu_01_shhjd' : [
		{
			title : '横轴',
			children : [
				{
					title : '收入增幅',
					key : 'srzf',
				},
			]
		},
		{
			title : '纵轴',
			children : [
				{
					title : '用户口碑',
					key : 'yhkb',
				},
				{
					title : '触点温度',
					key : 'cdwd',
				},
				{
					title : '方案迭代',
					key : 'fadd',
				},
			]
		}
	],

	'xing_wl_yonghu_01_cxgj' : [
		{
			title : '横轴',
			children : [
				{
					title : '收入增幅',
					key : 'srzf',
				},
			]
		},
		{
			title : '纵轴',
			children : [
				{
					title : '触点共享',
					key : 'cdgx',
				},
				{
					title : '用户口碑',
					key : 'yhkb',
				},
				{
					title : '方案迭代',
					key : 'fadd',
				},
			]
		}
	],



	'xing_wl_yonghu_01_hyzh' : [
		{
			title : '横轴',
			children : [
				{
					title : '收入增幅',
					key : 'srzf',
				},
			]
		},
		{
			title : '纵轴',
			children : [
				{
					title : '方案迭代',
					key : 'fadd',
				},
				{
					title : '品牌温度',
					key : 'ppwd',
				},

			]
		}
	],




	'xing_wl_yonghu_01_hrjd' : [
		{
			title : '横轴',
			children : [
				{
					title : '收入增幅',
					key : 'srzf',
				},
			]
		},
		{
			title : '纵轴',
			children : [
				{
					title : '用户口碑',
					key : 'yhkb',
				},
				{
					title : '触点温度',
					key : 'cdwd',
				},

			]
		}
	],



	'xing_wl_yonghu_01_kjwl' : [
		{
			title : '横轴',
			children : [
				{
					title : '收入完成率',
					key : 'srzf',
				},
			]
		},
		{
			title : '纵轴',
			children : [
				{
					title : '客户资源',
					key : 'khzy',
				},
				{
					title : '船舱触点保障度',
					key : 'cdbzd',
				},

			]
		}
	],



	'xing_wl_yonghu_01_vmwl' : [
		{
			title : '横轴',
			children : [
				{
					title : '收入增幅',
					key : 'srzf',
				},
			]
		},
		{
			title : '纵轴',
			children : [
				{
					title : '方案迭代',
					key : 'fadd',
				},
				{
					title : '品牌温度',
					key : 'ppwd',
				},

			]
		}
	],



	'xing_wl_yonghu_01_xfwl' : [
		{
			title : '横轴',
			children : [
				{
					title : '收入增幅',
					key : 'srwcl',
				},
			]
		},
		{
			title : '纵轴',
			children : [
				{
					title : '区域协同仓样板',
					key : 'xtc',
				},
				{
					title : '品牌温度',
					key : 'ppwd',
				},

			]
		}
	],





	'xing_wl_yonghu_01_llwl' : [
		{
			title : '横轴',
			children : [
				{
					title : '收入完成率',
					key : 'srwcl',
				},
			]
		},
		{
			title : '纵轴',
			children : [
				{
					title : '终端触点',
					key : 'zdcd',
				},
				{
					title : '无品牌温度',
					key : 'ppwd',
				},

			]
		}
	],


	'xing_wl_yonghu_01_db' : [
		{
			title : '横轴',
			children : [
				{
					title : '收入完成率',
					key : 'srwcl',
				},
			]
		},
		{
			title : '纵轴',
			children : [
				{
					title : '区域协同仓样板',
					key : 'xtc',
				},
				{
					title : '品牌温度',
					key : 'ppwd',
				},

			]
		}
	],



	'xing_wl_yonghu_01_ldwl' : [
		{
			title : '横轴',
			children : [
				{
					title : '收入增幅',
					key : 'srwcl',
				},
			]
		},
		{
			title : '纵轴',
			children : [
				{
					title : '专线网络覆盖',
					key : 'zxwlfg',
				},
				{
					title : '分公司盈利',
					key : 'fgsyl',
				},

			]
		}
	],

	'xing_wl_yonghu_01_yl' : [
		{
			title : '横轴',
			children : [
				{
					title : '收入完成率',
					key : 'srwcl',
				},
			]
		},
		{
			title : '纵轴',
			children : [
				{
					title : '无区域协同仓样板',
					key : 'xtc',
				},
				{
					title : '无品牌温度',
					key : 'ppwd',
				},

			]
		}
	],

	'xing_lj_yonghu_01_cpxw' : [
		{
			title : '横轴',
			children : [
				{
					title : '生态收入完成率',
					key : 'sr_wcl',
				},
			]
		},
		{
			title : '纵轴',
			children : [
				{
					title : '触点共享',
					key : 'cdgx_sj',
				},
				{
					title : '方案迭代',
					key : 'fadd',
				},
				{
					title : '终身用户',
					key : 'zsyh_wcl',
				},

			]
		}
	],
	'xing_lj_yonghu_01_gyy' : [
		{
			title : '横轴',
			children : [
				{
					title : '生态收入完成率',
					key : 'sr_wcl',
				},
			]
		},
		{
			title : '纵轴',
			children : [
				{
					title : '日付费流量',
					key : 'rfflx_sj',
				},
				{
					title : 'AB类柜占比',
					key : 'ab_wcl',
				},

			]
		}
	],
	'xing_lj_yonghu_01_sqyz' : [
		{
			title : '横轴',
			children : [
				{
					title : '收入完成率',
					key : 'sr_wcl',
				},
			]
		},
		{
			title : '纵轴',
			children : [
				{
					title : '广度（全覆盖）',
					key : 'gd_sj',
				},
				{
					title : '温度（全五星）',
					key : 'wd_wcl',
				},
				{
					title : '深度（终身用户）',
					key : 'sd_wcl',
				},

			]
		}
	],
	'xing_lj_yonghu_01_azfw' : [
		{
			title : '横轴',
			children : [
				{
					title : '天猫DSR行业第一',
					key : 'dsr_wcl',
				},
				{
					title : '京东24小时到位率行业第一',
					key : 'jd_wcl',
				},
			]
		},
		{
			title : '纵轴',
			children : [
				{
					title : '区域达标',
					key : 'qydb_wcl',
				},

			]
		}
	],
	'xing_lj_yonghu_01_zzfw' : [
		{
			title : '横轴',
			children : [
				{
					title : '完成率',
					key : 'sr_wcl',
				},
			]
		},
		{
			title : '纵轴',
			children : [
				{
					title : '产品竞争力',
					key : 'cpjzl_sj',
				},

			]
		}
	],
	'xing_lj_yonghu_01_shhfw' : [
		{
			title : '横轴',
			children : [
				{
					title : '完成率',
					key : 'sr_wcl',
				},
			]
		},
		{
			title : '纵轴',
			children : [
				{
					title : '三块一好行业第一',
					children : [
						{
							title : '快速响应',
							key : 'ksxy_wcl',
						},
						{
							title : '快速上门',
							key : 'kssm_wcl',
						},
						{
							title : '快速完结',
							key : 'kswj_wcl',
						},
						{
							title : '好评率',
							key : 'hpl_wcl',
						},
					]
				},
				{
					title : '客户质量',
					key : 'khzl_sj',
				},

			]
		}
	],
	
	'xing_spt_yonghu_02_ln' : [
		{
			title : '横轴',
			children : [
				{
					title : '触点覆盖',
					key : 'cdfg',
				},
			]
		},
		{
			title : '纵轴',
			children : [
				{
					title : '终身用户',
					key : 'zsyh',
				},
				{
					title : '方案迭代',
					key : 'fadd',
				},

			]
		}
	],
	'xing_spt_yonghu_02_lx' : [
		{
			title : '横轴',
			children : [
				{
					title : '触点覆盖',
					key : 'cdfg',
				},
				]
		},
		{
			title : '纵轴',
			children : [
				{
					title : '蜂拥而至（社会化占比）',
					key : 'shhzb',
				},
				{
					title : '口碑',
					key : 'kb',
				},
				
			]
		}
	],
	'xing_spt_yonghu_02_jkfw' : [
		{
			title : '横轴',
			children : [
				{
					title : '触点覆盖',
					key : 'cdfg',
				},
				]
		},
		{
			title : '纵轴',
			children : [
				{
					title : '蜂拥而至（社会化占比）',
					key : 'shhzb',
				},
				{
					title : '终身用户',
					key : 'zsyh',
				},
				
			]
		}
	],
};

// 表头显示文字存放数组
var trs = [];
// 数据字段名存放数组
var keys = [];

if (!data[dataType]) {
	alert('数据异常');
}
// 表头两数组合并
$.merge(comArr, data[dataType]);
// 调用函数生成表头
foo(comArr);

//查询方法
function query() {
	//from表单转json对象
	/*var form = $("form").serializeObject();*/
	var date = $('#date').val().replace(/-/g, '');

	var url = dataOp.baseUrl + '/common/inter?'
		+ 'dateDtKpi=' + date
		+ '&dataType=' + dataType
		+ '&fresh=1'

	//get请求刷新表格数据
	$.get(
		url,
		function(myData) {
			/*alert(keys[0]);*/
			var data = myData.data;
			var html = '';
			if (data[keys[0]]) {
				var len = data[keys[0]].length;
				if (len) {

					for (i = 0; i < len; i++) {
						html += '<tr>';
						for (j = 0; j < keys.length; j++) {
							// alert(keys.join());
							//alert(keys.length);
							var text = data[keys[j]][i];
							if(keys[j] == 'riqi'){
								text = FormatDateTime(data[keys[j]][i]);
							}else if(keys[j] == 'xing'){
								text = GetStarIcon(data[keys[j]][i]);
							}
							html += '<td>' + text + '</td>';
						}
						html += '</tr>';

					}

				}
			}
			$('#tableBody').html(html);

		},
		'json'
	);
}
query();

function pushTrs(arr) {
	var rank = arr[0].rank;
	if (trs[rank]) {
		$.merge(trs[rank], arr) //合并
	} else {
		trs[rank] = arr;
	}
}

/**
 * html渲染
 */
function render() {
	var $thead = $('<thead></thead>');
	var len = trs.length;
	for (var i = 0; i < trs.length; i++) {
		var $tr = $('<tr></tr>');
		for (var j = 0; j < trs[i].length; j++) {
			var $th = $('<th style="vertical-align: middle;">' + trs[i][j].title + '</th>');
			$th.attr('colspan', trs[i][j].colspan);
			if (trs[i][j].rowspan) {
				$th.attr('rowspan', trs[i][j].rowspan);
			} else {
				$th.attr('rowspan', len - trs[i][j].rank);
			}
			$tr.append($th);
		}
		$thead.append($tr);
	}
	$('#table_div table').prepend($thead);
}

function foo(arr, parent) {
	for (var i = 0; i < arr.length; i++) {
		len = arr[i].children ? arr[i].children.length : 0;
		arr[i].rank = parent ? parent.rank + 1 : 0;
		// console.log(arr[i].rank);
		if (len > 0) { //children 存在
			arr[i].rowspan = 1;
			foo(arr[i].children, arr[i]);
		} else { // children 不存在
			keys.push(arr[i].key);
			arr[i].colspan = 1;
		}
		if (parent) { // parent的colspan为children的colspan总和
			parent.colspan = parent.colspan ? parent.colspan : 0;
			parent.colspan += arr[i].colspan;
		}
	}

	pushTrs(arr);

	if (arr[0].rank == 0) { //最后一次递归结束
		render();
	}
}
$('#query').on('click', function() {
	query();
});

/*var arr = [];  // 存放字段名
var titleX = data.title.x[0].split(',');
var titleY = data.title.y[0].split(',');
var html1 = '';// 表头第二行
var html2 = '';	
var total = [] ;
//var split = [];
for(i=0 ;i< titleX.length; i++){
	var split = titleX[i].split(':1:');
	alert(split[1]);
	// 判断是否是数组类型   
	if(split[1].charAt(0) == "[" && split[1].charAt(split.length -1) == "]"){
		var a = split[1].substring(1, split[1].length -2);
		alert(a);
		var split = a.split(',');
		total.push(split.length);
		html1 += '<th style="min-width: 200px"  colspan="'+split.length+'" >'+split[0]+'</th>';
		for(j=0; j<split.length; j++){
			var split = split.split(':2:');
			arr.push(split[1]);
			html2 += '<th style="min-width: 200px">'+split[0]+'</th>'
		}
	}
	else{
		arr.push(split[1]);
		html1 += '<th style="min-width: 200px">'+split[0]+'</th>'
	}
}
console.log(html1);
console.log(html2);
console.log(arr.join());*/