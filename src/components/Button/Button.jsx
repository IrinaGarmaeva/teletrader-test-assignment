import "./Button.css";

const Button = ({ className, type, onClick, text }) => {
  return (
    <button className={`${className} button`} type={type} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
