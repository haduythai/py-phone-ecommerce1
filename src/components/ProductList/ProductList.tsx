import { useEffect, useState } from "react";
import { ProductItem } from "../ProductItem/ProductItem";
import { getListProduct } from "../../api/apiProduct";

export const ProductList = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const [listProduct, setListProduct] = useState<any[]>([]);
	// fetch
	const fetchListProduct = async (currentPage: number) => {
		const res = await getListProduct(currentPage);
		setListProduct(res);
	};
	useEffect(() => {
		fetchListProduct(currentPage);
	}, [currentPage]);

	const pageCount = Math.ceil(listProduct.length / 10);
	const pageNumbers = [];

	for (let i = 0; i <= pageCount; i++) {
		pageNumbers.push(i + 1);
	}

	return (
		<section className="text-gray-600 body-font">
			<div className="grid grid-cols-12 gap-4">
				{listProduct.map((iProduct) => {
					return <ProductItem key={iProduct.id} dataProduct={iProduct} />;
				})}
			</div>
			<div className="my-6 flex justify-center">
				<ul className="flex border">
					{pageNumbers.map((numberPage) => {
						return (
							<li
								onClick={() => {
									setCurrentPage(numberPage);
								}}
								key={numberPage}
								className={`px-3 py-1 hover:bg-cyan-600 hover:text-white hover:font-semibold cursor-pointer ${numberPage > pageNumbers.length - 1 ? "" : "border-r"}`}
							>
								<span>{numberPage}</span>
							</li>
						);
					})}
				</ul>
			</div>
		</section>
	);
};
