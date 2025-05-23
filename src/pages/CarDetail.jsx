import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useCookies } from "react-cookie";

// Initialize Stripe outside the component
const stripePromise = loadStripe(
  "pk_test_51QGDbHC1170CwYd9Y3Xz2uZx3Z4Q7X9Z8Z3Z4Q7X9Z8Z3Z4Q7X9Z8Z3Z4Q7X9Z8"
);

const PaymentForm = ({
  clientSecret,
  onSuccess,
  onCancel,
  processingPayment,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setError(null);

    try {
      const { error: stripeError, paymentIntent } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        });

      if (stripeError) {
        setError(stripeError.message);
        return;
      }

      if (paymentIntent.status === "succeeded") {
        onSuccess(paymentIntent);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <div className="mb-4">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#fff",
                "::placeholder": {
                  color: "#ccc",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
      </div>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <button
        type="submit"
        disabled={!stripe || processingPayment}
        className="w-full bg-green-600 text-white py-2 rounded disabled:opacity-50"
      >
        {processingPayment ? "Processing..." : "Pay Now"}
      </button>
      <button
        type="button"
        onClick={onCancel}
        className="w-full mt-2 bg-red-400 text-white py-2 rounded"
      >
        Cancel
      </button>
    </form>
  );
};

const DriverSelection = ({
  drivers,
  selectedDriver,
  onSelectDriver,
  loading,
  error,
}) => {
  if (loading) {
    return (
      <div className="flex justify-center py-4">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 p-4 text-center">
        Error loading drivers: {error}
      </div>
    );
  }

  if (drivers.length === 0) {
    return (
      <div className="text-gray-300 p-4 text-center">
        No drivers available for this company
      </div>
    );
  }

  return (
    <div className="mb-6">
      <h3 className="text-lg  mt-5 text-green-600 font-bold mb-3">Select a Driver</h3>
      <div className="flex space-x-4 overflow-x-auto pb-4 driver-scroll-container">
        {drivers.map((driver) => (
          <div
            key={driver._id}
            onClick={() => onSelectDriver(driver)}
            className={`flex-shrink-0 w-48 p-4 border rounded-lg cursor-pointer transition-all ${
              selectedDriver?._id === driver._id
                ? "border-green-600 bg-purple-50"
                : "border-gray-200 hover:border-green-300"
            }`}
          >
            <div className="flex items-center mb-2">
              <img
                src={driver.profileimg || "/default-driver.jpg"}
                alt={driver.name}
                className="w-10 h-10 rounded-full mr-3 object-cover"
              />
              <div>
                <h4 className="font-semibold">{driver.name}</h4>
                <p className="text-sm text-gray-300">{driver.age} years</p>
              </div>
            </div>
            <div className="text-sm">
              <p>
                <span className="font-medium">Experience:</span>{" "}
                {driver.experience} years
              </p>
              <p>
                <span className="font-medium">Rating:</span>{" "}
                {driver.rating || "5.0"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const CarDetailPage = () => {
  const [cookies] = useCookies(["user"]);

  // Vehicle and booking state
  const [vehicle, setVehicle] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [startTime, setStartTime] = useState("10:00");
  const [endTime, setEndTime] = useState("10:00");
  const [location, setLocation] = useState("");

  // Payment state
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const [bookingId, setBookingId] = useState(null);
  const [processingPayment, setProcessingPayment] = useState(false);
  const [paymentError, setPaymentError] = useState(null);

  // Driver state
  const [drivers, setDrivers] = useState([]);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [loadingDrivers, setLoadingDrivers] = useState(false);
  const [driverError, setDriverError] = useState(null);

  // Chat state
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { sender: "support", text: "Hello! How can I help you with your booking?" },
  ]);
  const [newMessage, setNewMessage] = useState("");

  // Success modal state
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const { vehicleId } = useParams();
  const navigate = useNavigate();

  const getUserId = () => {
    return cookies.user?.id || "67d338f3f22c60ec8701405a";
  };

  useEffect(() => {
    const fetchVehicleDetails = async () => {
      try {
        const [vehicleResponse, commentsResponse] = await Promise.all([
          axios.get(
            `https://car-rental-backend-black.vercel.app/vehicles/${vehicleId}`
          ),
          axios.get(
            `https://car-rental-backend-black.vercel.app/comment/${vehicleId}`
          ),
        ]);

        setVehicle(vehicleResponse.data);
        setComments(commentsResponse.data);
        if (vehicleResponse.data?.company?.address) {
          setLocation(vehicleResponse.data.company.address);
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (vehicleId) {
      fetchVehicleDetails();
    }
  }, [vehicleId]);

  useEffect(() => {
    if (vehicle?.company?._id) {
      const fetchDrivers = async () => {
        setLoadingDrivers(true);
        try {
          const response = await axios.get(
            "https://car-rental-backend-black.vercel.app/drivers/company",
            {
              params: { company: vehicle.company._id },
            }
          );
          setDrivers(response.data.drivers);
        } catch (err) {
          setDriverError(err.message);
        } finally {
          setLoadingDrivers(false);
        }
      };
      fetchDrivers();
    }
  }, [vehicle]);

  const generateTimeOptions = () => {
    const options = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const timeString = `${hour.toString().padStart(2, "0")}:${minute
          .toString()
          .padStart(2, "0")}`;
        options.push(
          <option key={timeString} value={timeString}>
            {timeString}
          </option>
        );
      }
    }
    return options;
  };

  const handleSelectDriver = (driver) => {
    setSelectedDriver(driver);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() === "") return;

    setChatMessages([...chatMessages, { sender: "user", text: newMessage }]);

    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          sender: "support",
          text: "Thanks for your message. Our support team will get back to you shortly.",
        },
      ]);
    }, 1000);

    setNewMessage("");
  };

  const renderPeaceOfMind = () => {
    return (
      <div className="p-6 text-white bg-[#333] my-10 rounded-2xl">
        <h3 className="text-lg text-green-500 font-bold mb-4">Peace of mind</h3>
        <div className="space-y-3">
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-3 text-green-600"
            >
              <path d="M20 13c0 5-3 7-7 7-4 0-7-2-7-7 0-4 3-7 7-7 4 0 7 3 7 7z"></path>
              <path d="m10.4 10.4 5.2 5.2"></path>
            </svg>
            <span className="text-left">
              No need to wash the car before returning it, but please keep the
              vehicle tidy.
            </span>
          </div>
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-3 text-green-600"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
            <span className="text-left">Free access to 24/7 roadside assistance</span>
          </div>
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-3 text-green-600"
            >
              <path d="M21.2 8.4c.5.38.8.97.8 1.6v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10a2 2 0 0 1 .8-1.6"></path>
              <path d="M16 8V6a4 4 0 0 0-4-4h0a4 4 0 0 0-4 4v2"></path>
              <path d="M22 10a9.5 9.5 0 0 1-2 6"></path>
              <path d="M2 10a9.5 9.5 0 0 0 2 6"></path>
            </svg>
            <span className="text-left">24/7 customer support</span>
          </div>
        </div>
        <div className="mt-6">
          <h4 className="text-lg font-bold mb-2">Guidelines</h4>
          <ul className="list-disc list-inside text-gray-300">
            <li>
              Please remember to take all personal belongings in this vehicle
              which is used by multiple renters.
            </li>
            <li>Smoking is strictly prohibited.</li>
          </ul>
        </div>
      </div>
    );
  };

  const renderReviews = () => {
    const dummyReviews = [
      {
        id: 1,
        name: "diego",
        date: "2 February 2025",
        rating: 5,
        message: "Nice clean car and easy pickup/dropoff",
      },
      {
        id: 2,
        name: "Anonymous",
        date: "15 January 2025",
        rating: 5,
        message: "Great vehicle, smooth experience",
      },
    ];
    const reviewsToShow = comments.length > 0 ? comments : dummyReviews;
    const totalRatings = 30;
    const ratingCategories = [
      { name: "Cleanliness", rating: 4.9 },
      { name: "Maintenance", rating: 5.0 },
      { name: "Communication", rating: 5.0 },
      { name: "Convenience", rating: 4.9 },
      { name: "Accuracy", rating: 5.0 },
    ];

    return (
      <div className="p-6  text-white bg-[#333] rounded-2xl">
        <div className="flex items-center mb-4">
          <div className="text-4xl text-green-500 font-bold mr-4">5.0</div>
          <div>
            <div className="flex text-yellow-500">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-xl">
                  ★
                </span>
              ))}
            </div>
            <p className="text-sm text-gray-300">({totalRatings} ratings)</p>
          </div>
        </div>
        <div className="mb-4">
          {ratingCategories.map((category, index) => (
            <div key={index} className="flex items-center mb-2">
              <div className="w-32 text-sm">{category.name}</div>
              <div className="flex-grow bg-gray-200 rounded-full h-2 mr-2">
                <div
                  className="bg-green-600 h-2 rounded-full"
                  style={{ width: `${(category.rating / 5) * 100}%` }}
                ></div>
              </div>
              <div className="text-sm">{category.rating.toFixed(1)}</div>
            </div>
          ))}
        </div>
        <div>
          <h3 className="text-lg text-green-500 font-bold mb-4">Guest Reviews</h3>
          {reviewsToShow.map((review) => (
            <div key={review.id} className="border-b py-4">
              <div className="flex items-center mb-2">
                <div className="flex text-yellow-500 mr-2">
                  {[...Array(review.rating)].map((_, i) => (
                    <span key={i} className="text-lg">
                      ★
                    </span>
                  ))}
                </div>
                <span className="text-sm text-gray-300">{review.date}</span>
              </div>
              <p>{review.message}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const handleContinue = async () => {
    if (!vehicle) return;

    setProcessingPayment(true);

    try {
      // Calculate rental duration and total amount
      const diffTime = Math.abs(endDate - startDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
      const totalAmount = vehicle.rent * diffDays;

      // Prepare booking data
      const bookingData = {
        idVehicle: vehicle._id,
        user: getUserId(),
        company: vehicle.company._id,
        driver: selectedDriver?._id || null,
        from: location,
        to: location,
        fromTime: startTime,
        toTime: endTime,
        intercity: false,
        cityName: vehicle.company.city.toLowerCase(),
        status: "pending",
        totalAmount,
      };

      // 1. First create the booking
      const bookingResponse = await axios.post(
        "https://car-rental-backend-black.vercel.app/bookings/postBooking",
        bookingData
      );

      if (!bookingResponse.data.success) {
        throw new Error(bookingResponse.data.message || "Booking failed");
      }

      const bookingId = bookingResponse.data.booking._id;
      setBookingId(bookingId);

      // 2. Create payment intent with Stripe
      const paymentResponse = await axios.post(
        "https://car-rental-backend-black.vercel.app/stripe/create-payment-intent",
        {
          bookingId,
          amount: totalAmount,
          currency: "usd",
        }
      );

      if (!paymentResponse.data.clientSecret) {
        throw new Error(paymentResponse.data.message || "Payment setup failed");
      }

      // 3. Show payment form with the client secret
      setClientSecret(paymentResponse.data.clientSecret);
      setShowPaymentForm(true);
    } catch (error) {
      console.error("Booking Error:", error);
      let errorMessage = "Failed to create booking. Please try again.";

      if (error.response) {
        errorMessage =
          error.response.data.error ||
          error.response.data.message ||
          `Server responded with status ${error.response.status}`;
      } else if (error.request) {
        errorMessage =
          "No response received from server. Please check your connection.";
      }

      setPaymentError(errorMessage);
    } finally {
      setProcessingPayment(false);
    }
  };

  const handlePaymentSuccess = async (paymentIntent) => {
    try {
      console.log("🔍 Payment Intent Received:", paymentIntent); // Debug statement

      // Confirm payment on backend
      await axios.post(
        "https://car-rental-backend-black.vercel.app/stripe/confirm-payment",
        {
          paymentIntentId: paymentIntent.id,
          bookingId,
          userId: getUserId(),
          amount: paymentIntent.amount / 100,
          paymentMethod: "card",
        }
      );

      // Show success message and redirect
      setShowSuccessModal(true);
      setTimeout(() => {
        setShowSuccessModal(false);
        navigate(`/booking-confirmation/${bookingId}`);
      }, 3000);
    } catch (error) {
      console.error("❌ Error confirming payment:", error);
      setPaymentError("Payment confirmation failed. Please contact support.");
    }
  };

  const handlePaymentCancel = () => {
    setShowPaymentForm(false);
    setClientSecret("");
    setBookingId(null);
    setPaymentError(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error || !vehicle) {
    return (
      <div className="text-center text-red-500 p-4">
        Error loading vehicle details. Please try again later.
      </div>
    );
  }

  return (
    <div className="max-w-2xl text-white mx-auto bg-[#121212] relative">
      {/* Floating Chat Button */}
      {!chatOpen && (
        <button
          onClick={() => setChatOpen(true)}
          className="fixed bottom-6 right-6 bg-green-600 text-white p-3 rounded-full shadow-lg hover:bg-green-700 transition z-40 flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      )}

      {/* Image Gallery */}
      <div className="grid grid-cols-3 gap-2">
        <div className="col-span-2 row-span-2">
          <img
            src={vehicle.carImageUrls[0]}
            alt={`${vehicle.manufacturer} ${vehicle.model}`}
            className="w-full h-full object-cover"
          />
        </div>
        {vehicle.carImageUrls[1]?
        <div>
          <img
            src={vehicle.carImageUrls[1]}
            alt={`${vehicle.manufacturer} ${vehicle.model} side view`}
            className="w-full h-full object-cover"
          />
        </div>
        :<div className="hidden"></div>}
       {vehicle.carImageUrls[2]?<div className="relative">
          <img
            src={vehicle.carImageUrls[2]}
            alt={`${vehicle.manufacturer} ${vehicle.model} rear view`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center text-white">
            View {vehicle.carImageUrls.length} photos
          </div>
        </div>:<div className="hidden"></div>} 
        <div className="absolute top-4 right-4">
          {/* <button className="bg-white p-2 rounded-full shadow">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-800">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button> */}
        </div>
      </div>

      {/* Vehicle Details Container */}
      <div className="p-6">
        <div className="flex justify-between text-green-500 items-start mb-4">
          <div>
            <h1 className="text-2xl font-bold">
              {vehicle.manufacturer.charAt(0).toUpperCase() +
                vehicle.manufacturer.slice(1)}{" "}
              {vehicle.model.charAt(0).toUpperCase() + vehicle.model.slice(1)}
            </h1>

            <div className="flex items-center mt-1">
              <div className="flex text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-xl">
                    ★
                  </span>
                ))}
              </div>
              <span className="ml-2 text-gray-300">
                ({vehicle.trips || 0} trips)
              </span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">
              Rs.{vehicle.rent}{" "}
              <span className="text-sm font-normal">/ day</span>
            </div>
            <div className="text-xs text-gray-300">
              Rs.{vehicle.rent} excl. taxes & fees
            </div>
          </div>
        </div>

        {/* Vehicle Specs */}
        <div className="grid grid-cols-3 text-white text-center border-y py-4 mb-4">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mx-auto mb-1"
            >
              <rect x="9" y="7" width="6" height="14" rx="2"></rect>
              <path d="M15 4H9"></path>
              <path d="M8 4h0"></path>
              <path d="M16 4h0"></path>
            </svg>
            <p className="text-sm">{vehicle.capacity} seats</p>
          </div>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mx-auto mb-1"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M3 12h18"></path>
              <path d="M12 3l9 9-9 9"></path>
            </svg>
            <p className="text-sm">{vehicle.transmission}</p>
          </div>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mx-auto mb-1"
            >
              <rect x="3" y="3" width="18" height="18" rx="2"></rect>
              <path d="M3 9h18"></path>
              <path d="M9 21V9"></path>
            </svg>
            <p className="text-sm">Diesel</p>
          </div>
        </div>

        {/* Description */}
        <div className="mb-6 text-green-600">
          <h3 className="text-lg font-bold mb-2">Description</h3>
          <p className="text-gray-300">
            WELCOME TO OUR {vehicle.manufacturer.toUpperCase()}{" "}
            {vehicle.model.toUpperCase()}. Presenting this stunning vehicle in
            beautiful condition with great spec including...
          </p>
        </div>

        {/* Host */}
        <div className="flex text-white items-center mb-6">
          <img
            src="/api/placeholder/50/50"
            alt="Host"
            className="w-12 h-12 rounded-full mr-3"
          />
          <div>
            <div className="flex items-center">
              <p className="font-semibold text-green-500 mr-2">
                {vehicle.company?.companyName || "Host"}
              </p>
              <div className="flex text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-sm">
                    ★
                  </span>
                ))}
              </div>
            </div>
            <p className="text-sm text-gray-300">62 trips · Joined Sept 2023</p>
          </div>
        </div>

        {/* Peace of Mind Section */}
        {renderPeaceOfMind()}

        {/* Reviews Section */}
        {renderReviews()}

        {/* Booking Section */}
        <div className=" text-white my-10 bg-[#333] rounded-lg p-4 mb-6">
          <div className="grid grid-cols-2 gap-4">
            {/* Start Date */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Trip start
              </label>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                minDate={new Date()}
                className="w-full bg-green-700 border rounded px-2 py-1"
                dateFormat="dd/MM/yyyy"
                
              />
            </div>

            {/* Start Time */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Time
              </label>
              <select
                className="w-full bg-green-700 border rounded px-2 py-1"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              >
                {generateTimeOptions()}
              </select>
            </div>

            {/* End Date */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Trip end
              </label>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                minDate={startDate}
                className="w-full bg-green-700 border rounded px-2 py-1"
                dateFormat="dd/MM/yyyy"
              />
            </div>

            {/* End Time */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Time
              </label>
              <select
                className="w-full bg-green-700 border rounded px-2 py-1"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              >
                {generateTimeOptions()}
              </select>
            </div>
          </div>

          {/* Driver Selection */}
          <DriverSelection
            drivers={drivers}
            selectedDriver={selectedDriver}
            onSelectDriver={handleSelectDriver}
            loading={loadingDrivers}
            error={driverError}
          />

          {/* Location Input */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Pickup & return location
            </label>
            <input
              type="text"
              className="w-full border rounded px-2 py-1"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter pickup location"
            />
          </div>
        </div>

        {/* Continue Button */}
        <button
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg mb-20"
          onClick={handleContinue}
          disabled={processingPayment}
        >
          {processingPayment ? "Processing..." : "Continue"}
        </button>

        {/* Payment Modal */}
        {showPaymentForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-[#333] rounded-lg p-6 w-full max-w-md">
              <h2 className="text-xl text-green-400 font-bold mb-4">Complete Payment</h2>

              {/* Confirmation Message */}
              <div className="mb-4 p-4 bg-green-50 rounded-lg">
                <div className="flex items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-green-600 mr-2 mt-0.5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div>
                    <p className="font-medium text-green-800">
                      Booking request sent!
                    </p>
                    <p className="text-sm text-green-600">
                      Complete your payment to confirm your booking for{" "}
                      {vehicle.manufacturer} {vehicle.model}.
                    </p>
                  </div>
                </div>
              </div>

              <Elements stripe={stripePromise}>
                <PaymentForm
                  clientSecret={clientSecret}
                  onSuccess={handlePaymentSuccess}
                  onCancel={handlePaymentCancel}
                  processingPayment={processingPayment}
                />
              </Elements>
            </div>
          </div>
        )}

        {/* Success Modal */}
        {showSuccessModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md text-center">
              <div className="mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 text-green-500 mx-auto"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-2">Booking Successful!</h2>
              <p className="text-gray-600 mb-4">
                Your booking for {vehicle.manufacturer} {vehicle.model} has been
                confirmed.
              </p>
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-green-600 mx-auto mb-4"></div>
              <p className="text-sm text-gray-500">
                Redirecting to booking details...
              </p>
            </div>
          </div>
        )}

        {/* Payment Error Modal */}
        {paymentError && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <div className="flex items-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-red-500 mr-3"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
                <h2 className="text-xl font-bold">Booking Error</h2>
              </div>
              <p className="mb-4">{paymentError}</p>
              <button
                onClick={() => setPaymentError(null)}
                className="w-full bg-purple-600 text-white py-2 rounded"
              >
                OK
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Chat Modal */}
      {chatOpen && (
        <div className="fixed bottom-6 right-6 w-80 bg-white rounded-lg shadow-xl z-50 border border-gray-200">
          <div className="bg-green-600 text-white p-3 rounded-t-lg flex justify-between items-center">
            <h3 className="font-medium">Customer Support</h3>
            <button
              onClick={() => setChatOpen(false)}
              className="text-white hover:text-gray-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <div className="p-4 h-64 overflow-y-auto">
            {chatMessages.map((message, index) => (
              <div
                key={index}
                className={`mb-4 ${
                  message.sender === "support" ? "text-left" : "text-right"
                }`}
              >
                <div
                  className={`inline-block p-3 rounded-lg max-w-xs ${
                    message.sender === "support"
                      ? "bg-gray-100 text-gray-800"
                      : "bg-purple-100 text-gray-800"
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                </div>
              </div>
            ))}
          </div>
          <form
            onSubmit={handleSendMessage}
            className="p-3 border-t border-gray-200"
          >
            <div className="flex">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 border bg-[#333] rounded-l-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-500 text-sm"
              />
              <button
                type="submit"
                className="bg-green-700 text-white px-4 py-2 rounded-r-lg hover:bg-green-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default CarDetailPage;
