document.cookie = 'client=yes; path=/'

/**
 * 携带cookie
 * server\server_demo\express_server.js tcp post
 *
 *
 * 前端 withCredentials: true,
 * 后端 Access-Control-Allow-Origin=请求站 Access-Control-Allow-Credentials=true
 *
 * 跨站cookie https sameSite=None secure=true
 *
 * 跨域cookie 相对简单
 */

fetch('https://server.com/tcp', { credentials: 'include' })
  .then((res) => {
    return res.json()
  })
  .then((res) => {
    setTimeout(() => {
      fetch(`https://server.com/post?last=${res.data}`, { credentials: 'include' })
    }, 1000)
  })
