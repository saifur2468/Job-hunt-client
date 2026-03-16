
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
// import loginlottie from "../../../../public/Login Leady.json";
// import Lottie from "lottie-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, provider } from "../AuthSection/AuthContex"; 
import Swal from "sweetalert2";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const validatePassword = (password) => {
    if (password.length < 6) return "Password must be at least 6 characters long";
    if (!/[A-Z]/.test(password)) return "Password must contain at least one uppercase letter";
    if (!/[a-z]/.test(password)) return "Password must contain at least one lowercase letter";
    return null;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const errorMsg = validatePassword(password);
    if (errorMsg) {
      Swal.fire({ icon: "error", title: "Oops...", text: errorMsg });
      setLoading(false);
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      Swal.fire({ icon: "success", title: "Login Successful", text: "Welcome back!" });
      navigate(from, { replace: true });
    } catch (err) {
      Swal.fire({ icon: "error", title: "Login Failed", text: err.message });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      Swal.fire({ icon: "success", title: "Logged in with Google!" });
      navigate(from, { replace: true });
    } catch (err) {
      Swal.fire({ icon: "error", title: "Google Login Failed", text: err.message });
    }
  };

  return (
    <div className="hero  px-4">
      <div className="hero-content flex-col lg:flex-row-reverse gap-10 lg:gap-16 w-full max-w-6xl mx-auto">
        <div className="card bg-white/95 backdrop-blur-md shadow-2xl w-full max-w-md p-8 lg:p-10 rounded-xl">
          <form onSubmit={handleLogin} className="card-body space-y-5">
            <h2 className="text-3xl font-bold text-center text-gray-800">Welcome Back</h2>
            <p className="text-center text-gray-600">Login to access your account securely</p>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-gray-700">Email</span>
              </label>
              <input type="email" placeholder="Enter your email" className="input input-bordered input-primary"
                required value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-gray-700">Password</span>
              </label>
              <input type="password" placeholder="Enter your password" className="input input-bordered input-primary"
                required value={password} onChange={(e) => setPassword(e.target.value)} />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover text-blue-600">Forgot password?</a>
              </label>
            </div>

            <div className="form-control">
              <button type="submit" disabled={loading} className="btn btn-primary btn-block py-3 text-lg font-semibold">
                {loading ? "Logging in..." : "Login"}
              </button>
            </div>

            <div className="divider">OR</div>

            <button type="button" onClick={handleGoogleLogin}
              className="btn btn-outline btn-block text-gray-700 border-gray-300 hover:bg-gray-100 flex items-center justify-center gap-2 py-3">
              <FcGoogle className="w-6 h-6" /> Continue with Google
            </button>

            <Link to="/signUp" className="text-center font-xl font-serif">Signup I have no Account</Link>
          </form>
        </div>

        {/* <div className="text-center lg:text-left max-w-lg px-4 lg:px-0">
          <Lottie animationData={loginlottie} loop={true} />
        </div> */}
      </div>
    </div>
  );
};

export default Login;
