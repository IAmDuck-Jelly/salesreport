import React, { useState, useEffect } from 'react';
import { useChat } from '../../context/ChatContext';
import { useFormContext } from '../../context/FormContext';

const LocationCapture: React.FC = () => {
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const { addSystemMessage, addErrorMessage } = useChat();
  const { captureLocation, handleUserInput, formState } = useFormContext();

  const getLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    setIsLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        
        setLatitude(lat);
        setLongitude(lng);
        setIsLoading(false);
        
        // Capture location in form context
        captureLocation(lat, lng);
        
        // Add system message
        addSystemMessage(`Location captured successfully: ${lat.toFixed(6)}, ${lng.toFixed(6)}`);
        
        // Move to next step (step 11) to submit the form
        handleUserInput('location_captured');
      },
      (err) => {
        setIsLoading(false);
        setError(`Unable to retrieve your location: ${err.message}`);
        addErrorMessage(`Location error: ${err.message}`);
      },
      { 
        enableHighAccuracy: true, 
        timeout: 15000, 
        maximumAge: 10000 
      }
    );
  };

  // For step 10, we show a submit button
  if (formState.currentStep === 10) {
    return (
      <div className="location-capture">
        <button 
          onClick={getLocation} 
          disabled={isLoading}
          className="btn btn-primary location-button"
        >
          {isLoading ? 'Submitting Report...' : 'Submit Report'}
        </button>
        
        {latitude && longitude && (
          <div className="location-display">
            <p>Location captured:</p>
            <p>Latitude: {latitude.toFixed(6)}</p>
            <p>Longitude: {longitude.toFixed(6)}</p>
          </div>
        )}
        
        {error && (
          <div className="location-error">
            <p>{error}</p>
            <p>Please try again or enter your location manually.</p>
          </div>
        )}
      </div>
    );
  }

  // For step 5 (original location capture), we show the original UI
  return (
    <div className="location-capture">
      <button 
        onClick={getLocation} 
        disabled={isLoading}
        className="btn btn-primary location-button"
      >
        {isLoading ? 'Getting Location...' : 'Share My Location'}
      </button>
      
      {latitude && longitude && (
        <div className="location-display">
          <p>Location captured:</p>
          <p>Latitude: {latitude.toFixed(6)}</p>
          <p>Longitude: {longitude.toFixed(6)}</p>
        </div>
      )}
      
      {error && (
        <div className="location-error">
          <p>{error}</p>
          <p>Please try again or enter your location manually.</p>
        </div>
      )}
    </div>
  );
};

export default LocationCapture;
