import { fetchVenues } from '../../api/venues.jsx';

test('fetchVenues fetches data correctly', async () => {
  const data = await fetchVenues();
  expect(data).toBeDefined();
  expect(Array.isArray(data.data)).toBe(true);
});