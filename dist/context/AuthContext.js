import { createContext, useState, useContext } from 'react';
var AuthContext = createContext();
export var AuthProvider = function (_a) {
    var children = _a.children;
    var _b = useState(false), isLoggedIn = _b[0], setIsLoggedIn = _b[1];
    return (React.createElement(AuthContext.Provider, { value: { isLoggedIn: isLoggedIn, setIsLoggedIn: setIsLoggedIn } }, children));
};
export var useAuth = function () { return useContext(AuthContext); };
