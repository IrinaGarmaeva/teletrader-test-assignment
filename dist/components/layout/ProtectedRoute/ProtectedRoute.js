import { Navigate } from 'react-router-dom';
export function ProtectedRoute(_a) {
    var isLoggedIn = _a.isLoggedIn, element = _a.element;
    return (isLoggedIn ? element : React.createElement(Navigate, { to: "/", replace: true }));
}
