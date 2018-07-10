import { Component } from 'react';
import './betSuc.less';
import appFun from '../../utils/appFun';
import count from '../../utils/count';
export default class BetSuc extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <section className="betSuc">
        <header>竞猜提交成功！</header>
        <footer>
          <p>您还可以</p>
          <img
            src={require('../../assets/images/betSuc2.png')}
            alt="申请借款"
            onClick={() => {
              count('zzw_sjb_jcwc_sqhy');
              appFun('jumpToLoan');
            }}
          />
          <img
            src={require('../../assets/images/betSuc1.png')}
            alt="邀请好友"
            onClick={() => {
              count('zzw_sjb_jcwc_yqhy');
              this.props.history.push('/myInvite');
            }}
          />
        </footer>
      </section>
    );
  }
}
