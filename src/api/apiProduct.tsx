import axios from "axios";
import { API_URL } from "../services/utils/constants";

export const getListProduct = async () => {
	try {
		const res = await axios.get(`${API_URL}/products?_expand=category`);
		const data = await res.data;
		return data;
	} catch (e) {
		return {
			error: true,
		};
	}
};

export const delProductById = async (productId: number | string) => {
	try {
		const res = await axios.delete(`${API_URL}/products/${productId}`);
		return res.statusText;
	} catch (error) {
		return {
			error: true,
		};
	}
};

export const postProduct = async (product: {}) => {
	try {
		const res = await axios.post(`${API_URL}/products`, product);
		return {
			status: res.status,
			message: res.statusText,
		};
	} catch (error) {
		return {
			error: true,
		};
	}
};
