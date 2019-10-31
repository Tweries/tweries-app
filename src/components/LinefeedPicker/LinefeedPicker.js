import React, { useState } from 'react';
import { LINEFEED, NEWLINE } from '../../constants';
import './LinefeedPicker.css';

const types = {
  custom: 'custom',
  newline: 'newline'
};

function Custom({ disabled, onChange, value }) {
  return (
    <input
      className="LinefeedPicker__linefeed"
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

export default LinefeedPicker;
