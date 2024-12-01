import { WifiIcon, BreakfastIcon, ParkingIcon, PetIcon } from "../icons.jsx";

export function Amenities({ venue }) {
  const amenities = [
    { icon: WifiIcon, available: venue.meta?.wifi },
    { icon: BreakfastIcon, available: venue.meta?.breakfast },
    { icon: ParkingIcon, available: venue.meta?.parking },
    { icon: PetIcon, available: venue.meta?.pets },
  ];

  return (
    <div className="flex justify-evenly mb-4">
      {amenities.map((amenity, idx) => (
        <div key={idx} className={amenity.available ? "enabled" : "disabled"}>
          <amenity.icon />
        </div>
      ))}
    </div>
  );
}