import cx from 'classnames';
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import './TeaserPage.css';

const THEME_NAMES = [ 'blue', 'red', 'black' ];
const DEFAULT_THEME_INDEX = 0;

const createEmitter = () => {
  const listeners = {};
  return {
    emit(...args) {
      Object.keys(listeners).map((k) => listeners[k](...args));
    },
    addListener(fn) {
      listeners[fn] = fn;
    },
    removeListener(fn) {
      delete listeners[fn];
    },
  }
};

const withTheme = (className, theme = 'default', animating) => {
  return cx(`${className} ${className}-theme--${theme}`, animating && `${className}-anim--transition`);
}

const Button = ({ title, theme, className, ...props }) => (
  <button className={cx(withTheme('Button', theme), className)} {...props}>{title}</button>
);

const TextInput = ({ type = 'text', className, ...props }) => (
  <input type={type} className={cx('TextInput', className)} {...props} />
);

const Layer = ({ children, className }) => <div className={cx('Layer', className)}>{children}</div>;

const Checkbox = ({ selected, onChange }) => (
  <div
    className={cx('Checkbox', selected && 'Checkbox--selected')}
    onClick={() => onChange(!selected)}
  />
);

const Image = ({ className }) => <div className={className} />;

const Logo = ({ className, theme }) => <Image className={cx(withTheme('Logo', theme), className)} theme={theme} />;

const Checkmark = ({ className, theme }) => <Image className={cx(withTheme('Checkmark', theme), className)} theme={theme} />;

const Background = ({ theme }) => (
  <div className={withTheme('Background', theme)} />
);

const Subheading = ({ title, className }) => (
  <div className={cx('Subheading', className)}>
    {title}
  </div>
);

const recaptchaEmitter = createEmitter();

let recaptchaApi = window.grecaptcha || undefined;
if (!recaptchaApi) {
  window.onRecaptchaLoaded = () => {
    recaptchaApi = window.grecaptcha;
    recaptchaEmitter.emit(recaptchaApi);
  }
}

class Recaptcha extends Component {

  _widgetId;

  static propTypes = {
    className: PropTypes.any,
    onVerify: PropTypes.func,
  };

  static defaultProps = {
    onVerify: () => {},
  };

  componentDidUpdate() {
    this._renderWidget();
  }

  _renderWidget = () => {
    if (this._widgetId !== undefined) {
      return;
    }
    if (!recaptchaApi) {
      recaptchaEmitter.addListener(this._renderWidget);
      return;
    }
    recaptchaEmitter.removeListener(this._renderWidget);
    const el = ReactDOM.findDOMNode(this.refs.container);
    this._widgetId = recaptchaApi.render(el, {
      sitekey: '6Ld6nBsUAAAAAEMPc6idzDXftVzjTgVmhaau-2_6',
      callback: this._onVerify,
      theme: 'light',
    });
  }

  _onVerify = (verification) => {
    this.props.onVerify(verification);
  };

  render() {
    setTimeout(this._renderWidget);
    const { className } = this.props;
    return <div ref="container" className={cx(className, 'g-recaptcha')} ></div>
  }
}

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
    <Logo className="TitleSection-logo" />
    <h1>
      Signup flows made easy–no coding required.
    </h1>
    <p>
      Add-on signup flows that you can create and customize in minutes.
    </p>
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault();
        onCustomize();
      }}
      className="TitleSection-link">
      Try customizing the flow
    </a>
  </div>
);

class TeaserPage extends Component {
  state = {
    customizing: false,
    options: {
      logo: true,
      company: true,
      name: true,
      captcha: false,
    },
    selectedTheme: DEFAULT_THEME_INDEX,
    verification: undefined,
    submitted: false,
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

  _handleVerify = (verification) => {
    this.setState({ verification });
  };

  _handleJoinClicked = () => {
    this.setState({ submitted: true });
  };

  _renderFormContent(theme) {
    const { options } = this.state;
    return (
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
        <TextInput
          className="TeaserPage-input"
          placeholder="Email"
        />
        { options.company ? (
          <TextInput
            className="TeaserPage-input"
            placeholder="Company (optional)"
          />) : null }
        { options.captcha ? (
          <Recaptcha
            onVerify={this._handleVerify}
            className="TeaserPage-captcha"
          />) : null }
        <Button
          className="TeaserPage-button"
          title="Join Waitlist"
          theme={theme}
          onClick={this._handleJoinClicked}
        />
      </div>
    );
  }

  _renderThanks(theme) {
    return (
      <div className={withTheme('TeaserPage-waitlist', theme)}>
        <Checkmark className="TeaserPage-checkmark" theme={theme} />
        <div>You're on the waitlist!</div>
      </div>
    );
  }

  render() {
    const { customizing, selectedTheme, submitted } = this.state;
    const theme = THEME_NAMES[selectedTheme];
    return (
      <div className="TeaserPage">
        <Background theme={theme} />
        <div className="TeaserPage-content">
          <Layer className="TeaserPage-left">
            { submitted ? this._renderThanks(theme) : this._renderFormContent(theme) }
          </Layer>
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
