// 设置模板(大项目)
var dataTableTmp1 = '<tr>' +
  '    <td align="center">data[1]</td>' +
  '    <td>data[2]</td>' +
  '    <td>data[3]</td>' +
  '    <td align="right">data[4]</td>' +
  '    <td>data[5]</td>' +
  '    <td align="right">data[6]</td>' +
  '    <td align="right">data[7]</td>' +
  '</tr>';
//设置模板(小家电)
var dataTableTmp2 = '<tr>' +
  '    <td align="center">data[1]</td>' +
  '    <td>data[2]</td>' +
  '    <td>data[3]</td>' +
  '    <td align="right">data[4]</td>' +
  '    <td>data[5]</td>' +
  '    <td align="right">data[6]</td>' +
  '    <td align="right">data[7]</td>' +
  '    <td align="right">data[8]</td>' +
  '    <td align="right">data[9]</td>' +
  '</tr>';
//var dataType = "xing_hm_chudian_01";
var dataType = '';
var htmlPath = getHtmlPath();
if (htmlPath == 'three_pages') {
  dataType = 'xing_hm_dxm_chudian_01';
} else if (htmlPath == 'three_pages_lx') {
  dataType = 'xing_hm_dxm_chudian_01';
}

//查询方法
function query(first) {
  //from表单转json对象
  var form = $("form").serializeObject();

  var url = dataOp.baseUrl + '/common/inter?dateDtKpi=' + form.date + '&dataType=' + dataType + '&fresh=1&params=page::' + (context.option.curr - 1) * pageNum + ';;pageNum::' + pageNum + ';;xing::' + form.starLevel + ';;sub_center_name::' + form.sub_center_name + ';;fenqu::' + form.fenqu + ';;date_dt_jx::' + form.date_dt_jx;

  if (dataType == 'xing_hm_dxm_chudian_01') {
    url += ';;date_dt_fqjx::' + form.date_dt_fqjx + ";;fenqu_lx::" + form.fenqu_lx;
  }
  var jyt_erj = $('#jyt_erj').val();
  //get请求刷新表格数据
  $.get(url, function (data) {
      var totalPages = Math.ceil(data.hm_chudian_count.page_size / pageNum);

      $("#curr").val(context.option.curr);
      $("#totalPages").text(totalPages);
      $("#total").text(data.hm_chudian_count.page_size);
      $("#tableBody").html('');

      //设置总页数
      context.option.pages = totalPages;

      if (searchFlag) {
        searchFlag = false;
        context.setGroups(totalPages > 5 ? 5 : totalPages);
      }

      if (data.hm_chudian_count.page_size == 0) {
        return;
      }

      //获取数据对象
      var hm_chudian_01 = data.hm_chudian_01;
      if (!hm_chudian_01) {
        return;
      }
      //拼接表格数据加载到表格中
      var htmls = "";
      if (jyt_erj == '65A4') {// 大项目
        //获取数据个数
        var len = hm_chudian_01.riqi.length;

        for (var i = 0; i < len; i++) {
          htmls += dataTableTmp1
            .replace("data[1]", FormatDateTime(hm_chudian_01.riqi[i]))
            .replace("data[2]", hm_chudian_01.pingtai[i])
            .replace("data[3]", hm_chudian_01.guojia[i])
            .replace("data[4]", GetStarIcon(hm_chudian_01.xing[i]))
            .replace("data[5]", showPartitionName(hm_chudian_01.fenqu[i]))

            .replace("data[6]", hm_chudian_01.sjsr[i])

            .replace("data[7]", hm_chudian_01.lde[i])
        }
      } else if (jyt_erj == '65A5') {// 小家电
        //获取数据个数
        var len = hm_chudian_01.riqi.length;

        for (var i = 0; i < len; i++) {
          htmls += dataTableTmp2
            .replace("data[1]", FormatDateTime(hm_chudian_01.riqi[i]))
            .replace("data[2]", hm_chudian_01.pingtai[i])
            .replace("data[3]", hm_chudian_01.xqy[i])
            .replace("data[4]", GetStarIcon(hm_chudian_01.xing[i]))
            .replace("data[5]", showPartitionName(hm_chudian_01.fenqu[i]))

            .replace("data[6]", hm_chudian_01.srmb[i])
            .replace("data[7]", hm_chudian_01.sjsr[i])
            .replace("data[8]", hm_chudian_01.wcl[i])

            .replace("data[9]", hm_chudian_01.yhs[i])
        }
      }

      $("#tableBody").append(htmls);
    },
    'json'
  );
}

var arr = {
  '65A4': ['国家', '实际收入', '漏斗额'],
  '65A5': ['小区域', '收入规模（元）', '实际收入（元）', '完成率', '交易用户数'],
};

$(function () {
  $('#jyt_erj').on('change', function () {
    var my_val = $(this).val();
    if (my_val == '65A4') {
      $('#x-axis').attr('colspan', 1);
      $('#y-axis').attr('colspan', 1);
      dataType = 'xing_hm_dxm_chudian_01';
    } else {
      $('#x-axis').attr('colspan', 3);
      $('#y-axis').attr('colspan', 1);
      dataType = 'xing_hm_xjd_chudian_01';
    }
    $('#fanwei').text(arr[my_val][0]);
    $('#table_div table').find('thead:eq(0) tr:eq(1) th').remove();
    var html = '';
    for (i = 1; i < arr[my_val].length; i++) {
      html += '<th style="min-width: 200px">' + arr[my_val][i] + '</th>'
    }
    $('#table_div table').find('thead:eq(0) tr:eq(1)').append(html);
    $('#query').click();
  })
});