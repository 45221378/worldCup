/**
 * Created by yangke on 2018/5/22.
 */
import { Component } from 'react';
import './banner.less';

export default class Banner extends Component {
  static defaultProps = {
    src: require(`../../assets/images/banner.png`),
    alt: 'banner',
  };

  render() {
    const { src, alt } = this.props;
    return (
      <div className="banner">
        <img src={src} alt={alt} />
      </div>
    );
  }
}
