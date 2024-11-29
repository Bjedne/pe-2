import { venuesEndpoint, options, profileEndpoint } from '../constants/api.jsx';

export async function fetchVenues() {
  try {
      const response = await fetch(venuesEndpoint);
      if (!response.ok) {
      throw new Error('Network response was not ok');
      }
      const venues = await response.json();
      return venues;
  } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
  }
}

export async function fetchVenuesById(id) {
  try {
      const response = await fetch(`${venuesEndpoint}/${id}`);
      if (!response.ok) {
      throw new Error("Network response was not ok");
      }
      const venue = await response.json();
      return venue;
  } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
  }
}

export async function venueByProfile() {
  try {
      const response = await fetch(`${profileEndpoint}/${localStorage.getItem("name")}/venues?_owner=true`, {
      method: 'GET',
      headers: {
        ...options.headers,
          'Content-Type': 'application/json',
      },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch venues by profile: ${response.statusText}`);
      }

      const data = await response.json();
      return data.data;
} catch (error) {
    console.error('Error fetching venues:', error);
    throw error;
  }
}