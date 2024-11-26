import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { urlConfig } from "../../config";

function MainPage() {
	const [gifts, setGifts] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		// Task 1: Write async fetch operation
		// Write your code below this line
		const fetchData = async () => {
			try {
				const res = await fetch(`${urlConfig.backendUrl}/api/gifts`);
				if (!res.ok) {
					throw new Error(`Error: ${res.status}`);
				}
				const gifts = await res.json();
				setGifts(gifts);
			} catch (error) {
				console.log(`Error fetching data: ${error.message}`);
			}
		};

		fetchData();
	}, []);

	// Task 2: Navigate to details page
	const goToDetailsPage = (productId) => {
		// Write your code below this line
		navigate(`/app/product/${productId}`);
	};

	// Task 3: Format timestamp
	const formatDate = (timestamp) => {
		// Write your code below this line
		const time = new Date(timestamp * 1000);
		return time.toLocaleDateString("en-US");
	};

	const getConditionClass = (condition) => {
		return condition === "New"
			? "list-group-item-success"
			: "list-group-item-warning";
	};

	return (
		<div className="container mt-5">
			<div className="row">
				{gifts.map((gift) => (
					<div key={gift.id} className="col-md-4 mb-4">
						<div className="card product-card">
							{/* // Task 4: Display gift image or placeholder */}
							{/* // Write your code below this line */}
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
								{/* // Task 5: Display gift name */}
								{/* // Write your code below this line */}
                                <h4 className="card-title">{gift.name}</h4>
								<p
									className={`card-text ${getConditionClass(
										gift.condition
									)}`}
								>
									{gift.condition}
								</p>

								{/* // Task 6: Display gift date */}
								{/* // Write your code below this line */}
                                <div className="card-text mb-2">{formatDate(gift.date_added)}</div>
								<button
									onClick={() => goToDetailsPage(gift.id)}
									className="btn btn-primary"
								>
									View Details
								</button>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default MainPage;
