import React, { useState } from "react";
// import Lottie from "lottie-react";
// import signupfron from "../../../../public/register.json";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, provider } from "../AuthSection/AuthContex";
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Password validation
  const validatePassword = (password) => {
    if (password.length < 6) return "Password must be at least 6 characters long";
    if (!/[A-Z]/.test(password)) return "Password must contain at least one uppercase letter";
    if (!/[a-z]/.test(password)) return "Password must contain at least one lowercase letter";
    return null;
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    const errorMsg = validatePassword(password);
    if (errorMsg) {
      Swal.fire({ icon: "error", title: "Oops...", text: errorMsg });
      return;
    }

    if (password !== confirmPassword) {
      Swal.fire({ icon: "error", title: "Oops...", text: "Passwords do not match" });
      return;
    }

    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Swal.fire({ icon: "success", title: "Complete SignUp !", text: "Explore More Route Clike Profile button." });
      navigate("/");
    } catch (err) {
      Swal.fire({ icon: "error", title: "Signup Failed", text: err.message });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      Swal.fire({ icon: "success", title: "Logged in with Google!" });
      navigate("/");
    } catch (err) {
      Swal.fire({ icon: "error", title: "Google Login Failed", text: err.message });
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center bg-gray-100 px-6 lg:px-20 py-10">
      {/* Signup Form */}
      <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-md lg:mr-12 transition-transform transform hover:scale-105 duration-300">
        <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-6">Create Account</h2>
        <p className="text-center text-gray-500 mb-8">Join our community and start making a difference!</p>

        <form onSubmit={handleSignup} className="flex flex-col gap-5">
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}
            className="input input-bordered w-full rounded-xl border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition" required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}
            className="input input-bordered w-full rounded-xl border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition" required />
          <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
            className="input input-bordered w-full rounded-xl border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition" required />
          <button type="submit" disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-blue-500 via-cyan-400 to-indigo-500 text-white font-bold rounded-xl shadow-lg hover:scale-105 transition transform duration-200">
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        <div className="divider">OR</div>

        {/* Google Signup */}
        <button type="button" onClick={handleGoogleLogin} className="btn btn-outline btn-block text-gray-700 border-gray-300 hover:bg-gray-100 flex items-center justify-center gap-2 py-3">
          <FcGoogle className="w-6 h-6" /> Continue with Google
        </button>

        <p className="text-center text-gray-400 mt-6">
          Already have an account? <a href="/login" className="text-blue-500 font-semibold hover:underline">Log in</a>
        </p>
      </div>

     
      {/* <div className="lg:flex lg:w-1/2 max-w-lg justify-center items-center">
        <Lottie animationData={signupfron} loop={true} />
      </div> */}
    </div>
  );
};

export default Signup;