import { useState } from "react";
import "./App.css";
import axios from "axios";
import Map from "./components/Map";
import UserInput from "./components/UserInput";
import BarChart from "./components/BarChart";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { Paper } from "@mui/material";

function App() {
  const URL = "https://natural-disaster-predictor-production.up.railway.app/";
  const [year, setYear] = useState(new Date().getFullYear());
  const [view, setView] = useState("Avg");
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setisLoading] = useState(false);

  const fetchData = async (inputYear) => {
    try {
      setisLoading(true);
      const response = await axios.get(
        `${URL}predict_disasters?year=${inputYear}`
      );
      setisLoading(false);
      setYear(inputYear);
      setData(response.data);
      setError(null); // Reset error state if data is fetched successfully
    } catch (error) {
      setError(true); // Set error message
      setisLoading(false);
    }
  };

  return (
    <div id="app">
      <h1>U.S. Natural Disaster Predictor</h1>
      <img id='logo' src="images/trekker-logo.png" alt='Trekker App'></img>

      {/* User Input */}
      <UserInput
        view={view}
        setView={setView}
        setYear={setYear}
        fetchData={fetchData}
        isLoading={isLoading}
      />

      {/* Error Display */}
      {error && (
        <div className="error-view">
          <Alert severity="error" className="error_message">
            <AlertTitle>Error</AlertTitle>
            <p>Server has reached it's usage limits.</p>
          </Alert>
        </div>
      )}

      {/* Map and Bar Chart Display */}
      {data ? (
        <>
          <Paper id="section-map" className="map">
            <Map data={data} view={view} year={year} />
          </Paper>
          <Paper id="section-bar">
            <BarChart data={data} view={view} year={year} />
          </Paper>
        </>
      ) : (
        <div className={`user-info ${error && "hidden"}`}>
          {/* <Alert severity="info">
            Enter year and select disaster to view predictions.
          </Alert> */}
          <h2>Welcome!</h2>
          <p>This app is intended to predict potential natural disasters, specifically focused on the most common disasters in the U.S. Please enter the prediction year and select the type of disaster above.</p>
        </div>
      )}

      {isLoading && (
        <div className="loader">
          <CircularProgress />
          <span className="loading-text">
            Loading predictions...
          </span>
        </div>
      )}
    </div>
  );
}

export default App;