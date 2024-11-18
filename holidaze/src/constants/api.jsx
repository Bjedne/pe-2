const baseURL = process.env.REACT_APP_BASE_URL;
export const apiKey = process.env.REACT_APP_API_KEY;

export const bookingsEndpoint = `${baseURL}holidaze/bookings`;
export const venuesEndpoint = `${baseURL}holidaze/venues`;
export const profileEndpoint = `${baseURL}holidaze/profile`;
export const registerEndpoint = `${baseURL}auth/register`;
export const loginEndpoint = `${baseURL}auth/login?_holidaze=true`;

export const options = {
    headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        "X-Noroff-API-Key": ""
    }
}