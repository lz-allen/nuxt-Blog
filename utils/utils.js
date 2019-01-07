function IsPC() {
  let flag = true
  let userAgentInfo = navigator.userAgent.toLowerCase()
  let Agents = new Array('android', 'iphone', 'symbianOS', 'windows phone', 'ipad', 'ipod')
  for (var v = 0; v < Agents.length; v++) {
    if (userAgentInfo.indexOf(Agents[v]) > 0) {
      flag = false
      break
    }
  }
  if (window.screen.width >= 768) {
    flag = true
  }
  return flag
}

const formatTime = (time, ss) => {
  if (!time) {
    return ''
  }
  let date = new Date(time)
  if (ss) {
    return date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日 ' + addZero(date.getHours()) + ':' + addZero(date.getMinutes()) + ':' + addZero(date.getSeconds())
  }
  return date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日 '
}

function addZero (num) {
  return num < 10 ? '0' + num : '' + num
}
// 防抖
function debounce(method,delay) {
  let timer = null;
  return function () {
      let self = this,
          args = arguments;
      timer && clearTimeout(timer);
      timer = setTimeout(function () {
          method.apply(self,args);
      },delay);
  }
}

function scrollAnimation(currentY, targetY) {
  let needScrollTop = targetY - currentY
  let _currentY = currentY
  setTimeout(() => {
    const dist = Math.ceil(needScrollTop / 10)
    _currentY += dist
    window.scrollTo(_currentY, currentY)
    if (needScrollTop > 10 || needScrollTop < -10) {
      scrollAnimation(_currentY, targetY)
    } else {
      window.scrollTo(_currentY, targetY)
    }
  }, 1)
}

const numToMonth = function (code) {
  switch (code) {
    case '01月': return '壹月';
    case '02月': return '贰月';
    case '03月': return '叁月';
    case '04月': return '肆月';
    case '05月': return '伍月';
    case '06月': return '陆月';
    case '07月': return '柒月';
    case '08月': return '捌月';
    case '09月': return '玖月';
    case '10月': return '拾月';
    case '11月': return '拾一月';
    case '12月': return '拾二月';
  }
}

export {
  IsPC,
  formatTime,
  debounce,
  scrollAnimation,
  numToMonth
}
