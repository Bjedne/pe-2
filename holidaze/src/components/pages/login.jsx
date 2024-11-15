import { useState } from "react";
import { Input } from "@headlessui/react";
import { Link, useNavigate } from "react-router-dom";
import { loginEndpoint } from "../../constants/api";

export function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [apiError, setApiError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError(""); // Clear previous errors

    try {
      const response = await fetch(loginEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();

        // Store data in localStorage
        localStorage.setItem("name", result.data.name);
        localStorage.setItem("accessToken", result.data.accessToken);
        localStorage.setItem("avatarUrl", result.data.avatar.url);
        localStorage.setItem("venueManager", result.data.venueManager);

        navigate("/"); // Redirect to home page
        window.location.reload(); // Reload the page to update the header
      } else {
        const errorData = await response.json();
        setApiError(errorData.message || "Invalid email or password.");
      }
    } catch (error) {
      setApiError("Unable to connect. Please try again later.");
    }
  };

  return (
    <div className="flex-1 bg-pearl">
      <div className="flex flex-col">
        <div className="text-center mt-8 mb-8">
          <h1 className="text-2xl mb-1 font-bold">Welcome back to Holidaze!</h1>
          <p className="font-body">
            not registered?{" "}
            <Link to="/register" className="underline">
              Create an account
            </Link>
          </p>
        </div>

        <div className="flex flex-col flex-wrap mx-auto gap-2 mb-8">
          <form
            className="flex flex-col bg-white border border-neutral py-5 w-80 mx-auto gap-1 rounded-xl drop-shadow mb-8"
            onSubmit={handleSubmit}
          >
            <label htmlFor="email" className="ms-4">
              Email
            </label>
            <Input
              type="text"
              name="email"
              className="border data-[hover]:shadow data-[focus]:bg-blue-100 p-2 mx-4 rounded-lg"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
            />
            <label htmlFor="password" className="ms-4">
              Password
            </label>
            <Input
              type="password"
              name="password"
              className="border data-[hover]:shadow data-[focus]:bg-blue-100 p-2 mx-4 rounded-lg"
              placeholder="Your Password"
              value={formData.password}
              onChange={handleChange}
            />
            {apiError && <p className="text-red-500 text-center">{apiError}</p>}
            <button
              type="submit"
              className="bg-leaf text-white px-4 my-4 py-2 rounded-xl border border-black w-11/12 mx-auto"
            >
              Log in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
