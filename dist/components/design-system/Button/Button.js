import "./Button.css";
var Button = function (_a) {
    var className = _a.className, type = _a.type, onClick = _a.onClick, text = _a.text;
    return (React.createElement("button", { className: "".concat(className, " button"), type: type, onClick: onClick }, text));
};
export default Button;
