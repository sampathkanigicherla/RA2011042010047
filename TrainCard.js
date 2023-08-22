import React from 'react';
import { Link } from 'react-router-dom';

function TrainCard({ train }) {
  return (
    <div className="train-card">
      <h2>{train.name}</h2>
      <p>Departure Time: {train.departureTime}</p>
      <p>Price: {train.price}</p>
      <p>Seats Availability: {train.seatsAvailability}</p>
      {/* Other train details */}
      <Link to={`/train/${train.id}`}>View Details</Link>
    </div>
  );
}

export default TrainCard;