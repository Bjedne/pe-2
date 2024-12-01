import { Calendar } from "react-calendar";

export function BookingSection({
  venue,
  bookedDates,
  date,
  setDate,
}) {
  if (!venue) return null; // Don't render until venue data is available

  const isDateDisabled = (date) =>
    bookedDates.some((d) => d.toDateString() === date.toDateString());

  return (
    <div>
      <h1 className="text-center mb-2">Choose the date of your booking:</h1>
      <Calendar
        onChange={setDate}
        value={date}
        selectRange={true}
        tileDisabled={({ date }) => isDateDisabled(date)}
        className="mx-auto"
      />
    </div>
  );
}
