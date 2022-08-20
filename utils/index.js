/**
 * JSONP 请求
 * @param {String} url
 * @param {Object} data param
 * @param {Function} cb callback
 */
export const jsonp = (url, data, cb) => {
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
};

/* 设置 get 参数 */
export const setParamsOnUrl = (obj, url) => {
  const keys = Object.keys(obj);

  keys.forEach((ele, ind) => {
    if (ind === 0) {
      url += `?${ele}=${obj[ele] || ""}`;
    } else {
      url += `&${ele}=${obj[ele] || ""}`;
    }
  });

  return url;
};

/* 获取 formData  */
export const getFormData = obj => {
  const formData = new FormData();
  const keys = Object.keys(obj);

  keys.forEach(e => {
    formData.append(e, obj[e]);
  });

  return formData;
};

export default jsonp;
