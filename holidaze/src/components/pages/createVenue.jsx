import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@headlessui/react";
import { venuesEndpoint, options } from "../../constants/api";

export function CreateVenue() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    maxGuests: "",
    location: "",
    city: "",
    image: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestBody = {
      name: formData.name,
      description: formData.description,
      price: parseInt(formData.price, 10),
      maxGuests: parseInt(formData.maxGuests, 10),
      media: formData.image
        ? [{ url: formData.image, alt: `${formData.name} image` }]
        : undefined,
      location: {
        address: formData.location || null,
        city: formData.city || null,
      },
    };

    try {
      const response = await fetch(venuesEndpoint, {
        method: "POST",
        headers: {
          ...options.headers,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create venue.");
      }

      setSuccessMessage("Venue created successfully!");
      setErrorMessage("");
      setFormData({
        name: "",
        description: "",
        price: "",
        maxGuests: "",
        location: "",
        city: "",
        image: "",
      });

      setTimeout(() => {
        navigate('/profile');
      }, 1300);

    } catch (error) {
      setErrorMessage(error.message);
      setSuccessMessage("");
    }
  };

  return (
    <div className="flex-1 bg-pearl">
      <h1 className="text-3xl text-center mt-8">Create Venue</h1>
      <form className="flex flex-col gap-2 mb-8" onSubmit={handleSubmit}>
        <label htmlFor="name" className="ms-4">
          Venue Title
        </label>
        <Input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className="border data-[hover]:shadow data-[focus]:bg-blue-100 p-2 mx-4 rounded-lg"
          placeholder="e.g. The Grand Hotel"
          required
        />

        <label htmlFor="description" className="ms-4">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          className="border data-[hover]:shadow data-[focus]:bg-blue-100 p-2 mx-4 rounded-lg"
          placeholder="e.g. A luxurious hotel with a view"
          required
        />

        <div className="flex max-w-screen">
          <div className="flex flex-col">
            <label htmlFor="price" className="ms-4">
              Price per night
            </label>
            <Input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className="border data-[hover]:shadow data-[focus]:bg-blue-100 p-2 mx-4 rounded-lg w-40"
              placeholder="e.g. 1500"
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="maxGuests" className="ms-4">
              Max Guests
            </label>
            <Input
              type="number"
              name="maxGuests"
              value={formData.maxGuests}
              onChange={handleInputChange}
              className="border data-[hover]:shadow data-[focus]:bg-blue-100 p-2 mx-4 rounded-lg w-20"
              placeholder="e.g. 4"
              required
            />
          </div>
        </div>

        <label htmlFor="location" className="ms-4">
          Location
        </label>
        <Input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleInputChange}
          className="border data-[hover]:shadow data-[focus]:bg-blue-100 p-2 mx-4 rounded-lg"
          placeholder="e.g. 123 Main Street"
        />

        <label htmlFor="city" className="ms-4">
          City
        </label>
        <Input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleInputChange}
          className="border data-[hover]:shadow data-[focus]:bg-blue-100 p-2 mx-4 rounded-lg"
          placeholder="e.g. New York"
        />

        <label htmlFor="image" className="ms-4">
          Image URL
        </label>
        <Input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleInputChange}
          className="border data-[hover]:shadow data-[focus]:bg-blue-100 p-2 mx-4 rounded-lg"
          placeholder="e.g. https://www.example.com/image.jpg"
        />
        
        {/* Success and Error Messages */}
      {successMessage && (
        <div className="fixed left-1/2 transform -translate-x-1/2 bg-leaf text-white px-4 py-2 rounded shadow-lg">
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div className="fixed left-1/2 transform -translate-x-1/2 bg-danger text-white px-4 py-2 rounded shadow-lg">
          {errorMessage}
        </div>
      )}

        <button
          type="submit"
          className="bg-leaf px-4 py-3 my-4 rounded-xl text-white w-1/2 mx-auto"
        >
          Create Venue
        </button>
      </form>

      
    </div>
  );
}
