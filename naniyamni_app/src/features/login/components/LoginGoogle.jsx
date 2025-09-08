import { GoogleLogin } from  "react-google-login";
import { useGoogleAuth } from "../hooks/useGoogleAuth";

export const LoginGoogle = () => {

    const {onSuccess, onError, clientId} = useGoogleAuth();
    return (
        <GoogleLogin 
                    clientId={clientId}
                    onSuccess={onSuccess}
                    onFailure={onError}
                    cookiePolicy="single_host_policy"
        />
    );
}