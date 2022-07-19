/**
 * JSONP handler
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

export default jsonp;

// https://apis.map.qq.comlocation=30.4755461,114.4157029&key=3E3BZ-2P53U-SBWVA-BZCJM-VWBXH-K5B3M&output=jsonp=__jp
