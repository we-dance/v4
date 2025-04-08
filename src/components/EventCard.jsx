const EventCard = ({ event }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Image */}
      <div className="aspect-video bg-gray-200 relative">
        <img
          src={event.image || 'https://via.placeholder.com/400x225'}
          alt={event.name}
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Content */}
      <div className="p-4 space-y-4">
        {/* Title */}
        <h3 className="font-semibold text-lg text-gray-900">{event.name}</h3>
        
        {/* Dance Style Badges */}
        <div className="flex flex-wrap gap-1">
          {event.danceStyles.map((style) => (
            <span
              key={style}
              className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full"
            >
              {style}
            </span>
          ))}
        </div>
        
        {/* Event Type */}
        <div className="flex items-center text-sm text-gray-600">
          <span className="px-2 py-1 bg-gray-100 rounded-md">
            {event.type}
          </span>
        </div>
        
        {/* Location and Date */}
        <div className="flex justify-between items-center text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {event.city}
          </div>
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {event.date}
          </div>
        </div>
        
        {/* Going Button */}
        <button className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
          Going
        </button>
      </div>
    </div>
  );
};

export default EventCard; 