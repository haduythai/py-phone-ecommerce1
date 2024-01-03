import React, { useEffect, useState } from "react";
import { getListCategory } from "../../api/apiCategory";

export const Sidebar = () => {
	const [listCategory, setListCategory] = useState<any[]>([]);

	const fetchListCategory = async () => {
		const res = await getListCategory();
		setListCategory(res);
	};

	useEffect(() => {
		fetchListCategory();
	}, []);

	return (
		<div className="p-4 mx-auto shadow-md border">
			<div className="flex flex-col gap-2">
				<h3 className="font-semibold text-xl text-center uppercase">Danh mục sản phẩm</h3>
				{listCategory.map((iCategory) => {
					return (
						<div key={iCategory.id} className="border border-slate-400 hover:bg-indigo-600 hover:font-semibold hover:text-white cursor-pointer px-2 py-1">
							<span>{iCategory.name}</span>
						</div>
					);
				})}
			</div>
		</div>
	);
};
