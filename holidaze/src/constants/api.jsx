const baseURL = "https://v2.api.noroff.dev/"
export const bookingsEndpoint = `${baseURL}holidaze/bookings`;
export const venuesEndpoint = `${baseURL}holidaze/venues`;
export const profileEndpoint = `${baseURL}holidaze/profile`;
export const registerEndpoint = `${baseURL}auth/register`;
export const loginEndpoint = `${baseURL}auth/login?_holidaze=true`;

export const options = {
    headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        "X-Noroff-API-Key": "cf08b48a-b9c1-420b-9add-e17230ad0cb2"
    }
}