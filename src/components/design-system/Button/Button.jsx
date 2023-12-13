import React from 'react';

function Button({
  className, type, onClick, text,
}) {
  return (
    <button className={`${className} button`} type={type} onClick={onClick}>
      {text}
    </button>
  );
}

export default Button;

// type ButtonProps = {
//   className: string,
//   type?: 'button' | 'submit' | 'reset',
//   onClick?: () => void,
//   text?: string
// };

// const defaultProps: Partial<ButtonProps> = {
//   type: 'button',
//   onClick: () => {},
//   text: '',
// };

// function Button({
//   className, type = 'button', onClick, text,
// } : ButtonProps) {
//   return (
//     // eslint-disable-next-line react/button-has-type
//     <button className={className} type={type} onClick={onClick}>
//       {text}
//     </button>
//   );
// }

// Button.defaultProps = defaultProps;

// export default Button;
