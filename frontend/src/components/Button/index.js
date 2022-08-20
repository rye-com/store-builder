import React from 'react';
import classNames from 'classnames';
import './style.scss';
export const Button = ({ className, onClick, children, ...buttonProps }) => {
  return (
    <button className={classNames('button-control', className)} onClick={onClick} {...buttonProps}>
      {children}
    </button>
  );
};

export const LinkButton = ({ children, className, ...linkProps }) => {
  return (
    <a className={classNames('button-control', className)} {...linkProps}>
      {children}
    </a>
  );
};
