import { useState, useEffect } from 'react';

const PersonalizationHero = () => {
  const [city, setCity] = useState('');
  const [selectedStyles, setSelectedStyles] = useState([]);
  const [isLocating, setIsLocating] = useState(false);
  const [userType, setUserType] = useState('new'); // 'new', 'regular', 'organizer'

  // Simulate user type detection (in real app, this would come from auth/analytics)
  useEffect(() => {
    // Example: Check local storage for previous visits
    const previousVisits = localStorage.getItem('visitCount') || 0;
    const isOrganizer = localStorage.getItem('isOrganizer') === 'true';
    
    if (isOrganizer) {
      setUserType('organizer');
    } else if (previousVisits > 3) {
      setUserType('regular');
    }
    
    localStorage.setItem('visitCount', Number(previousVisits) + 1);
  }, []);

  const danceStyles = [
    'Salsa', 'Bachata', 'Zouk', 'Kizomba'
  ];

  const popularCities = [
    'New York', 'London', 'Paris', 'Berlin', 'Miami'
  ];

  const getCTAText = () => {
    switch (userType) {
      case 'regular':
        return "See What's Hot Tonight";
      case 'organizer':
        return 'Promote Your Event';
      default:
        return 'Find Your First Event';
    }
  };

  const detectLocation = () => {
    setIsLocating(true);
    // Geolocation logic would go here
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // In a real app, you'd reverse geocode these coordinates
        // For now, we'll just show the coordinates
        setCity(`${position.coords.latitude.toFixed(2)}, ${position.coords.longitude.toFixed(2)}`);
        setIsLocating(false);
      },
      () => {
        setIsLocating(false);
        // Handle error
      }
    );
  };

  const toggleDanceStyle = (style) => {
    setSelectedStyles(prev =>
      prev.includes(style)
        ? prev.filter(s => s !== style)
        : [...prev, style]
    );
  };

  return (
    <div className="relative min-h-[600px] flex items-center justify-center">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/dance-background.jpg" // You'll need to add this image to your public folder
          alt="Dancers"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-2xl mx-auto px-4 space-y-8 text-white">
        <div className="text-center space-y-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold">
            Find Your Next Dance Adventure
          </h1>
          <p className="text-xl text-gray-200">
            Join the rhythm of your city
          </p>
        </div>

        {/* City Selection */}
        <div className="space-y-3 backdrop-blur-sm bg-white/10 rounded-lg p-6">
          <label className="block text-lg font-medium text-center">
            Where are you dancing?
          </label>
          <div className="relative">
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white/90 text-gray-900 border-0 focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select your city</option>
              {popularCities.map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
            <button
              onClick={detectLocation}
              className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1 text-sm text-blue-600 hover:text-blue-700"
            >
              {isLocating ? (
                <span className="flex items-center">
                  <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Locating...
                </span>
              ) : (
                <span className="flex items-center">
                  <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                  Detect
                </span>
              )}
            </button>
          </div>

          {/* Dance Style Selection */}
          <div className="space-y-3 mt-6">
            <label className="block text-lg font-medium text-center">
              What do you love to dance?
            </label>
            <div className="flex flex-wrap justify-center gap-2">
              {danceStyles.map((style) => (
                <button
                  key={style}
                  onClick={() => toggleDanceStyle(style)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                    ${selectedStyles.includes(style)
                      ? 'bg-blue-600 text-white'
                      : 'bg-white/80 text-gray-900 hover:bg-white'
                    }`}
                >
                  {style}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <button 
            className={`px-8 py-4 rounded-lg font-medium text-lg transition-all transform hover:scale-105
              ${selectedStyles.length && city
                ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg'
                : 'bg-gray-400/50 cursor-not-allowed text-gray-300'
              }`}
            disabled={!selectedStyles.length || !city}
          >
            {getCTAText()}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PersonalizationHero; 