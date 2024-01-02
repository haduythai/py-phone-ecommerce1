import { Route, Routes } from "react-router-dom";
import { publicRoutes } from "./publicRoutes";
import { privateRoutes } from "./privateRoutes";

export const RootRoutes = () => {
	return (
		<Routes>
			<Route path="/">
				{publicRoutes}
				{privateRoutes}
			</Route>
		</Routes>
	);
};
