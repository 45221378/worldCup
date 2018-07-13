import React, { Component } from 'react';
import cache from '../../utils/cache';
import copy from 'copy-to-clipboard';

export default class DownloadStep extends Component {
  download = () => {
    window.location.href = "https://c1.hfenq.cn/zzw_iosdownload/";
    // window.location.href ='itms-services://?action=download-manifest&url=https://cdn.hfenq.cn/app/ios/s.plist';
  };

  oneKeyCopy = () => {
    // console.log(window.location.href);
    copy(window.location.href); //'我是要复制的内容'
    // alert('成功复制到剪贴板');
  };

  tpCount(event) {
    const channel = cache.getItem('channel');
    try {
      window.MtaH5.clickStat(event.target.id, { promo: channel });
    } catch (error) {
      // console.log(error);
    }
    try {
      window._hmt.push(['_trackEvent', channel, event.target.id, 'click']);
    } catch (error) {
      // console.log(error);
    }
  }

  render() {
    return (
      <div className="step">
        <img src={require('../../assets/images/step.png')} alt="" />
        <a
          href="itms-services://?action=download-manifest&url=https://cdn.hfenq.cn/app/ios/s.plist"
          id="extension_iosDownloadStep2"
          className="clickArea"
          onClick={event => {
            // this.download();
            // this.oneKeyCopy();
            this.tpCount.bind(this)(event);
          }}
        >
          点击安装
        </a>
      </div>
    );
  }
}
