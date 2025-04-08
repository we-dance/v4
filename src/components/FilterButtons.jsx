import { useState } from 'react';

const FilterButtons = () => {
  const [selectedDances, setSelectedDances] = useState([]);
  const [selectedEvents, setSelectedEvents] = useState([]);

  const danceStyles = ['Salsa', 'Bachata', 'Zouk', 'Kizomba', 'Tango'];
  const eventTypes = ['Socials', 'Festivals', 'Workshops', 'Weekenders', 'Bootcamps'];

  const toggleFilter = (filter, type) => {
    if (type === 'dance') {
      setSelectedDances(prev =>
        prev.includes(filter)
          ? prev.filter(item => item !== filter)
          : [...prev, filter]
      );
    } else {
      setSelectedEvents(prev =>
        prev.includes(filter)
          ? prev.filter(item => item !== filter)
          : [...prev, filter]
      );
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 justify-center">
        {danceStyles.map((dance) => (
          <button
            key={dance}
            onClick={() => toggleFilter(dance, 'dance')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
              ${selectedDances.includes(dance)
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
          >
            {dance}
          </button>
        ))}
      </div>
      
      <div className="flex flex-wrap gap-2 justify-center">
        {eventTypes.map((event) => (
          <button
            key={event}
            onClick={() => toggleFilter(event, 'event')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
              ${selectedEvents.includes(event)
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
          >
            {event}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterButtons; 