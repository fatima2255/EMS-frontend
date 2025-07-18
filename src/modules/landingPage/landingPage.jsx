import { Link } from 'react-router-dom';
import { FaUserPlus, FaSignInAlt } from 'react-icons/fa';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b1a2f] to-[#1e2a47] flex items-center justify-center px-6">
      <div className="max-w-4xl w-full bg-white shadow-2xl rounded-3xl overflow-hidden grid md:grid-cols-2">
        {/* Left Section */}
        <div className="bg-[#102a43] text-white flex flex-col justify-center items-center p-10">
          <h1 className="text-4xl font-bold mb-4">Welcome to EMS</h1>
          <p className="text-lg text-blue-100 mb-6 text-center leading-relaxed">
            Manage employee check-ins, check-outs, and breaks with ease and professionalism.
          </p>
          <img
            src="https://cdn-icons-png.flaticon.com/512/2620/2620832.png"
            alt="EMS Illustration"
            className="w-40 h-40 animate-bounce"
          />
        </div>

        {/* Right Section */}
        <div className="p-10 flex flex-col justify-center bg-white">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Get Started</h2>

          <Link to="/signin">
            <button className="w-full flex items-center justify-center gap-2 bg-[#102a43] hover:bg-[#0b1a2f] text-white py-3 px-4 rounded-xl mb-4 transition text-lg shadow-md">
              <FaSignInAlt /> Sign In
            </button>
          </Link>

          {/* <Link to="/signup">
            <button className="w-full flex items-center justify-center gap-2 bg-[#1e3a5f] hover:bg-[#102a43] text-white py-3 px-4 rounded-xl transition text-lg shadow-md">
              <FaUserPlus /> Sign Up
            </button>
          </Link> */}

          <div className="mt-8 text-sm text-gray-500 text-center">
            Crafted with ❤️ for efficient employee management.
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;