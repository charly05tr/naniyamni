import { useEffect } from "react";
import { gapi } from "gapi-script";

const clientId = "691784976779-4oaul5jers9snith1h9078m5bm7o2odq.apps.googleusercontent.com";

export const useGoogleAuth = () => {
  useEffect(() => {
    const start = () => {
      gapi.auth2.init({
        ClientId: clientId
      });
    };
    gapi.load("client:auth2", start);
  }, []);

  const onSuccess = (response) => {
    console.log(response);
  }

  const onError = (error) => {
    throw new Error(error);
  }

  return { onSuccess, onError, clientId} 
}