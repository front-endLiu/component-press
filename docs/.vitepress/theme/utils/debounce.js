// 防抖
export function debounce(fn, delay = 100) {
  let timer = null; // 记录上一次的延时器
  return function() {
    let args = arguments,
      that = this;
    // 清除上一次延时器
    clearTimeout(timer);
    timer = setTimeout(function() {
      fn.apply(that, args);
    }, delay);
  };
}
// 节流
export function throttle(fn, delay = 100) {
  let lastTime, timer;
  return function() {
    let args = arguments;
    // 记录当前函数触发的时间
    let nowTime = Date.now();
    if (lastTime && nowTime - lastTime < delay) {
      clearTimeout(timer);
      timer = setTimeout(function() {
        // 记录上一次函数触发的时间
        lastTime = nowTime;
        // 修正this指向问题
        fn.apply(this, args);
      }, delay);
    } else {
      lastTime = nowTime;
      fn.apply(this, args);
    }
  };
}
