import { bookingsEndpoint, options } from "../constants/api";

export async function fetchBookings() {
  
  try {
    const response = await fetch(bookingsEndpoint, {
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
    return data.data; // Assuming `data` contains a `data` array as per your sample response
  } catch (error) {
    console.error("Error fetching bookings:", error);
    throw error;
  }
}
