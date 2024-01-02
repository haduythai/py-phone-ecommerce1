import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import { RootRoutes } from "../../routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const Main = () => {
	return (
		<>
			<Header />
			<main className="my-4">
				<RootRoutes />
			</main>
			<Footer />
			<ToastContainer />
		</>
	);
};
