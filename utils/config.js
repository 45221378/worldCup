import qs from 'qs';
let baseURL, webURL;
const { search, protocol } = window.location;
// switch (process.env.API_ENV) {
//   case 'dev':
//     //开发环境
//     baseURL = `${protocol}//192.168.23.151:8080/hxj_srv`;
//     break;
//   case 'test':
//     baseURL = `${protocol}//`;
//     break;
//   case 'uat':
//     baseURL = `${protocol}//`;
//     break;
//   default:
//     baseURL = `${protocol}//`;
// }

if (protocol === 'http:') {
  switch (process.env.API_ENV) {
    case 'dev':
      //开发环境
      baseURL = 'http://www.1v1.one:9191/hxj_srv/';
      // baseURL = `http://192.168.23.126/hxj_srv/`;
      webURL = 'http://192.168.23.60:8000/';
      break;
    case 'test':
      baseURL = 'http://www.1v1.one:9191/hxj_srv/';
      webURL = 'http://www.1v1.one:9907/zhouzhuanking/';
      break;
    case 'uat':
      baseURL = 'http://www.1v1.one:1839/hxj_srv/';
      webURL = 'http://www.1v1.one:1833/zhouzhuanking/';
      break;
    default:
      baseURL = 'http://c.hfenq.cn/hxj_srv/';
      webURL = 'http://c1.hfenq.cn/zhouzhuanking/';
      break;
  }
} else {
  switch (process.env.API_ENV) {
    case 'test':
      baseURL = 'https://www.1v1.one:1443/hxj_srv/';
      webURL = 'https://www.1v1.one:1443/zhouzhuanking/';
      break;
    case 'uat':
      baseURL = 'https://www.1v1.one:1823/hxj_srv/';
      webURL = 'https://www.1v1.one:1823/zhouzhuanking/';
      break;
    default:
      baseURL = 'https://c.hfenq.cn/hxj_srv/';
      webURL = 'https://c1.hfenq.cn/zhouzhuanking/';
      break;
  }
}

let searchObj = {};
if (search.length > 0) {
  searchObj = qs.parse(search.slice(1));
}
// const imgUrl = baseURL;
// export default baseURL;
export default baseURL;
export { searchObj, webURL };
