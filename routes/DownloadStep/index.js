import React, { Component } from 'react';
import cache from '../../utils/cache';

export default class DownloadStep extends Component {
  download = () => {
    // window.location.href = "https://c1.hfenq.cn/zzw_iosdownload/";
    window.location.href =
      'itms-services://?action=download-manifest&url=https://cdn.hfenq.cn/app/ios/s.plist';
  };

  tpCount(event) {
    const channel = cache.getItem('channel');

    try {
      window.MtaH5.clickStat(event.target.id, { promo: channel });
    } catch (error) {
      console.log(error);
    }
    try {
      window._hmt.push(['_trackEvent', channel, event.target.id, 'click']);
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div className="step">
        <img src={require('../../assets/images/step.png')} alt="" />
        {/* <div
          id="extension_iosDownloadStep2"
          className="clickArea"
          onClick={event => {
            this.download();
            this.tpCount.bind(this)(event);
          }}
        >
          点击安装
        </div> */}
        <a id="extension_iosDownloadStep2" target="_blank" onClick={event => {
            this.tpCount.bind(this)(event);
          }}
          className="clickArea" href="itms-services://?action=download-manifest&url=https://cdn.hfenq.cn/app/ios/s.plist">点击安装</a>
      </div>
    );
  }
}
