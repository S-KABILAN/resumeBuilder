import GoogleAuth from "../components/GoogleAuth";

function Login() {
  return (
    <div>
      <h2 className="text-red-500 text-center text-4xl">Login with Google</h2>
      <GoogleAuth />
    </div>
  );
}

export default Login;
