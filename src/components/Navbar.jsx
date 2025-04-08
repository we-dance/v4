const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <h1 className="text-xl font-bold">Logo</h1>
          </div>
          <div className="hidden sm:flex sm:space-x-8">
            <a href="#" className="text-gray-700 hover:text-gray-900 px-3 py-2">
              Home
            </a>
            <a href="#" className="text-gray-700 hover:text-gray-900 px-3 py-2">
              About
            </a>
            <a href="#" className="text-gray-700 hover:text-gray-900 px-3 py-2">
              Contact
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 