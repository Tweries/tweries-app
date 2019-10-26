import React, { useState } from 'react';
import {
  PICK_YOUR_OWN_LINEFEED_V1,
  PICK_YOUR_OWN_LINEFEED_V2
} from '../../feature';
import { LINEFEED, NEWLINE } from '../../store/makeTweetstorm';
import './LinefeedPicker.css';

function Custom({ disabled, onChange, linefeed }) {
  return (
    <input
      className="App__linefeed"
      disabled={disabled}
      data-testid="linefeed"
      onChange={onChange}
      maxLength="4"
      placeholder={LINEFEED}
      size="4"
      value={linefeed}
    />
  );
}

function LinefeedPicker({ feature, linefeed, onChange }) {
  const [type, setType] = useState('newline');

  if (feature.active(PICK_YOUR_OWN_LINEFEED_V2) === true) {
    return (
      <ul className="LinefeedPicker__ul">
        <li className="LinefeedPicker__li">
          <input
            type="radio"
            id="newline"
            name="linefeed"
            onChange={() => {
              setType('newline');
              onChange({ target: { value: NEWLINE } });
            }}
            value="newline"
            defaultChecked
          />
          <label htmlFor="newline">Newline(s)</label>
        </li>
        <li className="LinefeedPicker__li">
          <input
            type="radio"
            id="custom"
            name="linefeed"
            onChange={() => setType('custom')}
            value="custom"
          />
          <label htmlFor="louie">
            <Custom
              disabled={type !== 'custom'}
              onChange={e => {
                if (type === 'custom') {
                  onChange(e);
                }
              }}
              linefeed={linefeed}
            />
          </label>
        </li>
      </ul>
    );
  }
  if (feature.active(PICK_YOUR_OWN_LINEFEED_V1) === true) {
    return <Custom disabled={false} onChange={onChange} linefeed={linefeed} />;
  }
  return <span>{linefeed}</span>;
}

export default LinefeedPicker;
