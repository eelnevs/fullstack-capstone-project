import React, { useEffect, useState } from "react";
import "./LoginPage.css";
import { camelToTitleCase } from "../../util/util";
import { urlConfig } from "../../config";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/AuthContext";

function LoginPage() {
	//insert code here to create useState hook variables for email, password
	const [login, setLogin] = useState({
		email: "",
		password: "",
	});

	const [error, setError] = useState("");
	const navigate = useNavigate();
	const bearerToken = sessionStorage.getItem("bearer-token");
	const { setIsLoggedIn } = useAppContext();

	const showError = (error) => {
		setError(error);
		setTimeout(() => {
			setError("");
		}, 3000);
	};

	useEffect(() => {
		if (sessionStorage.getItem("auth-token")) {
			navigate("/app");
		}
	}, [navigate]);

	// insert code here to create handleLogin function and include console.log
	const handleLogin = async () => {
		try {
			//first task
			const response = await fetch(
				`${urlConfig.backendUrl}/api/auth/login`,
				{
					//{{Insert code here}} //Task 7: Set method
					method: "post",
					//{{Insert code here}} //Task 8: Set headers
					headers: {
						"content-type": "application/json",
						Authorization: bearerToken
							? `Bearer ${bearerToken}`
							: "",
					},
					//{{Insert code here}} //Task 9: Set body to send user details
					body: JSON.stringify(login),
				}
			);
			// Task 1: Access data coming from fetch API
			const data = await response.json();
			if (!data) {
				throw Error("No user details");
			}
			console.log(data);
			if (data.authtoken) {
				// Task 2: Set user details
				sessionStorage.setItem("auth-token", data.authtoken);
				sessionStorage.setItem("name", data.userName);
				sessionStorage.setItem("email", data.userEmail);
				// Task 3: Set the user's state to log in using the `useAppContext`.
				setIsLoggedIn(true);
				// Task 4: Navigate to the MainPage after logging in.
				navigate("/app");
			} else {
				// Task 5: Clear input and set an error message if the password is incorrect
				setLogin({ email: "", password: "" });
				// Task 6: Display an error message to the user.
				return showError(`${data.error ?? "Incorrect password"}`);
			}
		} catch (e) {
			console.log("Error fetching details: " + e.message);
			showError("Login failed");
		}
	};

	return (
		<div className="row justify-content-center">
			{!!error && <div className="alert alert-error">{error}</div>}
			<div className="container mt-4">
				<div className="row justify-content-center">
					<div className="col-md-6 col-lg-4">
						<div className="login-card p-4 border rounded">
							<h2 className="text-center mb-4 font-weight-bold">
								Login
							</h2>

							{/* insert code here to create input elements for the variables email and  password */}
							{Object.keys(login).map((x) => (
								<div key={x} className="mb-3">
									<label htmlFor={x} className="form label">
										{camelToTitleCase(x)}
									</label>
									<input
										id={x}
										type="text"
										className="form-control"
										value={login[x]}
										onChange={(e) =>
											setLogin({
												...login,
												[x]: e.target.value,
											})
										}
									/>
								</div>
							))}

							{/* insert code here to create a button that performs the `handleLogin` function on click */}
							<button
								className="btn btn-primary mt-4 mb-3"
								onClick={handleLogin}
							>
								Login
							</button>
							<p className="mt-4 text-center">
								New here?{" "}
								<a
									href="/app/register"
									className="text-primary"
								>
									Register Here
								</a>
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default LoginPage;
