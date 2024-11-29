import { options, venuesEditEndpoint } from "../constants/api";

export function DeleteVenue(id) {
  
  return fetch(`${venuesEditEndpoint}/${id}`, {
    method: "DELETE",
    headers: {
      ...options.headers,
      "Content-Type": "application/json",
    },
  });
}