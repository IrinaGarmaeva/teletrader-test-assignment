import React from 'react';
import { ButtonProps } from './types';

function Button({
  className, type, onClick, text,
}: ButtonProps) {
  return (
    // eslint-disable-next-line react/button-has-type
    <button className={`${className} button`} type={type} onClick={onClick}>
      {text}
    </button>
  );
}

export default Button;
