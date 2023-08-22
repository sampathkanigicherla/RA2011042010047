
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SingleTrainPage({ match }) {
  const trainId = match.params.trainId;
  const [train, setTrain] = useState(null);
  const [authToken, setAuthToken] = useState("");

  useEffect(() => {
    
    getAuthorizationToken();


    fetchTrainDetails(trainId);
  }, [trainId]);

  const getAuthorizationToken = async () => {
    const authRequestData = {
      companyName: "Train Central",
      clientID: "b46128a0-fbde-4c16-a4b1-6ae6ad718e27",
      ownerName: "Ram",
      ownerEmail: "ram@abc.edu",
      rollNo: "1",
      clientSecret: "XOyo10RPayKBODAN"
    };

    try {
      const response = await axios.post("http://20.244.56.144/train/auth", authRequestData);
      const token = response.data.access_token;
      setAuthToken(token);
      console.log("Authorization token obtained:", token);
    } catch (error) {
      console.error("Authorization token retrieval failed:", error);
    }
  };

  const fetchTrainDetails = async (trainId) => {
    try {
      const response = await axios.get(`http://20.244.56.144:80/train/trains/${trainId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });

      const processedTrain = {
        trainName: response.data.trainName,
        trainNumber: response.data.trainNumber,
        departureTime: {
          hours: response.data.departureTime.Hours,
          minutes: response.data.departureTime.Minutes,
          seconds: response.data.departureTime.Seconds
        },
        seatsAvailable: {
          sleeper: response.data.seatsAvailable.sleeper,
          AC: response.data.seatsAvailable.AC
        },
        price: {
          sleeper: response.data.price.sleeper,
          AC: response.data.price.AC
        },
        delayedBy: response.data.delayedBy
      };

      setTrain(processedTrain);
    } catch (error) {
      console.error("Error fetching train details:", error);
      setTrain(null);
    }
  };

  if (!train) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{train.trainName}</h1>
      <p>Train Number: {train.trainNumber}</p>
      <p>Departure Time: {train.departureTime.hours}:{train.departureTime.minutes}:{train.departureTime.seconds}</p>
      <p>Seats Available: Sleeper: {train.seatsAvailable.sleeper}, AC: {train.seatsAvailable.AC}</p>
      <p>Price: Sleeper: {train.price.sleeper}, AC: {train.price.AC}</p>
      <p>Delayed By: {train.delayedBy} minutes</p>
      
</div>);
}
export default SingleTrainPage;