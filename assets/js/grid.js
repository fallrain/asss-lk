//门店的表类型
var dataType = 'scy_wangge_mx_01';

//查询方法
function query(first) {
  //from表单转json对象
  var form = $("form").serializeObject();

  var url = dataOp.baseUrl + '/common/inter?dateDtKpi='
    + form.date + '&dataType=' + dataType
    + '&fresh=1&params=page::' + (context.option.curr - 1) * 100 + ';;'
    + 'wangge_wuxingfenji::' + form.starLevel + ';;'
    + 'trade_name::' + form.trade_name + ';;'
    + 'grid_micro_name::' + form.grid_micro_name;

  //get请求刷新表格数据
  $.get(url, function (data) {
    var totalCount = data['scy_mendian_count']['jilushu'][0];
    var totalPages = Math.ceil(totalCount / pageNum);

    $("#curr").val(context.option.curr);
    $("#totalPages").text(totalPages);
    $("#total").text(totalCount);
    $("#tableBody").html('');

    //设置总页数
    context.option.pages = totalPages;

    if (searchFlag) {
      searchFlag = false;
      context.setGroups(totalPages > 5 ? 5 : totalPages);
    }
    if (totalCount == 0) {
      return;
    }
    //获取数据对象
    var dataTable = data.scy_mendian_01;
    if (!dataTable) {
      return;
    }
    //获取数据个数
    var len = dataTable.grid_micro_code.length;
    //拼接表格数据加载到表格中
    var htmls = "";
    // 设置模板
    var dataTableTmp = '<tr>'
      + '    <td>grid_micro_code</td>'
      + '    <td>grid_micro_name</td>'
      + '    <td>trade_name</td>'
      + '    <td >yj_shr_sj_sum</td>'
      + '    <td >wd_no</td>'
      + '    <td>fgl</td>'
      + '    <td >cd_no</td>'
      + '    <td >cdzb</td>'
      + '    <td >ld_no</td>'
      + '    <td >ldzb</td>'
      + '    <td align="center">wangge_wuxingfenji</td>'
      + '</tr>';
    for (var i = 0; i < len; i++) {
      htmls += dataTableTmp.replace("grid_micro_code", dataTable.grid_micro_code[i] == null ? '' : dataTable.grid_micro_code[i])
        .replace("grid_micro_name", dataTable.grid_micro_name[i] == null ? '' : dataTable.grid_micro_name[i])
        .replace("trade_name", dataTable.trade_name[i] == null ? '' : dataTable.trade_name[i])
        .replace("yj_shr_sj_sum", dataTable.yj_shr_sj_sum[i] == null ? '' : dataTable.yj_shr_sj_sum[i])
        .replace("wd_no", dataTable.wd_no[i] == null ? '' : dataTable.wd_no[i])
        .replace("fgl", dataTable.fgl[i] == null ? '' : dataTable.fgl[i])
        .replace("cd_no", dataTable.cd_no[i] == null ? '' : dataTable.cd_no[i])
        .replace("cdzb", dataTable.cdzb[i] == null ? '' : dataTable.cdzb[i])
        .replace("ld_no", dataTable.ld_no[i] == null ? '' : dataTable.ld_no[i])
        .replace("ldzb", dataTable.ldzb[i] == null ? '' : dataTable.ldzb[i])
        .replace("wangge_wuxingfenji", GetStarIcon(dataTable.wangge_wuxingfenji[i]))
    }
    $("#tableBody").append(htmls);
  }, 'json');
}