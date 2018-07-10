import React, { Component } from 'react';

import '../../assets/styles/usecontract.less';

export default class ReAgreement extends Component {
  render() {
    return (
      <div className="contract">
        <h5>回购协议</h5>
        <p className="conNum">协议编号：</p>
        <p>甲方：（客户）</p>
        <p className="mgt20">地址：</p>
        <p>乙方：（商户）</p>
        <p className="mgt20">地址：</p>
        <p>丙方：（回购公司）</p>
        <p className="mgt20">地址：</p>
        <p>特别提示：</p>
        <p className="mgt20">
          请认真阅读本协议项下的全部条款。一旦签订本协议，即视为已理解并同意本协议的所有条款。本协议双方根据有关法律、法规，在平等、自愿的基础上，为明确责任、恪守信用，经充分协商一致签订本协议，并保证共同遵守执行。
        </p>
        <p>回购基本情况表：</p>

        <table className="reAge-table mgt20">
          <tbody>
            <tr>
              <td rowSpan="3" className="td1" style={{ width: '50px', textAlign: 'center' }}>
                <p>客户填写</p>
              </td>
              <td className="td1" colSpan="2">
                <p>收款人名称：</p>
              </td>
              <td className="td1" colSpan="4">
                <p>联系电话：</p>
              </td>
            </tr>
            <tr>
              <td className="td1" colSpan="2">
                <p>证件类型：</p>
              </td>
              <td className="td1" colSpan="4">
                <p>证件号码：</p>
              </td>
            </tr>
            <tr>
              <td colSpan="2" className="td1" style={{ height: '80px' }}>
                <p>收款方式：</p>
              </td>
              <td colSpan="5" className="td1">
                <p>收款账号：</p>
              </td>
            </tr>
            {/*<tr>*/}
            {/*<td className="td1"></td>*/}
            {/*<td className="td1"></td>*/}
            {/*</tr>*/}
            <tr>
              <td className="td1" rowSpan="2" style={{ width: '50px', textAlign: 'center' }}>
                <p>回购公司填写</p>
              </td>
              <td className="td1">
                <p>产品名称</p>
              </td>
              <td className="td1">
                <p>数量（单位）</p>
              </td>
              <td className="td1">
                <p>单价</p>
              </td>
              <td className="td1" colSpan="2">
                <p>回购金额</p>
              </td>
              <td className="td1" colSpan="2">
                <p>回购服务费</p>
              </td>
            </tr>
            {/*<tr>*/}
            {/*<td className="td1">*/}
            {/*</td>*/}
            {/*<td className="td1">*/}
            {/*</td>*/}
            {/*<td className="td1">*/}
            {/*</td>*/}
            {/*<td className="td1" colSpan='2'>*/}
            {/*</td>*/}
            {/*<td className="td1" colSpan='2'>*/}
            {/*</td>*/}
            {/*</tr>*/}
            {/*<tr>*/}
            {/*<td className="td1">*/}
            {/*</td>*/}
            {/*<td className="td1">*/}
            {/*</td>*/}
            {/*<td className="td1">*/}
            {/*</td>*/}
            {/*<td className="td1" colSpan='2'>*/}
            {/*</td>*/}
            {/*<td className="td1" colSpan='2'>*/}
            {/*</td>*/}
            {/*</tr>*/}

            <tr style={{ height: '250px' }}>
              <td className="td1" />
              <td className="td1" />
              <td className="td1" />
              <td className="td1" colSpan="2" />
              <td className="td1" colSpan="2" />
            </tr>
            {/*<tr>*/}
            {/*<td className="td1" rowSpan="2">*/}
            {/*<p>总金额（大写）</p>*/}
            {/*</td>*/}
            {/*<td className="td1" rowSpan="2">*/}
            {/*</td>*/}
            {/*<td className="td1">*/}
            {/*<p>万</p>*/}
            {/*</td>*/}
            {/*<td className="td1">*/}
            {/*<p>千</p>*/}
            {/*</td>*/}
            {/*<td className="td1">*/}
            {/*<p>百</p>*/}
            {/*</td>*/}
            {/*<td className="td1">*/}
            {/*<p>十</p>*/}
            {/*</td>*/}
            {/*<td className="td1">*/}
            {/*<p>个</p>*/}
            {/*</td>*/}
            {/*</tr>*/}
            {/*<tr>*/}

            {/*<td className="td1">*/}

            {/*</td>*/}
            {/*<td className="td1">*/}

            {/*</td>*/}
            {/*<td className="td1">*/}
            {/*</td>*/}
            {/*<td className="td1">*/}
            {/*</td>*/}
            {/*<td className="td1">*/}
            {/*</td>*/}
            {/*</tr>*/}
            {/*<tr>*/}
            {/*<td className="td1">*/}
            {/*<p>付款人</p>*/}
            {/*</td>*/}
            {/*<td className="td1">*/}
            {/*</td>*/}
            {/*<td className="td1" colSpan="2">*/}
            {/*<p>开户银行</p>*/}
            {/*</td>*/}
            {/*<td className="td1" colSpan="3">*/}
            {/*</td>*/}
            {/*</tr>*/}
            {/*<tr>*/}
            {/*<td className="td1">*/}
            {/*<p>银行账号</p>*/}
            {/*</td>*/}
            {/*<td className="td1" colSpan="6">*/}
            {/*</td>*/}
            {/*</tr>*/}
            <tr>
              <td style={{ height: '250px', width: '50px', textAlign: 'center' }} className="td1">
                <p>客户签字</p>
              </td>
              <td className="td1" colSpan="7">
                <p>
                  本人同意按《回购协议》的规定，以及确认的回购数量、回购单价、回购服务费等由回购公司回购本人的产品。
                </p>
                <p>特此确认。</p>
                <p style={{ textAlign: 'right', marginTop: '35px', paddingRight: '15px' }}>
                  客户签字
                </p>
                <p style={{ textAlign: 'right', paddingRight: '15px' }}>年 月 日</p>
              </td>
            </tr>
            <tr>
              <td style={{ height: '250px', width: '50px', textAlign: 'center' }} className="td1">
                <p>回购公司签字</p>
              </td>
              <td className="td1" colSpan="7">
                <p>本公司同意按本回购协议回购并结算付款。</p>
                <p style={{ textAlign: 'right', marginTop: '105px', paddingRight: '65px' }}>
                  公司签字（盖章）：
                </p>
                <p style={{ textAlign: 'right', paddingRight: '15px' }}>年 月 日</p>
              </td>
            </tr>
          </tbody>
        </table>
        <p>一、甲、乙、丙三方的解释</p>
        <p>
          1.甲方为本协议项下的商品购买方及申请商品回购方。同时委托乙方为甲方寻找商品回购方并提供回购服务。
        </p>
        <p>
          2.乙方为北京榆钱投资管理有限公司合作商户，为甲方提供所购买的商品。乙方接受甲方的委托，为甲方寻找商品回购方并提供回购服务。
        </p>
        <p className="mgt20">3.丙方为依法设立的公司，为甲方提供商品回购服务。</p>
        <p>二、双方声明</p>
        <p>1.甲方向乙方作如下声明：</p>
        <p>
          （1）甲方必须具备从事交易主体资格、符合国家法律、法规的具有完全民事能力，不存在法律、法规禁止或限制其交易的情况。
        </p>
        <p>（2）甲方向乙方提供的所有证件、资料均真实、有效、合法。</p>
        <p>（3）甲方同意遵守本协议约定及有关的法律、法规、规章。</p>
        <p>2.乙方向甲方作如下声明：</p>
        <p>（1）乙方是一家依法在国家工商行政管理局登记注册的合法公司。</p>
        <p>（2）乙方遵守有关的法律、法规、规章。</p>
        <p className="mgt20">
          （3）乙方对甲方的个人资料、交易记录等资料负有保密义务，非经法定有权机关或甲方指示，不得向第三人透漏。
        </p>
        <p>三、回购交易结构</p>
        <p>
          1.甲方在北京榆钱投资管理有限公司运营的“周转王”平台提交的商品购买申请通过后，委托乙方为甲方寻找回购公司。
        </p>
        <p>2.乙方接受甲方的委托，为甲方寻找丙方进行商品回购，并进行信息撮合服务。</p>
        <p>3.甲、乙、丙三方签订回购协议。</p>
        <p>4.甲方授权乙方将商品直接发货至丙方。</p>
        <p>5.丙方接收验货。</p>
        <p className="mgt20">6.丙方向甲方打款。</p>
        <p>四、回购地点及回购期限</p>
        <p>1.回购地点为丙公司提供的收货地址。</p>
        <p className="mgt20">
          2.回购期限：回购期限为5天，在回购期限内，如甲方需要丙方回购，甲方需提前3个工作日委托乙方以书面形式通知丙方，并在回购期限内将回购商品交付丙方。超过回购期限，乙方未提出书面申请或未将回购商品交付丙方，视为甲方自动放弃该商品被回购的权利。
        </p>
        <p>五、验货方式及时间</p>
        <p>
          1.商品快递签收后，由丙方检测商品的完整性（包括但不限于包装完整、产品完整、产品信息完整、产品规格、产品新能等），确认无误后签入库并记录。
        </p>
        <p>2.自商品快递签收日期3个工作日内，完成验货过程。</p>
        <p className="mgt20">
          3.由丙方检测商品存在不完整性或已损坏（包括但不限于包装完整、产品完整、产品信息完整、产品规格、产品性能等），均不签收商品，并以快递地址原路返回，快递费用由甲方承担。
        </p>
        <p>六、回购费用及计算方式</p>
        <p className="mgt20">1.回购商品的快递费用由甲方承担。</p>
        <p>2.回购服务费：</p>
        <p className="mgt20">回购服务费=回购价格*___%</p>
        <p>七、回购款打款方式</p>
        <p>1.回购商品审核通过后，丙方会将验收合格凭证发送至乙方，由乙方负责将信息传递于甲方。</p>
        <p>2.丙方以银行划款或第三方转账的方式，将款划至甲方指定的收款账户。</p>
        <p>账户名：</p>
        <p>账号：</p>
        <p>开户行：</p>
        <p>3.丙方一旦将款划至甲方指定的收款账户，则视为甲方已收到款项。</p>
        <p>
          4.因打款第三方(包括但不限于黑客攻击、网络供应商技术调整或故障、网站升级、银行方面的问题等)或不可抗力因素导致款项到账时间延迟、款项显示未到账等情况，丙方不承担任何责任。
        </p>
        <p>5.不可抗力因素包括但不限于如下情况：</p>
        <p className="mgt20">因台风、地震、海啸、洪水、停电、战争、恐怖袭击等。</p>
        <p>八、违约责任</p>
        <p>
          1.甲方承诺就本协议项下所提供的所有资料的准确性、真实性等，如因资料虚假所产生的一切费用（包括但不限于公证费、诉讼费、财产保全费、执行费、仲裁费、律师代理费、差旅费、评估费、拍卖费等）。
        </p>
        <p className="mgt20">
          2.甲方承诺本协议一旦签署，证明您已经理解并接受本协议的全部条款，并承诺遵守中国现行的法律、法规、规章及其他政府规定，如有违反而导致任何法律后果的发生，您将以自己的名义独立承担所有相应的法律责任。
        </p>
        <p>九、争议解决方式</p>
        <p className="mgt20">
          本协议适用中华人民共和国法律，因本协议发生争议，由双方协商解决，协商不成，甲、乙、丙三方均同意提<span
            style={{ color: 'red' }}
          >
            请珠海仲裁委员会
          </span>，按照珠海仲裁委员会互联网金融仲裁规则仲裁；如该规则尚未实施,则适用《珠海仲裁委员会仲裁规则》,以简易程序,书面审理，答辩期为被申请人收到仲裁通知之日起5日内，各方同意由仲裁委员会主任在案件受理后指定一名仲裁员组成仲裁庭，仲裁庭有权按照适当的方式快捷地进行仲裁程序，且具体程序和期限不受仲裁规则其他条款限制。仲裁裁决是终局的，对各方当事人均有约束力。
        </p>
        <p>十、法律文书送达地址确认</p>
        <p>
          对于因本协议争议引起的任何纠纷甲方声明珠海仲裁委员会可以以手机短信或电子邮件等现代通讯方式或邮寄方式向甲方送达法律文书（包括但不限于仲裁通知文书）。甲方同意将电子邮件作为送达地址，或按以下通讯联系地址作为接收仲裁案件法律文书的送达地址，法律文书一经发送或邮寄即视为有效送达。
        </p>
        <p>甲方电子邮箱件：</p>
        <p>甲方地址：</p>
        <p>甲方联系手机号：</p>
        <p>十一、附则</p>
        <p>
          1.本协议取代甲、乙双方在本协议签订之前作出的一切书面的口头的有关合同、约定、承诺、保证、陈述与说明，但甲方为同丙方订立本协议而在本协议签订之前向丙方提供的申请、承诺、保证、陈述与说明对甲仍有约束力。
        </p>
        <p>
          2.本协议与甲方在周转王上注册时同意的“借款合同”共同构成了双方的合同内容，均具有相同的法律效力，如两者条款间有冲突，以有利于丙方的条款为准。
        </p>
        <p>3.除亲自签署本协议外，以下行为亦视为协议一方有效签署本协议：</p>
        <p>（1）协议一方通过网络（包括但不限于“惠分期”手机终端（APP））点击确认接受本协议；</p>
        <p>（2）本协议的文本签署或电子签署具有同等的法律效力。</p>
        <p>4.本合同自签署后即成立，至乙方的款项划至甲方指定账户时生效。</p>
        <p className="mgt20">（以下无正文）</p>
        <p className="mgt20">甲方签字：</p>
        <p className="mgt20">乙方签字：</p>
        <p className="mgt20">丙方签字：</p>
        <p className="mgt20">签署日期：</p>
      </div>
    );
  }
}
