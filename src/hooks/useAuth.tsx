import { useContext } from "react";
import { AuthContext } from "../services/context/AuthProvider";

export const useAuth = () => {
	return useContext(AuthContext);
};
