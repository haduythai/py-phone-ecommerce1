import axios from "axios";
import { API_URL } from "../services/utils/constants";

export const getListProduct = async (currentPage: number | null) => {
	try {
		const res = await axios.get(`${API_URL}/products?_expand=category&_page=${currentPage}`);
		const data = await res.data;
		return data;
	} catch (e) {
		return {
			error: true,
		};
	}
};

export const getProductById = async (id: string | number) => {
	try {
		const res = await axios.get(`${API_URL}/products/${id}?_expand=category`);
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

export const updateProduct = async (id: string, productData: {}) => {
	try {
		const res = await axios.patch(`${API_URL}/products/${id}`, productData);
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
