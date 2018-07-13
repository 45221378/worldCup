import { Component } from 'react';
// import { Link } from 'dva/router';
import { Button, Modal } from 'antd-mobile';
import { NoticeScroll } from '../../components';
import count from '../../utils/count';
import '../ActivityIndex/activityIndex.less';
export default class ShareIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      iosInWx: false,
    };
  }
  // showModal = () => {
  //   if (this.checkSource(/Android/)) {
  //     window.location.href = `http://a.app.qq.com/o/simple.jsp?pkgname=com.yuqian.zhouzhuanwang&v=${Date.now()}`;
  //   } else {
  //     if (this.checkSource(/MicroMessenger/)) {
  //       this.setState({
  //         iosInWx: true,
  //       });
  //     } else {
  //       const { history } = this.props;
  //       this.openApp();
  //       history.push('downloadStep');
  //     }
  //   }
  // };
  componentDidMount() {
    if (
      !this.checkSource(/micromessenger/) &&
      !this.checkSource(/qq/) &&
      !this.checkSource(/weibo/)
    ) {
      this.setState({
        modal: true,
      });
    }
  }

  showModal = (key = 'modal') => {
    if (this.checkSource(/android/)) {
      // window.location.href = `http://a.app.qq.com/o/simple.jsp?pkgname=com.yuqian.zhouzhuanwang&v=${Date.now()}`;
      this.openApp();
      this.setState({
        modal: true,
      });
    } else {
      if (this.checkSource(/micromessenger/)) {
        this.setState({
          // modal:true,
          iosInWx: true,
        });
      } else {
        // const {history} = this.props;
        this.openApp();
        this.setState({
          [key]: true,
        });
        // history.push('downloadStep');
      }
    }
  };
  onClose = (key = 'modal') => {
    this.setState({
      [key]: false,
    });
  };

  checkSource = source => {
    const ua = navigator.userAgent.toLocaleLowerCase();
    return source.test(ua) ? true : false;
  };
  closeInWx = () => {
    this.setState({
      modal: false,
      iosInWx: false,
    });
  };
  openApp = () => {
    // if (this.checkSource(/android/)){
    //   window.location.href = 'zzw://';
    // }else{
    //   window.location.href = 'https://cdn.hfenq.cn';
    // }
    window.location.href = 'zzw://';
  };

  goUpload = type => {
    if (type === 'andriod') {
      if (this.checkSource(/android/)) {
        if (this.checkSource(/micromessenger/)) {
          window.location.href = `http://a.app.qq.com/o/simple.jsp?pkgname=com.yuqian.zhouzhuanwang&v=${Date.now()}`;
        } else {
          //window.location.href = `https://cdn.hfenq.cn/app/android/zzwsjb.apk`;
          window.location.href = `http://cdn.hfenq.cn/apk/zzwsjb.apk`;
        }
        // window.location.href = `http://cdn.hfenq.cn/apk/zzwsjb.apk`;
      }
    } else {
      // if(this.checkSource(/MicroMessenger/)){
      //     this.setState({
      //         iosInWx:true
      //     })
      // }else{
      //     const {history} = this.props;
      //     history.push('downloadStep');
      // }
      const { history } = this.props;
      history.push('downloadStep');
    }
  };

  render() {
    const { modal, iosInWx } = this.state;
    return (
      <section className="activityIndex">
        {/* <p className="rule" >
          <Link to="/actDetail">
            活动规则<span />
          </Link>
        </p> */}
        <img className="banner-img" src={require('../../assets/images/footballman.png')} alt="" />
        <NoticeScroll />
        <div className="activityReward">
          <header className="activityReward-img" />
          <p>
            最高<strong>赢iphoneX、beats入耳式耳机</strong>
          </p>
          <p>更有随机红包狂送不止</p>
          <p>
            平台额外提供最高<strong>2000元借款额度</strong>
          </p>
          <p>
            和<strong>2000元减息奖励</strong>
          </p>
          <p>
            所有参与用户都有<strong>无门槛减息</strong>
          </p>
          <p>
            最高可<strong>减200元</strong>
          </p>
        </div>
        <div className="joinWay">
          <header className="joinWay-img" />
          <p>1、用户首次参与需要领取500初始积分，按照赛程进行积分投注，预测正确即可赚取2倍积分</p>
          <p>2、邀请好友来助力，双方都可获得30积分</p>
          <p>3、借款成功后可以获得1:1积分奖励（借款1000元奖励1000积分）</p>
        </div>
        <Button
          type="primary"
          className="shareBtn"
          onClick={() => {
            this.showModal('modal');
            count('zzw_sjb_fxcq_ljcy');
          }}
        >
          立即参与
        </Button>
        {iosInWx ? (
          <section className="shareModal-inWx">
            <img src={require('../../assets/images/iosInWx.png')} alt="" onClick={this.closeInWx} />
          </section>
        ) : (
          <Modal
            visible={modal}
            transparent
            maskClosable={false}
            className="shareModal"
            onClose={this.onClose.bind(this, 'modal')}
          >
            <section className="shareModal-notWx">
              <header>
                <i
                  className="iconfont icon-cross"
                  onClick={() => {
                    this.onClose('modal');
                    count('zzw_sjb_fxcq_ljcy_tc_gb');
                  }}
                />
                10000元奖品给你拿！
              </header>
              <p className="shareModal-word">您还未安装周转王，请先下载并安装</p>
              <footer>
                <Button
                  type="primary"
                  onClick={() => {
                    count('zzw_sjb_fxcq_ljcy_tc_azxz');
                    this.goUpload('andriod');
                  }}
                >
                  <i className="iconfont icon-andriod" />安卓手机下载
                </Button>
                <Button
                  type="primary"
                  onClick={() => {
                    count('zzw_sjb_fxcq_ljcy_tc_iosxz');
                    this.goUpload('ios');
                  }}
                >
                  <i className="iconfont icon-ios" />苹果手机下载
                </Button>
              </footer>
            </section>
          </Modal>
        )}

        {/* <Button type="primary" className="shareBtn" onClick={this.showModal.bind(this, 'iosInWx')}>
          立即参加
        </Button>
        <Modal
          visible={iosInWx}
          transparent
          maskClosable={true}
          className="shareModal"
          onClose={this.onClose.bind(this, 'iosInWx')}
        >
          {
            iosInWx ?
            <section className="shareModal-inWx">
              <img
                src={require('../../assets/images/iosInWx.png')}
                alt=""
                onClick={this.closeInWx}
              />
            </section>
            :<section className="shareModal-notWx">
                <header>
                    <i className="iconfont icon-cross" onClick={this.onClose.bind(this,'iosInWx')}></i>
                    10000元奖品给你拿！
                </header>
                <p className="shareModal-word">您还未安装周转王，请先下载并安装</p>
                <footer>
                    <Button type="primary" onClick={this.goUpload.bind(this,'andriod')}><i className="iconfont icon-andriod"></i>安卓手机下载</Button>
                    <Button type="primary" onClick={this.goUpload.bind(this,'ios')}><i className="iconfont icon-ios"></i>苹果手机下载</Button>
                </footer>
            </section>
          }
        </Modal> */}
      </section>
    );
  }
}
