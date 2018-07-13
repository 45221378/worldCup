import React, { Component } from 'react';

import '../../assets/styles/usecontract.less';

export default class DelegaContract extends Component {
  render() {
    return (
      <div className="contract">
        <h5>授权委托协议</h5>
        <p>甲方（委托方）：</p>
        <p>身份证号码：</p>
        <p>地址：</p>
        <p>乙方（受托人）：</p>
        <p>统一社会信用代码：</p>
        <p>地址：</p>

        <p className="title">鉴 于</p>
        <p>
          甲方作为资金需求方通过乙方推荐向有投资需求的投资用户申请借款，经乙方推荐，甲方通过______提供的借款咨询服务，向相关资金提供方或通过相关借贷平台中的投资用户申请借款，并需签订《借款协议》，就授权委托事宜甲乙双方协商一致，具体约定如下：
        </p>
        <p>一、甲方委托乙方通过相关资金提供方或相关借贷平台中有投资需求的投资用户申请借款。</p>
        <p>二、甲方委托乙方申请借款的基本信息如下：</p>
        <table className="delega-table">
          <tbody>
            <tr>
              <td colSpan="4">借款基本信息</td>
            </tr>
            <tr>
              <td>本金金额</td>
              <td colSpan="3">
                人民币【&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;】元
              </td>
            </tr>
            <tr>
              <td>大写</td>
              <td colSpan="3">
                人民币【&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;】元
              </td>
            </tr>
            <tr>
              <td>借款用途</td>
              <td style={{ width: '120px' }} />
              <td>借款利率</td>
              <td>【&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;】%</td>
            </tr>
            <tr>
              <td>借款期限</td>
              <td colSpan="3" />
            </tr>
            <tr>
              <td>借款起息日</td>
              <td style={{ width: '80px' }} />
              <td>借款到期日</td>
              <td style={{ width: '80px' }} />
            </tr>
            <tr>
              <td>指定收款账户信息</td>
              <td colSpan="3">
                户名：【&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;】<br />
                开户行：【&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;】<br />
                收款账户：【&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;】
              </td>
            </tr>
            <tr>
              <td>还款方式</td>
              <td colSpan="3" />
            </tr>
            <tr>
              <td>A、到期一次性还本</td>
              <td colSpan="3">
                借款到期日【&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;】
              </td>
            </tr>
            <tr>
              <td>B、等额本息</td>
              <td colSpan="3">
                还款期数【&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;】期
              </td>
            </tr>
            <tr>
              <td>服务费利率（年化）</td>
              <td colSpan="3">【&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;】%</td>
            </tr>
          </tbody>
        </table>
        <p>
          三、甲方授权乙方在借款基本信息范围内向乙方推荐的相关资金提供方或相关借贷平台中有投资需求的投资用户申请借款并代为签署相关融资协议，包括但不限于《借款协议》、《服务协议》等。
        </p>
        <p>
          四、乙方在借款基本信息授权范围内代甲方签署的《借款协议》、《服务协议》对甲方均有法律约束力，甲方应按照协议的相关约定承担还款义务。
        </p>
        <p>
          五、甲方同意出借人出借资金到达借款基本信息约定的指定收款账户后视为出借人的出借义务履行完毕。
        </p>
        <p>六、甲方就本协议的授权委托为不可撤销的授权，甲方不得在本协议生效后撤销。</p>
        <p>七、甲方就委托乙方签署的《借款协议》、《服务协议》的模板条款所有内容均知晓并无异议。</p>
        <p>
          八、甲方同意若后续出借人端生成的借款协议起息日、到期日与本授权协议不一致的，以相关资金提供方或相关借贷平台出借人端生成的《借款协议》为准，甲方应按照出借端生成的《借款协议》履行还款义务。
        </p>
        <p>九、甲方同意《借款协议》、《服务协议》以相关资金提供方或相关借贷平台留存的版本为准。</p>
        <p>十、本协议一式两份 ，甲乙双方各执一份，自各方签字盖章后生效。</p>
        <p>
          十一、本协议产生的一切争议，先通过友好协商的方式解决，协商不成的，任何一方均可向乙方所在地的人民法院进行诉讼。
        </p>

        <p className="mgt20">（以下无正文）</p>
        <div className="con-div">
          <p>甲方（签字、按印）：</p>
          <p className="mgt20">日期：年 月 日</p>
          {/*<img className="img1" src={require("../../assets/images/chen.png")}/>*/}
        </div>
        <div className="con-div">
          <p>乙方（盖章）：</p>
          <p>法定代表人（签字/盖章）：</p>
          <p className="mgt20">日期：年 月 日</p>
        </div>
        {/*<div className="con-div">*/}
        {/*<p>丙方盖章：</p>*/}
        {/*<img className="img2" src={require("../../assets/images/zhang.png")}/>*/}
        {/*</div>*/}
      </div>
    );
  }
}
