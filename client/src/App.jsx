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
  const [view, setView] = useState("Severe Storm");
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

  // function switchVisible() {
  //   if (document.getElementById('section-map')) {
  //       if (document.getElementById('section-map').style.display == 'none') {
  //           document.getElementById('section-map').style.display = 'block';
  //           document.getElementById('section-bar').style.display = 'none';
  //       }
  //       else {
  //           document.getElementById('section-map').style.display = 'none';
  //           document.getElementById('section-bar').style.display = 'block';
  //       }
  //   }
  // }

  return (
    <div id="app">
      <div className="header">
        <h1>U.S. Natural Disaster Predictions</h1>
      </div>

      {/* User Input */}
      <UserInput
        view={view}
        setView={setView}
        setYear={setYear}
        fetchData={fetchData}
        isLoading={isLoading}
      />

      {/* Error Display */}
      {/* Error view */}
      {error && (
        <div className="error-view">
          <Alert severity="error" className="error_message">
            <AlertTitle>Error</AlertTitle>
            <p>The server has reached it's usage limit :'(</p>
          </Alert>
        </div>
      )}

      {/* D3 Map */}
      {data ? (
        <>
          <Paper id="section-map" className="map">
            <input id="bar-btn" type="button" value="VIEW BAR" onclick="switchVisible();"/>
            <Map data={data} view={view} year={year} />
          </Paper>
          <Paper id="section-bar" className="bar">
            <input id="map-btn" type="button" value="VIEW MAP" onclick="switchVisible();"/>
            <BarChart data={data} view={view} year={year} />
          </Paper>
        </>
      ) : (
        <div className={`user-info ${error && "hidden"}`}>
          <Alert severity="info">
            {/* <AlertTitle>Info</AlertTitle> */}
            Please enter year and select disaster to view predictions.
          </Alert>
        </div>
      )}

      {isLoading && (
        <div className="loader">
          <CircularProgress />
          <span className="loading-text">
            Loading prediction...
          </span>
        </div>
      )}
    </div>
  );
}

export default App;