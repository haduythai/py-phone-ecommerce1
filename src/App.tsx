import { BrowserRouter } from "react-router-dom";
import { Main } from "./layout/Main/Main";
import { AuthProvider } from "./services/context/AuthProvider";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
	return (
		<BrowserRouter>
			<AuthProvider>
				<Main />
				<ToastContainer />
			</AuthProvider>
		</BrowserRouter>
	);
}

export default App;
