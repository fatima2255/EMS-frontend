import { MdOutlineCalendarToday } from 'react-icons/md';

const TopBar = ({ currentTime, onSignOut }) => (
  <div className="flex justify-between items-center mb-6">
    <div className="flex items-center gap-2 text-gray-600">
      <MdOutlineCalendarToday className="text-xl" />
      <span>{currentTime.toLocaleString()}</span>
    </div>
    <button
      onClick={onSignOut}
      className="bg-red-500 px-4 py-2 rounded text-white"
    >
      Sign Out
    </button>
  </div>
);

export default TopBar;
