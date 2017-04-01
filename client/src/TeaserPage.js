import cx from 'classnames';
import React, { Component } from 'react';

import logo from './icon-logo@2x.png';
import './TeaserPage.css';

const Button = ({ title, className, ...props }) => (
  <button className={cx('Button', className)}>{title}</button>
);

const TextInput = ({ type = 'text', className, ...props }) => (
  <input type={type} className={cx('TextInput', className)} {...props} />
);

const Layer = ({ children }) => (
  <div className="Layer">
    {children}
  </div>
);

const Background = () => (
  <div className="Background" />
);

const styles = {
  logo: {
    width: 36,
    height: 36,
  },
};

class TeaserPage extends Component {
  render() {
    return (
      <div className="TeaserPage">
        <Background />
        <div className="TeaserPage-content">
          <div className="TeaserPage-left">
            <Layer>
              <div className="TeaserPage-form">
                <img alt="Start" src={logo} style={styles.logo} className="TeaserPage-logo" />
                <TextInput
                  className="TeaserPage-input"
                  placeholder="Company"
                />
                <TextInput
                  className="TeaserPage-input"
                  placeholder="Email"
                />
                <Button
                  className="TeaserPage-button"
                  title="Join Waitlist"
                />
              </div>
            </Layer>
          </div>
          <div className="TeaserPage-right">
            <h1 className="TeaserPage-title">
              Signup flows made easy—no code required.
            </h1>
            <p className="TeaserPage-subtitle">
              The monkey-rope is found in all whalers; but it was only in the Pequoud that the monkey and his holder were ever tied together.
            </p>
            <a href="#" className="TeaserPage-link">
              Try customizing the flow
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default TeaserPage;
