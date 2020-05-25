import * as React from 'react';
import * as ReactDOM from 'react-dom';

/* eslint-disable */
import { generate as GenerateFunction, Pattern } from '@prescott/geo-pattern/types/browser';
const generate = require('@prescott/geo-pattern/browser/es5').generate as typeof GenerateFunction;
/* eslint-enable */

type InputChangeEvent = React.ChangeEvent<HTMLInputElement>;
type InputChangeEventHandler = React.ChangeEventHandler<HTMLInputElement>;

type BackgroundProps = {
  pattern: Pattern | null;
};

function useInput(initial: string = ''): [string, InputChangeEventHandler] {
  const [value, setValue] = React.useState(initial);

  const onChange: InputChangeEventHandler = (e: InputChangeEvent) => {
    setValue(e.target.value);
  };

  return [value, onChange];
}

function useCheckbox(initial: boolean = false): [boolean, InputChangeEventHandler] {
  const [checked, setChecked] = React.useState(initial);

  const onChange: InputChangeEventHandler = (e: InputChangeEvent) => {
    setChecked(e.target.checked);
  };

  return [checked, onChange];
}

function Background(props: BackgroundProps) {
  const { pattern } = props; // eslint-disable-line react/prop-types

  const background = (() => {
    if (pattern) {
      const url = pattern.toDataURL(); // eslint-disable-line react/prop-types

      return `url('${url}') repeat`;
    }

    return 'none transparent';
  })();

  return (
    <div style={{
      display: 'block',
      position: 'fixed',
      left: 0,
      top: 0,
      width: '100%',
      height: '100%',
      background,
      zIndex: -1,
    }}
    />
  );
}

function DownloadButton(props: BackgroundProps) {
  const { pattern } = props;

  if (!pattern) {
    return (
      <div>
        Preparing
      </div>
    );
  }

  const href = pattern.toDataURL();

  return (
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    <a
      title="Download as File"
      href={href}
      target="_blank"
      rel="noreferrer"
      download="geo-pattern.svg"
      style={{
        display: 'block',
        width: '100%',
        height: '4rem',
        lineHeight: '4rem',
        padding: '0 1.66rem',
        fontSize: '1.66rem',
        textAlign: 'center',
        color: '#333',
        background: 'none #fff',
        cursor: 'pointer',
        textDecoration: 'none',
      }}
    >
      Download as File
    </a>
  );
}

function App() {
  const [input, onInputChange] = useInput('hello');
  const [color, onColorChange] = useInput('');
  const [isBaseColor, onIsBaseColorChange] = useCheckbox(false);

  const [pattern, setPattern] = React.useState<Pattern | null>(null);

  React.useEffect(() => {
    const patternPromise: Promise<Pattern> = (() => {
      if (color && !isBaseColor) {
        return generate({ input, color });
      } if (color && isBaseColor) {
        return generate({ input, baseColor: color });
      }
      return generate({ input });
    })();

    patternPromise
      .then((generated) => setPattern(generated))
      .catch((e) => console.error(e)); // eslint-disable-line
  }, [input, color, isBaseColor]);

  return (
    <div>
      <Background pattern={pattern} />
      <div
        className="setting"
        style={{
          position: 'fixed',
          width: '80%',
          maxWidth: '640px',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
        }}
      >
        <div style={{ marginBottom: '12px' }}>
          <input
            name="input"
            type="text"
            value={input}
            onChange={onInputChange}
            placeholder="Type something"
            style={{
              display: 'block',
              width: '100%',
              fontSize: '48px',
              textAlign: 'center',
              color: '#fff',
              background: 'none transparent',
              border: '0 none',
            }}
          />
        </div>
        <div style={{
          textAlign: 'left',
          fontSize: '14px',
        }}
        >
          { /* eslint-disable-next-line jsx-a11y/label-has-associated-control */ }
          <label style={{
            display: 'block',
            lineHeight: '20px',
            marginBottom: '8px',
          }}
          >
            <span style={{ marginRight: '4px' }}>Color</span>
            <input name="color" type="color" value={color} onChange={onColorChange} />
          </label>
          { /* eslint-disable-next-line jsx-a11y/label-has-associated-control */ }
          <label style={{
            display: 'block',
            lineHeight: '20px',
            marginBottom: '8px',
          }}
          >
            <span style={{ marginRight: '4px' }}>Use color as BaseColor</span>
            <input name="is-base-color" type="checkbox" checked={isBaseColor} onChange={onIsBaseColorChange} style={{ verticalAlign: 'top' }} />
          </label>
          <DownloadButton pattern={pattern} />
        </div>
      </div>
    </div>
  );
}


ReactDOM.render((<App />), document.getElementById('app'));
