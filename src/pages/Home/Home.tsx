import { Banner } from "../../components/Banner/Banner";
import { ProductList } from "../../components/ProductList/ProductList";
import { Sidebar } from "../../components/Sidebar/Sidebar";

export const Home = () => {
	return (
		<div className="w-full">
			<Banner />
			<div className="max-w-7xl grid grid-cols-12 mx-auto my-24 gap-4">
				<div className="col-span-3">
					<Sidebar />
				</div>
				<div className="col-span-9">
					<div className="mb-6">
						<input type="text" placeholder="Nhập từ khóa tìm kiếm..." className="w-full px-3 py-1 border focus:outline-slate-400" />
					</div>
					<ProductList />
				</div>
			</div>
		</div>
	);
};
