// 获取星级
function GetStarIcon(starLevel) {
  if (!starLevel) {
    return starLevel;
  }

  return new Array(starLevel * 1 + 1).join('<i class="am-icon-star"></i>')
}

// 获取星级2
function GetStarIcon2(starLevel) {

  var starHtml = '';

  for (var i = 0; i < starLevel; i++) {
    starHtml += '★';
  }

  return starHtml;
}