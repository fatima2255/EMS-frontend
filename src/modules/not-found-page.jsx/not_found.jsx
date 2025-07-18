import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const NotFoundPage = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="h-screen w-full bg-gradient-to-br from-blue-900 via-gray-900 to-black text-white flex items-center justify-center px-6">
      <motion.div 
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center max-w-lg"
      >
        <h1 className="text-8xl font-bold text-blue-400 mb-4">404</h1>
        <p className="text-3xl font-semibold mb-6 text-blue-100">Oops! Page Not Found</p>
        <p className="text-lg mb-8 text-gray-300">
          The page you’re trying to access doesn’t exist or you don't have permission.
        </p>
        <button
          onClick={goBack}
          className="bg-blue-700 hover:bg-blue-800 transition px-6 py-3 text-white text-lg font-medium rounded-xl shadow-lg"
        >
          Go Back
        </button>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;
