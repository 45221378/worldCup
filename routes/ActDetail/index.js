import { Component } from 'react';
import '../ActivityIndex/activityIndex.less';
export default class ActDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <article className="activityIndex">
        <img className="banner-img" src={require('../../assets/images/footballman.png')} alt="" />
        <section className="actDetail">
          <header className="pb40">
            <p className="actDetail-word">
              每个用户初始积分500分，按照赛程进行积分投注，根据比赛结果和投注结果比对给出相应积分增减结果并排名，同时用户也可通过邀请好友和借款的方式增加积分，最终按照积分、邀请好友和借款金额由大致小排名进行开奖（若积分相同，则通过借款金额大小进行排名，若借款金额大小也相同，则按照注册时间进行排名）
            </p>
          </header>
          <section className="pb40">
            <h3 className="actDetail-tit actDetail-score">
              <span>世界杯竞猜积分规则</span>
            </h3>
            <p className="actDetail-word pb20">
              <strong>◆小组赛出线：</strong>
              用户需在世界杯小组赛开始前自行选择竞猜场次，用户正确选出两只出线球队才算竞猜正确，每次竞猜消耗40积分，竞猜正确返还80积分；竞猜错误不返还；
            </p>
            <p className="actDetail-word pb20">
              <strong>◆每日小组赛胜、平、负竞猜：</strong>
              每天小组赛开始前，对当天小组赛的胜、平、负进行竞猜，可自行选择参与场次；每场竞猜消耗50积分。竞猜正确返还100积分；竞猜错误不返还；
            </p>
            <p className="actDetail-word pb20">
              <strong>◆淘汰赛输赢竞猜：</strong>
              1、该阶段淘汰赛分为16进8、8进4、4进2及冠亚军争夺赛共计15场。用户自行选择参与竞猜和竞猜消耗的积分，每场竞猜消耗积分上不设限，最低10积分，以10叠加。<br />
              2、淘汰赛用户竞猜正确，返回2倍积分，（竞猜消耗了500分，竞猜正确将返回1000积分）竞猜错误不返还；
            </p>
          </section>
          <section className="pb40">
            <h3 className="actDetail-tit actDetail-invite">
              <span>壕友联盟 友奖一起赚活动规则</span>
            </h3>
            <p className="actDetail-word">
              1、用户邀请好友成功注册双方都可以获得30积分奖励<br />
              2、邀请人数无上限积分奖励无上限
            </p>
          </section>
          <section className="pb40">
            <h3 className="actDetail-tit actDetail-loan">
              <span>贷贷有积分 助力拿iPhone X活动规则</span>
            </h3>
            <p className="actDetail-word">
              1、活动期间通过周转王借款成功（审核通过即可）可以获得积分奖励<br />
              2、借款奖励积分按1:1派发（用户借款1000元奖励1000积分）
            </p>
          </section>

          <section>
            <h3 className="actDetail-tit actDetail-prize">
              <span>奖项及奖品</span>
            </h3>
            <div>
              <p className="actDetail-word">1、积分英雄榜（按照最终积分多少进行排名）</p>
              <table>
                <tbody>
                  <tr>
                    <th>名次</th>
                    <th>奖品</th>
                  </tr>
                  <tr>
                    <td>第1名</td>
                    <td>iPhoneX手机一部</td>
                  </tr>
                  <tr>
                    <td>第2-10名</td>
                    <td>999元beats入耳式耳机</td>
                  </tr>
                  <tr>
                    <td>第11-50名</td>
                    <td>50-200元的随机红包</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div>
              <p className="actDetail-word">2、桃园结义奖（按照活动期间邀请好友人数排名）</p>
              <table>
                <tbody>
                  <tr>
                    <th>名次</th>
                    <th>奖品</th>
                  </tr>
                  <tr>
                    <td>第1名</td>
                    <td>6折减息券一张</td>
                  </tr>
                  <tr>
                    <td>第2-10名</td>
                    <td>8折减息券一张</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div>
              <p className="actDetail-word">3、家财万贯奖（按照活动期间借款金额多少）</p>
              <table>
                <tbody>
                  <tr>
                    <th>名次</th>
                    <th>奖品</th>
                  </tr>
                  <tr>
                    <td>第1名</td>
                    <td>2000元提额券+8折减息券一张</td>
                  </tr>
                  <tr>
                    <td>第2-10名</td>
                    <td>1200元提额券+8折减息券一张</td>
                  </tr>
                  <tr>
                    <td>第11-20名</td>
                    <td>800元提额券+9折减息券一张</td>
                  </tr>
                  <tr>
                    <td>第21-50名</td>
                    <td>400元提额券+9折减息券一张</td>
                  </tr>
                  <tr>
                    <td>
                      阳光普照奖<br />(所有参与活动的用户 均可获得）
                    </td>
                    <td>
                      无门槛48元减息券一张<br />
                      2500-4400元获得100元减息券一张<br />
                      4500以上的获得200元减息券一张
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="pb40">
            <h3 className="actDetail-tit actDetail-prizeDetail">
              <span>奖品细则</span>
            </h3>
            <p className="actDetail-word">
              1、用户获得的优惠券有效期为90天，从到账之日起进行计算，逾期失效；<br />
              2、若积分相同，则通过借款金额大小进行排名，若借款金额大小也相同，则按照注册时间进行排名；{' '}
              <br />
              3、现金红包奖励在活动结束后需要用户添加“转转小助手”微信号统一发放； <br />
              4、获得的实物奖励在活动结束后的15个工作日内给中奖用户发送中奖短信，需要用户回复签收地址，如无回复会有客服与您取得联系，如用户在1周内无任何反馈，视为放弃奖励；
            </p>
          </section>
          <section className="pb40">
            <h3 className="actDetail-tit actDetail-prizeDetail">
              <span>注意事项</span>
            </h3>
            <p className="actDetail-word">
              1、用户获得的减息券、提额券可以通过“我的-我的卡券”查看；<br />
              2、活动期间发现严重违反及作弊行为，本平台有权取消其奖励； <br />
              3、本平台拥有在法律允许的范围内本活动的最终解释权；
            </p>
          </section>
        </section>
      </article>
    );
  }
}
