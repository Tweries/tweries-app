import React, { useState } from 'react';
import { LINEFEED, NEWLINE } from '../../constants';

const copy = {
  'Newline(s)': 'Newline(s)'
};

const types = {
  custom: 'custom',
  newline: 'newline'
};

function Custom({ disabled, onChange, value }) {
  return (
    <input
      className="bg-gray-200 border border-gray-500 rounded text-center"
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
    <ul className="flex">
      <li>
        <input
          className="ml-1"
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
        <label className="ml-1" htmlFor="newline">
          {copy['Newline(s)']}
        </label>
      </li>
      <li>
        <input
          className="ml-1"
          data-testid="custom"
          name="linefeed"
          onChange={() => {
            setType(types.custom);
            onChange(custom);
          }}
          type="radio"
          value="custom"
        />
        <label className="ml-1" htmlFor="louie">
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
