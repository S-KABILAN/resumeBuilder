import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';

function GoogleAuth() {
  const handleSuccess = async (credentialResponse) => {
    const credential = credentialResponse.credential;
    try {
      const { data } = await axios.post(
        "https://resume-builder-ashy-two.vercel.app/auth/google",
        { credential }
      );
      console.log('User logged in:', data.user);
      // Handle storing tokens or redirecting user
    } catch (error) {
      console.error('Google authentication failed:', error);
    }
  };

  const handleError = () => {
    console.log('Google Sign In failed');
  };

  return (
    <GoogleLogin
      onSuccess={handleSuccess}
      onError={handleError}
      clientId="427914236244-vqjda24o5f814gf3aaj0vcpgl5pcb51q.apps.googleusercontent.com"
    />
  );
}

export default GoogleAuth;
