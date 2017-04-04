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

const Checkbox = ({ selected, onChange }) => (
  <div
    className={cx('Checkbox', selected && 'Checkbox--selected')}
    onClick={() => onChange(!selected)}
  />
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
    {
      THEME_NAMES.map((t, i) => (
        <div
          key={t}
          className={cx(withTheme('ColorPicker-button', t), t === theme && 'ColorPicker-button--selected')}
          onClick={() => onSelect(i)}>
        </div>
      ))
    }
  </div>
);

const CustomizeSection = ({ options, theme, onChangeTheme, onChangeOption }) => (
  <section className="CustomizeSection">
    <h2>Customize</h2>
    <Subheading title="Brand" />
    <div className="OptionGroup">
      <div className="Option">
        <Checkbox
          selected={options.logo}
          onChange={(selected) => onChangeOption('logo', selected)}
        />Logo
      </div>
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
      <div className="Option">
        <Checkbox
          selected={options.company}
          onChange={(selected) => onChangeOption('company', selected)}
        />Company
      </div>
      <div className="Option">
        <Checkbox
          selected={options.name}
          onChange={(selected) => onChangeOption('name', selected)}
        />Name
      </div>
      <div className="Option">
        <Checkbox
          selected={options.captcha}
          onChange={(selected) => onChangeOption('captcha', selected)}
        />CAPTCHA
      </div>
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
    customizing: true,
    options: {
      logo: true,
      company: true,
      name: true,
      captcha: false,
    },
    selectedTheme: DEFAULT_THEME_INDEX,
  };

  _handleChangeColor = (theme) => {
    this.setState({
      selectedTheme: (this.state.selectedTheme + 1) % THEME_NAMES.length
    });
  };

  _handleChangeOption = (option, selected) => {
    this.setState({
      options: {
        ...this.state.options,
        [option]: selected,
      }
    });
  };

  render() {
    const { customizing, options, selectedTheme } = this.state;
    const theme = THEME_NAMES[selectedTheme];
    return (
      <div className="TeaserPage">
        <Background theme={theme} />
        <div className="TeaserPage-content">
          <div className="TeaserPage-left">
            <Layer>
              <div className="TeaserPage-form">
                { options.logo ? (
                  <div className="TeaserPage-logo">
                    <Logo theme={theme} />
                  </div>) : null }
                { options.name ? (
                  <TextInput
                    className="TeaserPage-input"
                    placeholder="Name"
                  />) : null }
                { options.company ? (
                  <TextInput
                    className="TeaserPage-input"
                    placeholder="Company"
                  />) : null }
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
                    options={this.state.options}
                    onChangeOption={(option, selected) => this._handleChangeOption(option, selected)}
                    onChangeTheme={(selectedTheme) => this.setState({ selectedTheme })}
                    theme={theme}
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
