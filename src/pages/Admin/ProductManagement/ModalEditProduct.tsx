import { useEffect, useState } from "react";
import { Product } from "./ModalAddProduct";
import { nanoid } from "nanoid";
import { IoMdClose } from "react-icons/io";
import { getListCategory } from "../../../api/apiCategory";
import { getProductById, updateProduct } from "../../../api/apiProduct";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const myId = nanoid();

const ModalEditProduct = (props: any) => {
	const { id, openModalUpdate, setOpenModalUpdate } = props;
	const [product, setProduct] = useState<Product>({
		id: "",
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

	const fetchProductById = async () => {
		const dataProduct = await getProductById(id);
		setProduct({
			...product,
			...dataProduct,
		});
	};
	// event handlers
	const handleUpdateProduct = async () => {
		Swal.fire({
			icon: "question",
			title: "Bạn chắc chắn muốn cập nhật thông tin sản phẩm này?",
			showConfirmButton: true,
			showCancelButton: true,
			confirmButtonText: "Đồng ý",
			cancelButtonText: "Hủy",
		}).then(async (result) => {
			if (result.isConfirmed) {
				const res = await updateProduct(id, product);
				if (res.status === 200) {
					toast.success("Cập nhật thông tin sản phẩm thành công!");
					setOpenModalUpdate(false);
				} else {
					console.log(res);
					toast.success("Có lỗi xảy ra!");
					setOpenModalUpdate(false);
				}
			}
		});
	};

	const handleChangeValue = (e: any) => {
		const { name, value } = e.target;
		if (value) {
			setProduct({
				...product,
				[name]: value,
			});
		}
	};

	const handleCancel = () => {
		setOpenModalUpdate(false);
	};

	useEffect(() => {
		fetchListCategory();
	}, []);

	useEffect(() => {
		fetchProductById();
	}, [id]);
	return (
		<div className="fixed z-10 inset-0 w-full h-full flex items-center justify-center bg-gray-400 bg-opacity-80">
			<div className="w-1/2 min-h-40 mx-auto p-4 bg-white rounded-md">
				<div className="modal-p-header mb-4 border-b flex items-center justify-between">
					<h2 className="text-2xl font-semibold uppercase py-2">Cập nhật sản phẩm</h2>
					<span
						onClick={() => {
							setOpenModalUpdate(false);
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
									value={product?.name || ""}
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
									value={product?.importPrice || 0}
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
									value={product?.currentPrice || 0}
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
									value={product?.discountPrice || 0}
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
									value={product?.importQuantity || 0}
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
								<select
									name="categoryId"
									id="categoryId"
									value={product?.categoryId || 0}
									className="px-3 py-1 border border-gray-400 focus:outline-slate-400 rounded-lg"
									onChange={handleChangeValue}
								>
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
								<label htmlFor="">Link hình ảnh sản phẩm</label>
								<input
									type="text"
									onChange={handleChangeValue}
									value={product?.thumbnail || ""}
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
									value={product?.description || ""}
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
				<div className="modal-p-footer float-end flex items-center gap-4">
					<button type="button" onClick={handleUpdateProduct} className="px-10 py-2 bg-cyan-500 text-white rounded-md hover:opacity-70">
						Cập nhật
					</button>
					<button type="button" onClick={handleCancel} className="px-10 py-2 bg-cyan-500 text-white rounded-md hover:opacity-70">
						Hủy
					</button>
				</div>
			</div>
		</div>
	);
};

export default ModalEditProduct;
