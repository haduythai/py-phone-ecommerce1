import axios from "axios";
import { API_URL } from "../services/utils/constants";

export const getListCategory = async () => {
	try {
		const res = await axios.get(`${API_URL}/categories`);
		return res.data;
	} catch (error) {
		return { error: true };
	}
};
