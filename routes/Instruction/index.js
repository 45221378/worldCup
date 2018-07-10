import React, { Component } from 'react';
import qs from 'qs';
// import { render } from 'react-dom';
import { webURL } from '../../utils/config';
import './instruction.less';
export default class Instruction extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      btnFlag: 'block',
    };
  }

  click = () => {
    window.location.href = webURL + 'instruction?jumpId=position';
    // window.location.href = 'http://192.168.23.177:3000/instruction?jumpId=position';
  };
  download = () => {
    window.location.href = 'https://c1.hfenq.cn/zzw_iosdownload/';
  };
  componentDidMount() {
    let obj = qs.parse(window.location.search.slice(1)) || {};

    if (obj.jumpId) {
      this.setState({
        btnFlag: 'none',
      });
      let a = document.createElement('a');
      a.href = '#' + obj.jumpId;

      a.click();
    }
  }
  render() {
    const { btnFlag } = this.state;
    return (
      <section className="instruction">
        <div className="content">
          <header>
            <img src={require('../../assets/images/instruction-header.png')} alt="" />
          </header>
          <div className="text">
            <h2 className="title">
              <img src={require('../../assets/images/title.png')} alt="" />
            </h2>
            <p>1.所填写资料信息需保证真实有效，毕竟行走江湖，最讲究的还是童叟无欺。</p>
            <p>
              2.及时清理联系人名单，物以类聚、人以群分，若少侠所结识均为好信誉豪杰，周转王必然多信任几分。
            </p>
            <p>
              3.注意申请时间，尽可能选在一般工作时间。周转王毕竟肉体凡胎，困乏时难免怠慢一二。以上，少侠不妨立即牛刀小试一番。
            </p>

            <div className="position" id="position">
              <p>
                您在使用“<span>周转王</span>”时，可能会遇到无法打开APP的情况，别着急，按照以下步骤操作，继续安心使用“<span
                >
                  周转王
                </span>”APP：
              </p>
              <p>
                1.删除原来的“<span>周转王</span>”APP；
              </p>
              <p>
                2.重新下载APP，<i onClick={this.download}>点我下载</i>；
              </p>
              <p>
                3.再次在手机设置中信任“<span>周转王</span>”APP
              </p>
            </div>
          </div>
          <footer>
            <img src={require('../../assets/images/footer.png')} alt="" />
          </footer>
        </div>
        <div style={{ display: btnFlag }} className="btn" onClick={this.click}>
          将本页保存至手机主屏幕可提高通过率
        </div>
      </section>
    );
  }
}
