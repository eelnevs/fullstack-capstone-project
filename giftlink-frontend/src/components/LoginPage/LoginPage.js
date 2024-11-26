import React, { useState } from "react";
import "./LoginPage.css";
import { camelToTitleCase } from "../../util/util";

function LoginPage() {
	//insert code here to create useState hook variables for email, password
	const [login, setLogin] = useState({
		email: "",
		password: "",
	});

	// insert code here to create handleLogin function and include console.log
	const handleLogin = () => {
		console.log("Login: ",login);
	};

	return (
		<div className="container mt-5">
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
							<a href="/app/register" className="text-primary">
								Register Here
							</a>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default LoginPage;
