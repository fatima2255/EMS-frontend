import { FaBars, FaTimes, FaSignOutAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Sidebar = ({ isOpen, setIsOpen, role, links, onSignOut }) => {
  return (
    <div className={`transition-all duration-300 ${isOpen ? 'w-64' : 'w-16'} bg-blue-950 text-white relative`}>
      <div className="flex items-center justify-between px-4 py-4">
        {isOpen && (
          <>
            <h1 className="text-lg font-bold whitespace-nowrap">{role}</h1>
            <button onClick={() => setIsOpen(false)}><FaTimes /></button>
          </>
        )}
      </div>

      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="absolute top-5 right-[23px] bg-[#102a43] p-2 rounded-r-md shadow-lg"
        >
          <FaBars />
        </button>
      )}

      <nav className="flex flex-col space-y-2 mt-8 px-2">
        {links.map((link, index) => (
          <Link
            to={link.to}
            key={index}
            className="flex items-center gap-2 hover:bg-blue-900 p-2 rounded"
          >
            {link.icon}
            {isOpen && link.label}
          </Link>
        ))}
        <button
          onClick={onSignOut}
          className="flex items-center gap-2 hover:bg-blue-900 p-2 rounded text-left"
        >
          <FaSignOutAlt />
          {isOpen && 'Sign Out'}
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;
