import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { nanoid } from "nanoid";
import { getListCategory } from "../../../api/apiCategory";
import { postProduct } from "../../../api/apiProduct";
import { toast } from "react-toastify";

const myId = nanoid();

export const ModalAddProduct = (props: any) => {
	const { setOpenModal } = props;

	interface Product {
		id: string | number;
		name: string | null;
		thumbnail: string | null;
		description: string | null;
		importPrice: number | null;
		currentPrice: number | null;
		discountPrice: number | null;
		importQuantity: number | null;
		amountSold: number | null;
		categoryId: number | null;
	}
	const [product, setProduct] = useState<Product>({
		id: myId,
		name: null,
		thumbnail: null,
		description: null,
		importPrice: null,
		currentPrice: null,
		discountPrice: null,
		importQuantity: null,
		amountSold: 0,
		categoryId: null,
	});

	const [listCategory, setListCategory] = useState<any[]>([]);

	const fetchListCategory = async () => {
		const resListCategory = await getListCategory();
		setListCategory(resListCategory);
	};

	// event handlers
	const handleChangeValue = (e: any) => {
		const { name, value } = e.target;
		if (value) {
			setProduct({
				...product,
				[name]: value,
			});
		}
	};

	const handleSaveProduct = async () => {
		const res = await postProduct(product);
		if (res.status === 201) {
			toast.success("Tạo mới sản phẩm thành công!");
			setOpenModal(false);
		}
	};

	useEffect(() => {
		fetchListCategory();
	}, []);

	return (
		<div className="fixed z-10 inset-0 w-full h-full flex items-center justify-center bg-gray-400 bg-opacity-80">
			<div className="w-1/2 min-h-40 mx-auto p-4 bg-white rounded-md">
				<div className="modal-p-header mb-4 border-b flex items-center justify-between">
					<h2 className="text-2xl font-semibold uppercase py-2">Thêm mới sản phẩm</h2>
					<span
						onClick={() => {
							setOpenModal(false);
						}}
					>
						<IoMdClose size={32} className="hover:text-red-500 cursor-pointer" />
					</span>
				</div>
				<div className="modal-p-body my-6">
					<div className="grid grid-cols-12 items-center gap-4">
						<div className="col-span-6">
							<div className="flex flex-col">
								<label htmlFor="">Tên sản phẩm</label>
								<input
									type="text"
									onChange={handleChangeValue}
									className="px-3 py-1 border border-gray-400 focus:outline-slate-400 rounded-lg"
									name="name"
									id="name"
									placeholder="Nhập tên sản phẩm"
								/>
							</div>
						</div>
						<div className="col-span-6">
							<div className="flex flex-col">
								<label htmlFor="">Giá nhập</label>
								<input
									type="number"
									onChange={handleChangeValue}
									defaultValue={0}
									min={0}
									className="px-3 py-1 border border-gray-400 focus:outline-slate-400 rounded-lg"
									name="importPrice"
									id="importPrice"
									placeholder="Giá nhập"
								/>
							</div>
						</div>
						<div className="col-span-6">
							<div className="flex flex-col">
								<label htmlFor="">Giá bán</label>
								<input
									type="number"
									onChange={handleChangeValue}
									defaultValue={0}
									min={0}
									className="px-3 py-1 border border-gray-400 focus:outline-slate-400 rounded-lg"
									name="currentPrice"
									id="currentPrice"
									placeholder="Nhập mô tả sản phẩm"
								/>
							</div>
						</div>
						<div className="col-span-6">
							<div className="flex flex-col">
								<label htmlFor="">Giá khuyến mãi</label>
								<input
									type="number"
									onChange={handleChangeValue}
									defaultValue={0}
									min={0}
									className="px-3 py-1 border border-gray-400 focus:outline-slate-400 rounded-lg"
									name="discountPrice"
									id="discountPrice"
									placeholder="Nhập mô tả sản phẩm"
								/>
							</div>
						</div>
						<div className="col-span-6">
							<div className="flex flex-col">
								<label htmlFor="">Số lượng nhập về</label>
								<input
									type="number"
									onChange={handleChangeValue}
									defaultValue={0}
									min={0}
									className="px-3 py-1 border border-gray-400 focus:outline-slate-400 rounded-lg"
									name="importQuantity"
									id="importQuantity"
									placeholder="Nhập mô tả sản phẩm"
								/>
							</div>
						</div>
						<div className="col-span-6">
							<div className="flex flex-col">
								<label htmlFor="categoryId">Hãng sản xuất</label>
								<select name="categoryId" id="categoryId" className="px-3 py-1 border border-gray-400 focus:outline-slate-400 rounded-lg" onChange={handleChangeValue}>
									<option value="">Chọn hãng sản xuất</option>
									{listCategory.map((iCat) => {
										return (
											<option key={iCat.id} value={iCat.id}>
												{iCat.name}
											</option>
										);
									})}
								</select>
							</div>
						</div>
						<div className="col-span-12">
							<div className="flex flex-col">
								<label htmlFor="">Hình ảnh sản phẩm</label>
								<input
									type="text"
									onChange={handleChangeValue}
									className="px-3 py-1 border border-gray-400 focus:outline-slate-400 rounded-lg"
									name="thumbnail"
									id="thumbnail"
									placeholder="Đính kèm link hình ảnh sản phẩm"
								/>
							</div>
						</div>
						<div className="col-span-12">
							<div className="flex flex-col">
								<label htmlFor="">Mô tả sản phẩm</label>
								<textarea
									onChange={handleChangeValue}
									className="p-2 border border-gray-400 focus:outline-slate-400 rounded-lg"
									rows={4}
									name="description"
									id="description"
									placeholder="Nhập mô tả sản phẩm"
								/>
							</div>
						</div>
					</div>
				</div>
				<div className="modal-p-footer float-end">
					<button type="button" onClick={handleSaveProduct} className="px-10 py-2 bg-cyan-500 text-white rounded-md hover:opacity-70">
						Lưu
					</button>
				</div>
			</div>
		</div>
	);
};
