import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { urlConfig } from "../../config";
import "./SearchPage.css"

function SearchPage() {
	//Task 1: Define state variables for the search query, age range, and search results.
	const categories = ["Living", "Bedroom", "Bathroom", "Kitchen", "Office"];
	const conditions = ["New", "Like New", "Older"];
	const [searchQuery, setSearchQuery] = useState({
		name: "",
		category: "",
		condition: "",
		age_years: 10,
	});
	const [searchResults, setSearchResults] = useState([]);

	useEffect(() => {
		// fetch all products
		const fetchProducts = async () => {
			try {
				let url = `${urlConfig.backendUrl}/api/gifts`;
				console.log(url);
				const response = await fetch(url);
				if (!response.ok) {
					//something went wrong
					throw new Error(`HTTP error; ${response.status}`);
				}
				const data = await response.json();
				setSearchResults(data);
			} catch (error) {
				console.log("Fetch error: " + error.message);
			}
		};

		fetchProducts();
	}, []);

	// Task 2. Fetch search results from the API based on user inputs.
	const fetchSearch = async () => {
		try {
			const params = new URLSearchParams(searchQuery).toString();
			console.log("params: ", params);
			const response = await fetch(
				`${urlConfig.backendUrl}/api/search?${params}`
			);
			if (!response.ok) {
				//something went wrong
				throw new Error(`HTTP error; ${response.status}`);
			}
			const data = await response.json();
			setSearchResults(data);
		} catch (error) {
			console.log("Fetch error for search: " + error.message);
		}
	};

	const navigate = useNavigate();

	const goToDetailsPage = (productId) => {
		// Task 6. Enable navigation to the details page of a selected gift.
		navigate(`/app/product/${productId}`);
	};

	return (
		<div className="container mt-5">
			<div className="row justify-content-center">
				<div className="col-md-6">
					<div className="filter-section mb-3 p-3 border rounded">
						<h5>Filters</h5>
						<div className="d-flex flex-column">
							{/* Task 3: Dynamically generate category and condition dropdown options.*/}
							<div className="mt-3 mb-1">
								<label
									htmlFor="category"
									className="form label mb-2"
								>
									Category
								</label>
								<select
									id="category"
									className="form-control dropdown-filter"
									onChange={(e) =>
										setSearchQuery({
											...searchQuery,
											category: e.target.value,
										})
									}
									defaultValue=""
								>
									<option value="">All</option>
									{categories.map((c, i) => (
										<option key={i} value={c}>
											{c}
										</option>
									))}
								</select>
							</div>
							<div className="mb-1">
								<label
									htmlFor="condition"
									className="form label mb-2"
								>
									Condition
								</label>
								<select
									id="condition"
									className="form-control dropdown-filter"
									onChange={(e) =>
										setSearchQuery({
											...searchQuery,
											condition: e.target.value,
										})
									}
									defaultValue=""
								>
									<option value="">All</option>
									{conditions.map((c, i) => (
										<option key={i} value={c}>
											{c}
										</option>
									))}
								</select>
							</div>
							{/* Task 4: Implement an age range slider and display the selected value. */}
							<div className="mb-1">
								<label htmlFor="age" className="form label">
									Less than {searchQuery.age_years} years
								</label>
								<br />
								<input
									id="age"
									value={searchQuery.age_years}
									type="range"
									onChange={(e) =>
										setSearchQuery({
											...searchQuery,
											age_years: e.target.value,
										})
									}
									min="1"
									max="10"
                                    className="age-range-slider"
								/>
							</div>
						</div>
					</div>
					{/* Task 7: Add text input field for search criteria*/}
					<div className="mb-4">
						<label htmlFor="name" className="form label">
							Name
						</label>
						<input
							id="name"
							className="form-control search-input"
							value={searchQuery.name}
							onChange={(e) =>
								setSearchQuery({
									...searchQuery,
									name: e.target.value,
								})
							}
						/>
					</div>
					{/* Task 8: Implement search button with onClick event to trigger search:*/}
					<button className="btn search-button" onClick={fetchSearch}>
						Search
					</button>
					{/*Task 5: Display search results and handle empty results with a message. */}
					<div className="search-results mt-4">
						{searchResults.length > 0 ? (
							searchResults.map((gift) => (
								<div key={gift.id} className="card mb-4 search-results-card">
									<div className="image-placeholder">
										{!gift.image ? (
											<div className="no-image-available">
												No image available
											</div>
										) : (
											<img
												src={gift.image}
												alt={gift.name}
												className="card-img-top"
											></img>
										)}
									</div>
									<div className="card-body">
										<h4 className="card-title">
											{gift.name}
										</h4>
										<p className={`card-text`}>
											{gift.description.slice(0, 100)}
											...
										</p>
										<button
											onClick={() =>
												goToDetailsPage(gift.id)
											}
											className="btn btn-primary"
										>
											View Details
										</button>
									</div>
								</div>
							))
						) : (
							<div className="alert alert-info" role="alert">
								No product found
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default SearchPage;
