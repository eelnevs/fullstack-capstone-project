import React, { useState } from "react";
import { camelToTitleCase } from "../../util/util";

import "./RegisterPage.css";

function RegisterPage() {

	//insert code here to create useState hook variables for firstName, lastName, email, password
	const [user, setUser] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: ""
	});

	// insert code here to create handleRegister function and include console.log
	const handleRegister = () => {
		console.log("Register", user);
	};

	return (
		<div className="container mt-5">
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
	); //end of return
}

export default RegisterPage;
