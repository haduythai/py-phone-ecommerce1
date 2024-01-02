import axios from "axios";
import { API_URL } from "../services/utils/constants";

export const getListUser = async () => {
	const res = await axios.get(`${API_URL}/users`);
	const data = await res.data;
	return data;
};

export const getUserForLogin = async (username: string, password: string) => {
	const strParams = `username=${username}&password=${password}`;
	const res = await axios.get(`${API_URL}/users?${strParams}`);
	const data = await res.data[0];
	return data;
};
