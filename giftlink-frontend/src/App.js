import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import MainPage from "./components/MainPage/MainPage";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import RegisterPage from "./components/RegisterPage/RegisterPage";
import LoginPage from "./components/LoginPage/LoginPage";
import DetailsPage from "./components/DetailsPage/DetailsPage";
import SearchPage from "./components/SearchPage/SearchPage";

function App() {
	const navigate = useNavigate();
	return (
		<>
			<Navbar />
			<button
				title="To Top"
				className="btn to-top"
				style={{ zIndex: "1000" }}
				onClick={() => window.scrollTo(0, 0)}
			>
				<i className="fa-solid fa-circle-chevron-up rounded-circle" />
			</button>
			<Routes>
				{/* the final code will not pass the products to every page, but each page will call the server API */}
				<Route path="/" element={<MainPage />} />
				<Route path="/app" element={<MainPage />} />
				<Route path="/app/login" element={<LoginPage />} />
				<Route path="/app/register" element={<RegisterPage />} />
				<Route
					path="/app/product/:productId"
					element={<DetailsPage />}
				/>
				<Route path="/app/search" element={<SearchPage />} />
			</Routes>
		</>
	);
}

export default App;
