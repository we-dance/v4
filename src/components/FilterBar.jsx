import { useState, useEffect } from 'react';

const FilterBar = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [filters, setFilters] = useState({
    date: '',
    type: '',
    styles: []
  });

  const dateOptions = [
    { id: 'today', label: 'Today' },
    { id: 'week', label: 'This Week' },
    { id: 'weekend', label: 'Weekend' }
  ];

  const eventTypes = [
    { id: 'social', label: 'Social' },
    { id: 'festival', label: 'Festival' },
    { id: 'workshop', label: 'Workshop' },
    { id: 'bootcamp', label: 'Bootcamp' }
  ];

  const danceStyles = [
    'Salsa', 'Bachata', 'Zouk', 'Kizomba'
  ];

  // Handle sticky behavior
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setIsSticky(offset > 600); // Adjust this value based on hero height
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDateFilter = (dateId) => {
    setFilters(prev => ({
      ...prev,
      date: prev.date === dateId ? '' : dateId
    }));
  };

  const handleTypeFilter = (typeId) => {
    setFilters(prev => ({
      ...prev,
      type: prev.type === typeId ? '' : typeId
    }));
  };

  const handleStyleFilter = (style) => {
    setFilters(prev => ({
      ...prev,
      styles: prev.styles.includes(style)
        ? prev.styles.filter(s => s !== style)
        : [...prev.styles, style]
    }));
  };

  return (
    <div className={`w-full bg-white transition-all duration-300 ${
      isSticky 
        ? 'fixed top-0 left-0 shadow-md z-50 animate-slideDown' 
        : ''
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          {/* Date Filter */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">Date:</span>
            <div className="flex gap-2">
              {dateOptions.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => handleDateFilter(id)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors
                    ${filters.date === id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="hidden sm:block h-6 w-px bg-gray-200" />

          {/* Event Type Filter */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">Type:</span>
            <div className="flex flex-wrap gap-2">
              {eventTypes.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => handleTypeFilter(id)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors
                    ${filters.type === id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="hidden sm:block h-6 w-px bg-gray-200" />

          {/* Style Filter */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">Style:</span>
            <div className="flex flex-wrap gap-2">
              {danceStyles.map((style) => (
                <button
                  key={style}
                  onClick={() => handleStyleFilter(style)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors
                    ${filters.styles.includes(style)
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                  {style}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar; 