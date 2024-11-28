import React, { useState } from "react";
import { camelToTitleCase } from "../../util/util";
import { urlConfig } from "../../config";
import { useAppContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

import "./RegisterPage.css";

function RegisterPage() {
	//insert code here to create useState hook variables for firstName, lastName, email, password
	const [user, setUser] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
	});

	const [error, setError] = useState("");
	const navigate = useNavigate();
	const { setIsLoggedIn } = useAppContext();

	const showError = (error) => {
		setError(error);
		setTimeout(() => {
			setError('');
		}, 3000);
	}

	// insert code here to create handleRegister function and include console.log
	const handleRegister = async () => {
		try {
			const response = await fetch(
				`${urlConfig.backendUrl}/api/auth/register`,
				{
					method: "post",
					headers: {
						"content-type": "application/json",
					},
					body: JSON.stringify(user),
				}
			);
			const data = await response.json();
			if (!data) {
				throw Error("Registration failed");
			}
			if (data.authtoken) {
				sessionStorage.setItem("auth-token", data.authtoken);
				sessionStorage.setItem("name", data.firstName);
				sessionStorage.setItem("email", data.email);
				setIsLoggedIn(true);
				navigate("/app");
			} else {
				return showError(`${data.error ?? "Registration failed"}`);
			}
		} catch (error) {
			console.log("Error fetching details: " + error.message);
			showError("Cannot register user");
		}
	};

	return (
		<div className="row justify-content-center">
			{!!error && <div className="alert alert-error">{error}</div>}
			<div className="container mt-4">
				<div className="row justify-content-center">
					<div className="col-md-6 col-lg-4">
						<div className="register-card p-4 border rounded">
							<h2 className="text-center mb-4 font-weight-bold">
								Register
							</h2>

							{/* insert code here to create input elements for all the variables - firstName, lastName, email, password */}
							{Object.keys(user).map((x) => (
								<div key={x} className="mb-3">
									<label htmlFor={x} className="form label">
										{camelToTitleCase(x)}
									</label>
									<input
										id={x}
										type="text"
										className="form-control"
										value={user[x]}
										onChange={(e) =>
											setUser({
												...user,
												[x]: e.target.value,
											})
										}
									/>
								</div>
							))}
							{/* insert code here to create a button that performs the `handleRegister` function on click */}
							<button
								className="btn btn-primary mt-4 mb-3"
								onClick={handleRegister}
							>
								Register
							</button>
							<p className="mt-4 text-center">
								Already a member?{" "}
								<a href="/app/login" className="text-primary">
									Login
								</a>
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	); //end of return
}

export default RegisterPage;
