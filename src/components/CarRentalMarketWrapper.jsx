import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CarRentalMarket from "../pages/CarMarket";

const CarRentalMarketWrapper = () => {
  const { brand } = useParams();
  const [carData, setCarData] = useState({
    brandName: brand.charAt(0).toUpperCase() + brand.slice(1),
    carModels: [],
    brandSections: [],
    topModels: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCarData = async () => {
      setIsLoading(true);

      try {
        const response = await fetch(
          `https://car-rental-backend-black.vercel.app/vehicles/manufacturer/${brand}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch car data");
        }

        const data = await response.json();


        // Transform the API response to match your component's expected structure
        setCarData({
          brandName: brand.charAt(0).toUpperCase() + brand.slice(1),
          carModels: Array.isArray(data) ? data : [], // Handle both array and object responses
          brandSections: [], // You might want to fetch these separately
          topModels: [], // You might want to fetch these separately
        });
      } catch (err) {
        setError(err.message);
        setCarData({
          brandName: brand.charAt(0).toUpperCase() + brand.slice(1),
          carModels: [],
          brandSections: [],
          topModels: [],
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchCarData();
  }, [brand]);
  // Loading state
  if (isLoading) {
    return (
      <div className="flex flex-col bg-[#121212] justify-center items-center h-screen">
        <img
          src={`/assets/${brand}-logo.png`}
          alt={`${brand} logo`}
          className="w-24 h-24 mb-4 animate-pulse"
        />
        <div className="text-xl text-gray-600">
          Loading car options...
        </div>
      </div>
    );
  }

  // Error handling
  if (error) {
    return (
      <div className="flex justify-center bg-[#121212] items-center h-screen">
        <div className="text-red-600 text-xl">
          <p>Unable to load {carData.brandName} car rental options</p>
          <p className="text-sm text-gray-500">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Render car rental market with fetched/fallback data
  return <CarRentalMarket {...carData} />;
};

export default CarRentalMarketWrapper;
