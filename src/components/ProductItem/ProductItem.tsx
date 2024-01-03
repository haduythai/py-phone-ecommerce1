import { Link } from "react-router-dom";

export const ProductItem = ({ dataProduct }: any) => {
	return (
		<div className="col-span-3">
			<Link to={`/product/${dataProduct.name}/${dataProduct.id}`} className="block w-full h-full border rounded-md p-2 shadow-md hover:opacity-70 cursor-pointer">
				<div className="block relative h-48 rounded overflow-hidden">
					<img alt="ecommerce" className="object-cover object-center w-full h-full block" src={dataProduct.thumbnail} />
				</div>
				<div className="mt-4">
					<h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{dataProduct.category.name}</h3>
					<h2 className="text-gray-900 title-font text-sm font-medium">{dataProduct.name.length > 25 ? dataProduct.name.substring(0, 25) + "..." : dataProduct.name}</h2>
					<div className="my-2 flex items-center justify-between">
						<span className="text-sm text-red-600 line-through">{dataProduct.importPrice.toLocaleString() + " VNĐ"}</span>
						<span className="text-md font-medium text-green-600">{dataProduct.discountPrice.toLocaleString() + " VNĐ"}</span>
					</div>
				</div>
			</Link>
		</div>
	);
};
