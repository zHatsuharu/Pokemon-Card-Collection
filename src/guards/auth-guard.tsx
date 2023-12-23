import { useContext } from "react";
import { AuthContext } from "../providers/auth-providers";
import { Navigate, Outlet } from "react-router-dom";

export default function AuthGuard() {
    const { state: { isLogged }} = useContext(AuthContext);

    if (!isLogged) {
        return <Navigate to="/login" />
    }

    return <Outlet />;
}