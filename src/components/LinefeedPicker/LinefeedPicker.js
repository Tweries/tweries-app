import React, { useState } from 'react';
import {
  LINEFEED,
  NEWLINE,
  PICK_YOUR_OWN_LINEFEED_V1,
  PICK_YOUR_OWN_LINEFEED_V2
} from '../../constants';
import './LinefeedPicker.css';

const types = {
  custom: 'custom',
  newline: 'newline'
};

function Custom({ disabled, onChange, value }) {
  return (
    <input
      className="App__linefeed"
      data-testid="linefeed"
      disabled={disabled}
      maxLength="4"
      onChange={onChange}
      placeholder={LINEFEED}
      size="4"
      value={value}
    />
  );
}

function LinefeedPicker({ feature, onChange }) {
  const [type, setType] = useState(types.newline);
  const [custom, setCustom] = useState(LINEFEED);

  if (feature.active(PICK_YOUR_OWN_LINEFEED_V2) === true) {
    return (
      <ul className="LinefeedPicker__ul">
        <li className="LinefeedPicker__li">
          <input
            data-testid="newline"
            defaultChecked
            name="linefeed"
            onChange={() => {
              setType(types.newline);
              onChange(NEWLINE);
            }}
            type="radio"
            value="newline"
          />
          <label htmlFor="newline">Newline(s)</label>
        </li>
        <li className="LinefeedPicker__li">
          <input
            data-testid="custom"
            name="linefeed"
            onChange={() => {
              setType(types.custom);
              onChange(custom);
            }}
            type="radio"
            value="custom"
          />
          <label htmlFor="louie">
            <Custom
              disabled={type !== types.custom}
              onChange={e => {
                const {
                  target: { value }
                } = e;
                setCustom(value);
                onChange(value);
              }}
              value={custom}
            />
          </label>
        </li>
      </ul>
    );
  }
  if (feature.active(PICK_YOUR_OWN_LINEFEED_V1) === true) {
    return <Custom disabled={false} onChange={onChange} value={custom} />;
  }
  return <span>{custom}</span>;
}

export default LinefeedPicker;
