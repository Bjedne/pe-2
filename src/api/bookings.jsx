import { options, profileEndpoint, venuesEndpoint } from "../constants/api";

export async function fetchBookings() {
  try {
    const response = await fetch(venuesEndpoint, {
      method: "GET",
      headers: {
        ...options.headers,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch bookings: ${response.statusText}`);
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching bookings:", error);
    throw error;
  }
}

export async function createBooking() { 
  try {
    const response = await fetch(venuesEndpoint, {
      method: "POST",
      headers: {
        ...options.headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        dateFrom: "",
        dateTo: "",
        guests: 0,
        venueId: "",
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to create booking: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating booking:", error);
    throw error;
  }
}

export async function bookingByProfile() {
  try {
    const response = await fetch(`${profileEndpoint}/${localStorage.getItem("name")}/bookings?_venue=true`, {
      method: "GET",
      headers: {
        ...options.headers,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch bookings by profile: ${response.statusText}`);
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
  console.error("Error fetching bookings by profile:", error);
  throw error;
}}