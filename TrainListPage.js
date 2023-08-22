// src/TrainListPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TrainCard from './TrainCard';

function TrainListPage() {
  const [trains, setTrains] = useState([]);
  const [authToken, setAuthToken] = useState("");

  useEffect(() => {
    // Retrieve the authorization token
    getAuthorizationToken();

    // Fetch train data from API
    fetchAndProcessTrainData();
  }, []);

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
  
    const fetchAndProcessTrainData = async () => {
      try {
        const response = await axios.get("http://20.244.56.144:80/train/trains", {
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        });
  
        const processedTrains = response.data.map(train => ({
          trainName: train.trainName,
          trainNumber: train.trainNumber,
          departureTime: {
            hours: train.departureTime.Hours,
            minutes: train.departureTime.Minutes,
            seconds: train.departureTime.Seconds
          },
          seatsAvailable: {
            sleeper: train.seatsAvailable.sleeper,
            AC: train.seatsAvailable.AC
          },
          price: {
            sleeper: train.price.sleeper,
            AC: train.price.AC
          },
          delayedBy: train.delayedBy
        }));
  
        setTrains(processedTrains);
      } catch (error) {
        console.error("Error fetching train data:", error);
        setTrains([]);
      }
    };
  
    return (
      <div>
        <h1>All Trains</h1>
        {trains.map(train => (
          <TrainCard key={train.trainNumber} train={train} />
        ))}
      </div>
    );
  }
  export default TrainListPage;    