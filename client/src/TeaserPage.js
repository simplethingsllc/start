import cx from 'classnames';
import React, { Component } from 'react';
import './TeaserPage.css';

const THEME_NAMES = [ 'blue', 'red', 'black' ];
const DEFAULT_THEME_INDEX = 0;

const withTheme = (className, theme, animating) => {
  return cx(`${className} ${className}-theme--${theme}`, animating && `${className}-anim--transition`);
}

const Button = ({ title, theme, className, ...props }) => (
  <button className={cx(withTheme('Button', theme), className)}>{title}</button>
);

const TextInput = ({ type = 'text', className, ...props }) => (
  <input type={type} className={cx('TextInput', className)} {...props} />
);

const Layer = ({ children }) => (
  <div className="Layer">
    {children}
  </div>
);

const Logo = ({ theme }) => (
  <div className={withTheme('Logo', theme)} />
)

const Background = ({ theme }) => (
  <div className={withTheme('Background', theme)} />
);

class TeaserPage extends Component {
  state = {
    selectedTheme: DEFAULT_THEME_INDEX,
  };

  _handleCustomize = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({
      animating: true,
      selectedTheme: (this.state.selectedTheme + 1) % THEME_NAMES.length
    });
  };

  render() {
    const theme = THEME_NAMES[this.state.selectedTheme];
    return (
      <div className="TeaserPage">
        <Background theme={theme} />
        <div className="TeaserPage-content">
          <div className="TeaserPage-left">
            <Layer>
              <div className="TeaserPage-form">
                <div className="TeaserPage-logo">
                  <Logo theme={theme} />
                </div>
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
                  theme={theme}
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
            <a
              href="#"
              onClick={this._handleCustomize}
              className="TeaserPage-link">
              Try customizing the flow
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default TeaserPage;
