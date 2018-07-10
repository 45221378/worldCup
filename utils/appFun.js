import { Toast } from 'antd-mobile';
import { basename } from '../index.js';
export default function appFun(name, params = {}) {
  const ua = navigator.userAgent,
    isAndroid = ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1;
  if (name === 'share') {
    let title = params.pageUrl === 'main' ? '世界杯狂欢季，岂能无礼！' : '迎战排行榜  玩转世界杯';
    let content =
      params.pageUrl === 'main'
        ? '呼朋唤友来竞猜，一大波世界杯超值壕礼来袭，速抢！'
        : '送你500积分，参与世界杯竞赛，疯狂抢iphone！';
    let shareId = params.pageUrl === 'main' ? '1' : '2'; // '1' 邀请好友  '2'世界杯分享
    params.pageUrl = `${window.location.origin}${basename}/${params.pageUrl}`;
    Object.assign(params, {
      title,
      content,
      iconUrl: '',
      shareId,
    });
  }

  try {
    if (isAndroid) {
      name === 'share'
        ? window.android.share(
            params.pageUrl,
            params.title,
            params.content,
            params.iconUrl,
            params.shareId
          )
        : window.android[name]();
    } else {
      window.webkit.messageHandlers[name].postMessage(params);
    }
  } catch (e) {
    Toast.info('请在周转王APP里打开');
  }
}
