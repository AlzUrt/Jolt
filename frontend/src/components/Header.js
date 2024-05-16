import React from 'react';
import ProfilePicture from '../images/empty-profile-picture.jpg';

const Header = () => {
    return (
      <div className="bg-teal-600 p-4 flex justify-between items-center">
        <div className="flex items-center">
          <div className="mr-4">
            <div className="bg-gray-200 h-2 rounded-full w-48">
              <div className="bg-blue-500 h-2 rounded-full w-3/5"></div>
            </div>
            <div className="text-sm text-gray-700 mt-1">Palier 1/4 • 64%</div>
          </div>
          <div className="bg-yellow-400 p-2 rounded-md shadow-md">Licence <span role="img" aria-label="crown">👑</span></div>
        </div>
        <div className="flex items-center">
          <div className="text-yellow-500 text-xl font-bold mr-4">530</div>
          <img src={ProfilePicture} alt="Profile" className="rounded-full w-8 h-8" />
        </div>
      </div>
    );
  }

export default Header;
