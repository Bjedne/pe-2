import { useState } from "react";
import { Input } from "@headlessui/react";
import { Link, useNavigate } from "react-router-dom";
import { registerEndpoint } from "../../constants/api";

export function Register() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "", venueManager: false });
  const [errors, setErrors] = useState({ name: "", email: "", password: "", venueManager: "" });
  const [notification, setNotification] = useState(""); // Notification message state
  const [apiError, setApiError] = useState(""); // API error message state
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = { name: "", email: "", password: "", venueManager: "" };

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
    } else if (/[^a-zA-Z0-9_ ]/.test(formData.name)) {
      newErrors.name = "Name can only contain letters, numbers, spaces, and underscores.";
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!formData.email.endsWith("@stud.noroff.no")) {
      newErrors.email = "Email must be a '@stud.noroff.no' address.";
    }

    // Password validation
    if (!formData.password.trim()) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    }

    // Venue Manager validation
    if (formData.venueManager === null) {
      newErrors.venueManager = "Please select an account type.";
    }

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError(""); // Clear any previous error messages
    if (validate()) {
      try {
        const response = await fetch(registerEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          setNotification("Account created! Please log in.");
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        } else {
          const errorData = await response.json();
          console.log(errorData);
          setApiError(errorData.errors[0].message || "An unexpected error occurred.");
        }
      } catch (error) {
        setApiError("Unable to connect to the server. Please try again later.");
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAccountType = (isVenueManager) => {
    setFormData({ ...formData, venueManager: isVenueManager });
  };

  return (
    <div className="flex-1 bg-pearl">
      <div className="flex flex-col">
        <div className="text-center mt-8 mb-8">
          <h1 className="text-2xl mb-1 font-bold">Welcome to Holidaze!</h1>
          <p className="font-body">
            already registered? <Link to="/login" className="underline">Log in</Link>
          </p>
        </div>
        <div className="flex flex-col flex-wrap mx-auto gap-2 mb-8">
          <h2 className="flex-1">Please choose an account type:</h2>
          <div className="flex gap-5">
            <button
              type="button"
              onClick={() => handleAccountType(false)}
              className={`px-4 py-2 rounded-xl border ${
                formData.venueManager === false
                  ? "bg-leaf text-white border-black"
                  : "bg-neutral border-leaf"
              }`}
            >
              Customer
            </button>
            <button
              type="button"
              onClick={() => handleAccountType(true)}
              className={`px-4 py-2 rounded-xl border ${
                formData.venueManager === true
                  ? "bg-leaf text-white border-black"
                  : "bg-neutral border-leaf"
              }`}
            >
              Venue Manager
            </button>
          </div>
          {errors.venueManager && <p className="text-danger">{errors.venueManager}</p>}
        </div>
        
        {notification && <p className="notification">{notification}</p>}
        {/* Error message in case there is an error with the POST request */}
        {apiError && <p className="text-danger text-center mb-4">Error: {apiError}</p>}
        
        <form
          className="flex flex-col bg-white border border-neutral py-5 w-80 mx-auto gap-1 rounded-xl drop-shadow mb-8"
          onSubmit={handleSubmit}
        >
          <label htmlFor="name" className="ms-4">Name</label>
          <Input
            type="text"
            name="name"
            className="border data-[hover]:shadow data-[focus]:bg-blue-100 p-2 mx-4 rounded-lg"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <p className="text-danger ms-4">{errors.name}</p>}

          <label htmlFor="email" className="mt-2 ms-4">Email</label>
          <Input
            type="text"
            name="email"
            className="border data-[hover]:shadow data-[focus]:bg-blue-100 p-2 mx-4 rounded-lg"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="text-danger ms-4">{errors.email}</p>}

          <label htmlFor="password" className="mt-2 ms-4">Password</label>
          <Input
            type="password"
            name="password"
            className="border data-[hover]:shadow data-[focus]:bg-blue-100 p-2 mx-4 rounded-lg"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <p className="text-danger ms-4">{errors.password}</p>}

          <button
            type="submit"
            className="bg-leaf text-white px-4 my-4 py-2 rounded-xl border border-black w-11/12 mx-auto"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}