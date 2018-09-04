//门店的表类型
var dataType = 'scy_mendian_mx_01';

//查询方法
function query(first) {
  //from表单转json对象
  var form = $("form").serializeObject();

  var url = dataOp.baseUrl + '/common/inter?dateDtKpi='
    + form.date + '&dataType=' + dataType
    + '&fresh=1&params=page::' + (context.option.curr - 1) * 100 + ';;'
    + 'fenji::' + form.starLevel + ';;'
    + 'trade_name::' + form.trade_name + ';;'
    + 'mendian_name::' + form.mendian_name + ';;'
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
    var len = dataTable.mendian_code.length;
    //拼接表格数据加载到表格中
    var htmls = "";
    // 设置模板
    var dataTableTmp = '<tr>'
      + '    <td>mendian_code</td>'
      + '    <td>mendian_name</td>'
      + '    <td>trade_name</td>'
      + '    <td >grid_micro_name</td>'
      + '    <td>yj_shr_sj</td>'
      + '    <td >chuyang_no</td>'
      + '    <td>xiaoshou_no</td>'
      + '    <td >ruzhuxiaoqu</td>'
      + '    <td >sheji_no</td>'
      + '    <td >anzhuang_no</td>'
      + '    <td >sfyms</td>'
      + '    <td>moshi_content</td>'
      + '    <td align="center">fenji</td>'
      + '</tr>';
    for (var i = 0; i < len; i++) {
      htmls += dataTableTmp.replace("mendian_code", dataTable.mendian_code[i] == null ? '' : dataTable.mendian_code[i])
        .replace("mendian_name", dataTable.mendian_name[i] == null ? '' : dataTable.mendian_name[i])
        .replace("trade_name", dataTable.trade_name[i] == null ? '' : dataTable.trade_name[i])
        .replace("grid_micro_name", dataTable.grid_micro_name[i] == null ? '' : dataTable.grid_micro_name[i])
        .replace("yj_shr_sj", dataTable.yj_shr_sj[i] == null ? '' : dataTable.yj_shr_sj[i])
        .replace("chuyang_no", dataTable.chuyang_no[i] == null ? '' : dataTable.chuyang_no[i])
        .replace("xiaoshou_no", dataTable.xiaoshou_no[i] == null ? '' : dataTable.xiaoshou_no[i])
        .replace("ruzhuxiaoqu", dataTable.ruzhuxiaoqu[i] == null ? '' : dataTable.ruzhuxiaoqu[i])
        .replace("sheji_no", dataTable.sheji_no[i] == null ? '' : dataTable.sheji_no[i])
        .replace("anzhuang_no", dataTable.anzhuang_no[i] == null ? '' : dataTable.anzhuang_no[i])
        .replace("sfyms", dataTable.sfyms[i] == null ? '' : dataTable.sfyms[i])
        .replace("moshi_content", dataTable.moshi_content[i] == null ? '' : dataTable.moshi_content[i])
        .replace("fenji", GetStarIcon(dataTable.fenji[i]))
    }
    $("#tableBody").append(htmls);
  }, 'json');
}