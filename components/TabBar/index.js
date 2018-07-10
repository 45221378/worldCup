import React, { Component } from 'react';
import { Link, withRouter } from 'dva/router';
import './tabBar.less';

/*
TabBar接收三个参数  tabArr  defaultPath  className
类型为  对象构成的数组   [obj,obj,obj]
目前只接受长度为3的数组
    tabArr内的对象  包括了四条属性
    obj = {
        name:string  tab标签展示文本
        class:string tab标签的class
        label:string  tab标签正文下标注文本展示
        toPath:string  tab标签点击跳转的路由
        clickFunc:function  tab标签点击时执行的函数
        disabled:boolean  tab标签是否能够点击
    }
    defaultPath为页面渲染默认选中的tab标签
*/

let timer = null,
  unlisten = null;
@withRouter
export default class TabBar extends Component {
  constructor(props) {
    super(props);
    const { tabArr = [] } = props;
    let {
      match: { path },
    } = props;
    path = path.indexOf('/:') > -1 ? path.split('/:')[0] : path;
    this.state = {
      position: 'left',
      tabArr,
      thisPath: '',
      pathname: path,
    };
  }
  getTab = () => {
    let {
      defaultPath = '',
      match: { path },
      location: { pathname },
    } = this.props;
    let { tabArr, thisPath } = this.state;

    path = path.indexOf('/:') > -1 ? path.split('/:')[0] : path;
    pathname = pathname.split(path)[1].split('/')[1];
    thisPath = pathname ? pathname : '';

    let position = 'left';
    if (tabArr.length > 0) {
      if (defaultPath && thisPath === '') {
        thisPath = defaultPath;
      }
      tabArr.map((ele, index) => {
        // console.log(thisPath);
        if (ele.toPath === thisPath) {
          switch (index) {
            case 1:
              position = 'center';
              break;
            case 2:
              position = 'right';
              break;
            default:
              position = 'left';
          }
        }
        return position;
      });
    }

    this.setState({
      position,
      thisPath,
    });
  };
  componentDidMount() {
    const _this = this;
    const { history } = this.props;
    const path = history.location.pathname.split('/')[1];
    unlisten = history.listen(({ pathname }) => {
      timer = setTimeout(() => {
        if (pathname.indexOf(path) > -1) {
          _this.getTab();
        }
      }, 30);
    });
  }
  componentWillUnmount() {
    unlisten();
    clearTimeout(timer);
  }
  render() {
    const { position, tabArr, thisPath, pathname } = this.state;
    const { className = '' } = this.props;
    return (
      <section className={`component-tab ${className}`}>
        <ul className="component-tab-list clearfix">
          {tabArr.map((ele, index) => {
            const {
              name = '',
              thisClass = '',
              label = '',
              toPath = '',
              clickFunc = null,
              disabled = false,
            } = ele;
            let classNames = thisClass;
            if (thisPath === toPath || (thisPath === '' && index === 0)) {
              classNames += ' tab-active';
            }
            if (disabled) {
              classNames += ' tab-disabled';
            }
            return (
              <li key={index} className={classNames} onClick={disabled ? null : clickFunc}>
                <Link to={`${pathname}/${toPath}`} replace>
                  <span>{name}</span>
                  <i>{label}</i>
                </Link>
              </li>
            );
          })}
        </ul>
        <span className={`component-tab-bar bar-${position}`} />
      </section>
    );
  }
}
