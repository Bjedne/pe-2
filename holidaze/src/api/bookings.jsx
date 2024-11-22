import { options, venuesEndpoint } from "../constants/api";

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
