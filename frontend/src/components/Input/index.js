import React from 'react';
import classNames from 'classnames';
import './style.scss';

export const Input = ({ className, value, onChange, ...props }) => {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={classNames('input-control', className)}
      {...props}
    />
  );
};
