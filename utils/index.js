/**
 * JSONP 请求
 * @param {String} url
 * @param {Object} data param
 * @param {Function} cb callback
 */
function jsonp(url, data, cb) {
  if (!data || !cb) return "data or callback is empty";

  const cbName = "_jp" + new Date().getTime();
  const target = document.getElementsByTagName("script")[0] || document.head;
  let script = null;

  function cleanup() {
    if (script.parentNode) script.parentNode.removeChild(script);
    window[cbName] = null;
  }

  try {
    let param = "";
    Object.keys(data).forEach(e => {
      param += `${param ? "&" + e : "?" + e}=${data[e]}`;
    });

    window[cbName] = function (data) {
      cleanup();
      cb({ success: true, data });
    };

    // add qs component
    url += `${param}&callback=${encodeURIComponent(cbName)}`;

    // create script
    script = document.createElement("script");
    script.src = url;
    target.parentNode.insertBefore(script, target);
  } catch (error) {
    cb({ success: false, error });
  }
}


const setParamsOnUrl = (obj, url) => {
  const keys = Object.keys(obj);

  keys.forEach((ele, ind) => {
    if (ind === 0) {
      url += `?${ele}=${obj[ele] || ''}`;
    } else {
      url += `&${ele}=${obj[ele] || ''}`;
    }
  });

  return url;
};

export default jsonp;

