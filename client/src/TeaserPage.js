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

const Subheading = ({ title, className }) => (
  <div className={cx('Subheading', className)}>
    {title}
  </div>
);


const ColorPicker = ({ theme, onSelect }) => (
  <div className="ColorPicker">
    <div
      className={withTheme('ColorPicker-button', theme)}
      onClick={(e) => {
        e.preventDefault();
        const index = THEME_NAMES.findIndex((name) => name === theme);
        onSelect((index + 1) % THEME_NAMES.length);
      }}
    />
    <div className={cx('ColorPicker-popup')}>
      {
        THEME_NAMES.map((theme) => (
          <div
            key={theme}
            className={withTheme('ColorPicker-square', theme)}
            onClick={() => onSelect(theme)}
          />
        ))
      }
    </div>
  </div>
);

const CustomizeSection = ({ theme, onChangeTheme }) => (
  <section className="CustomizeSection">
    <h2>
      Customize
    </h2>
    <Subheading title="Brand" />
    <div className="OptionGroup">
      <div className="Option">Logo</div>
      <div className="Option">Color:
        <ColorPicker
          theme={theme}
          onSelect={onChangeTheme}
        />
      </div>
    </div>
    <div style={{ marginTop: 32 }} />
    <Subheading title="Information" />
    <div className="OptionGroup">
      <div className="Option">Company</div>
      <div className="Option">Name</div>
      <div className="Option">ReCAPTCHA</div>
    </div>
  </section>
);

const TitleSection = ({ onCustomize }) => (
  <div className="TitleSection">
    <h1>
      Signup flows made easy—no code required.
    </h1>
    <p>
      The monkey-rope is found in all whalers; but it was only in the Pequoud that the monkey and his holder were ever tied together.
    </p>
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault();
        onCustomize();
      }}
      className="TeaserPage-link">
      Try customizing the flow
    </a>
  </div>
);

class TeaserPage extends Component {
  state = {
    selectedTheme: DEFAULT_THEME_INDEX,
    customizing: true,
  };

  _handleChangeColor = (theme) => {
    this.setState({
      selectedTheme: (this.state.selectedTheme + 1) % THEME_NAMES.length
    });
  };

  render() {
    const { customizing, selectedTheme } = this.state;
    const theme = THEME_NAMES[selectedTheme];
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
            {
              customizing
                ? <CustomizeSection
                    theme={theme}
                    onChangeTheme={(selectedTheme) => this.setState({ selectedTheme })}
                  />
                : <TitleSection onCustomize={() => this.setState({ customizing: true })} />
            }
          </div>
        </div>
      </div>
    );
  }
}

export default TeaserPage;
