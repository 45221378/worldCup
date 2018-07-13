import React, { Component } from 'react';
import { connect } from 'dva';
import { reduxForm, Field } from 'redux-form';
import { withRouter } from 'dva/router';
import validate from '../../utils/validate';
import { Toast } from 'antd-mobile';
import LoginSuccessHint from './loginSuccessHint';
import ajax2 from '../../utils/ajax2';

const baseInfoFormValidate = validate({
  validateType: {
    mobile: 'm',
    code: 'msgcode',
  },
  nullTip: {
    mobile: '请输入手机号',
    code: '请输入短信验证码',
  },
  errorTip: {
    m: '手机号格式不正确',
    msgcode: '短信验证码不正确',
  },
});

@withRouter
@reduxForm({
  form: 'login',
  persistentSubmitErrors: true,
  initialValues: {
    mobile: '',
    code: '',
  },
  validate: baseInfoFormValidate,
  warn: values => {
    let warn = {},
      error = baseInfoFormValidate(values);
    if (error.mobile) {
      warn._warning = error.mobile;
    }
    return warn;
  },
})
@connect(state => ({
  showBgImg: state.showBgImg,
  showLogin: state.showLogin,
  telephone: state.mobile.telephone,
  capCodeSrc: state.mobile.capCodeSrc,
  text: state.cutdown.text,
  count: state.cutdown.count,
  disabled: state.cutdown.disabled,
}))
export default class ExtensionInner extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      word1: '',
      word2: '',
      pTips: '',
      invitePhone: props.match.params.invitePhone,
      shareChannel: props.match.params.shareChannel,
    };
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }
  componentDidMount = () => {
    this.setHintWord();
  };

  // 点击获取短信验证码
  before = () => {
    const { dispatch, count } = this.props;
    dispatch({
      type: 'cutdown/count',
      payload: {
        disabled: true,
        text: '发送中...',
        count,
      },
    });
  };
  start = () => {
    const { count, dispatch } = this.props;
    dispatch({
      type: 'cutdown/count',
      payload: {
        text: `${count}s`,
        disabled: true,
        count,
      },
    });
    this.timer = setInterval(() => {
      let { count } = this.props;
      if (count--) {
        dispatch({
          type: 'cutdown/count',
          payload: {
            text: `${count}s`,
            disabled: true,
            count,
          },
        });
      } else {
        this.reset();
      }
    }, 1000);
  };
  reset = () => {
    if (this.timer) {
      clearInterval(this.timer);
    }
    const { dispatch } = this.props;
    dispatch({
      type: 'cutdown/count',
      payload: {
        text: '重新获取',
        disabled: false,
        count: 60,
      },
    });
  };
  getSmsCode = e => {
    e.preventDefault();
    const { warning, dispatch } = this.props;
    const mobile = this.refs.mobile.value;
    if (warning) {
      Toast.info(warning);
    } else {
      this.before();
      dispatch({
        type: 'mobile/save',
        payload: {
          telephone: mobile,
        },
      });

      ajax2
        .post('customer/sms_h5_v2', {
          mobile,
          type: 1,
        })
        .then(data => {
          if (data.openCap * 1 === 1 && data.sendSms * 1 === 0) {
            //需要图形验证码
            dispatch({
              type: 'showBgImg/save',
              payload: 'block',
            });

            this.refs.code.value = '';
          } else {
            // console.log('直接发送短信验证码倒计时');
            this.start();
          }
        })
        .catch(head => {
          this.reset();
        });
    }
  };

  submitForm = values => {
    const { invitePhone, shareChannel } = this.state;
    const { error, dispatch } = this.props;
    const capCode = this.refs.imgCode.value;
    if (error) {
      Toast.info(error);
    } else {
      values = Object.assign(values, {
        capCode: capCode,
        invitePhone: invitePhone,
        shareChannel: shareChannel,
        // promo: channel,
        appSource: 'zzw',
      });

      ajax2.post('customer/pre_reg', values).then(data => {
        // dispatch(showLogin('block'));
        dispatch({
          type: 'showLogin/save',
          payload: 'block',
        });
        this.reset();
        if (data.custType * 1 === 1) {
          // dispatch(showLogin('block'));
          this.setHintWord(false);
        } else {
          this.setHintWord(true);
        }
      });
    }
  };

  //图形验证码逻辑
  getImg = event => {
    const { dispatch } = this.props;
    const mobile = this.refs.mobile.value;
    dispatch({
      type: 'mobile/save',
      payload: {
        telephone: mobile,
      },
    });
    this.refs.imgCode.value = '';
  };

  closeImgCode = e => {
    const { dispatch } = this.props;
    e.preventDefault();
    dispatch({
      type: 'showBgImg/save',
      payload: 'none',
    });
    this.setState({
      pTips: '',
      capCode: '',
    });
    dispatch({
      type: 'cutdown/count',
      payload: {
        text: '重新获取',
        disabled: false,
        count: 60,
      },
    });
  };

  sbumitImg = () => {
    const { dispatch, telephone } = this.props;
    const capCode = this.refs.imgCode.value;
    if (capCode !== '') {
      ajax2
        .post('customer/checkImgCode', {
          capCode: capCode,
          mobile: telephone,
          appSource: 'zzw',
        })
        .then(data => {
          if (data.custType * 1 === 2) {
            //已经注册过的用户
            this.refs.imgCode.value = '';
            dispatch({
              type: 'showBgImg/save',
              payload: 'none',
            });
            dispatch({
              type: 'showLogin/save',
              payload: 'block',
            });
            this.reset();
            this.setHintWord(true);
          } else {
            //发送短线验证码接口；
            // console.log('进行短信验证码倒计时。');
            this.start();
            dispatch({
              type: 'showBgImg/save',
              payload: 'none',
            });
            this.setState({
              pTips: '',
              capCode: '',
            });
          }
        })
        .catch(({ msg = '' }) => {
          // console.log(headData);
          this.setState({
            pTips: msg,
          });
          this.getImg();
        });
    } else {
      this.setState({
        pTips: '请输入图形验证码',
      });
    }
  };

  setHintWord = registerFlag => {
    let word1, word2;
    if (registerFlag) {
      word1 = '您已经注册过了,';
      word2 = '直接去【周转王】拿钱吧！';
    } else {
      word1 = '高通过率，想借就借';
      word2 = '';
    }
    this.setState({
      word1: word1,
      word2: word2,
    });
  };

  tpCount(event) {
    // const { channel } = this.state;

    try {
      window.MtaH5.clickStat(event.target.id);
    } catch (error) {
      // console.log(error)
    }
    try {
      window._hmt.push(['_trackEvent', '', event.target.id, 'click']);
    } catch (error) {
      // console.log(error)
    }
  }
  render() {
    // console.log(this.state)
    const { word1, word2, pTips } = this.state;
    const { handleSubmit, showBgImg, text, capCodeSrc, disabled } = this.props;
    // console.log(word1, word2)
    return (
      <section>
        <div className="login">
          <div className="pic-bg">
            {/* <Form setHintWord={this.setHintWord} /> */}
            <form className="login-form extension-form clearfix validForm">
              <label>
                <Field
                  id="extensionInner_phone"
                  ref="mobile"
                  component="input"
                  className="login-account"
                  type="tel"
                  placeholder="请输入手机号"
                  name="mobile"
                  maxLength="11"
                  onChange={this.accountChange}
                  onClick={this.tpCount.bind(this)}
                />
              </label>
              <label>
                <Field
                  id="extensionInner_msg"
                  ref="code"
                  component="input"
                  className="msg-input"
                  type="tel"
                  placeholder="请输入短信验证码"
                  name="code"
                  maxLength="6"
                  onClick={this.tpCount.bind(this)}
                />
                {/*<VerifyCodeBtn ref="smsbtn" className="login-btn" onClick={this.getSmsCode}/>*/}
                <button
                  id="extensionInner_msgBtn"
                  className="msg-btn"
                  type="button"
                  disabled={disabled}
                  onClick={event => {
                    this.getSmsCode(event);
                    this.tpCount.bind(this)(event);
                  }}
                >
                  {text}
                </button>
              </label>
              <button
                id="extensionInner_form_confirm"
                className="submit-btn"
                type="button"
                onClick={event => {
                  handleSubmit(this.submitForm)();
                  this.tpCount.bind(this)(event);
                }}
              >
                马上拿钱
              </button>
            </form>
          </div>
        </div>

        <LoginSuccessHint word1={word1} word2={word2} />

        <section className="commonhint" style={{ display: showBgImg }}>
          <section className="commonhint-small bounceInDown">
            <img
              className="commonhint-small-group"
              onClick={this.closeImgCode}
              src={require('../../assets/images/group.png')}
              alt=""
            />
            <h5 className="commonhint-small-h5">请输入图形验证码</h5>
            <form className="hint-form validform">
              <p className="p-tips">{pTips}</p>
              <label className="hint-form-label">
                <i className="iconfont icon-qrcode" />
                <input
                  id="extensionInner_imgCode"
                  ref="imgCode"
                  className="login-pwd"
                  type="text"
                  placeholder="请输入图形验证码"
                  maxLength="6"
                  onClick={this.tpCount.bind(this)}
                />
                <img onClick={this.getImg} src={capCodeSrc} alt="" />

                {/*{*/}
                {/*capCodeSrc && <img className="register2-form-imgcode" src={capCodeSrc}  id="getimgcode" onClick={this.getImg}/>*/}
                {/*}*/}
              </label>
              <button
                id="extensionInner_imgCode_confirm"
                type="button"
                onClick={event => {
                  this.sbumitImg();
                  this.tpCount.bind(this)(event);
                }}
              >
                确定
              </button>
            </form>
          </section>
        </section>
      </section>
    );
  }
}
