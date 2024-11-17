import { venuesEndpoint } from '../constants/api.jsx';

export async function fetchVenues() {
  try {
      const response = await fetch(venuesEndpoint);
      if (!response.ok) {
      throw new Error('Network response was not ok');
      }
      const venues = await response.json();
      console.log(venues);
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
      console.log(venue.data);
      return venue;
  } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
  }
}