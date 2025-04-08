const CompactEventCard = ({ event }) => {
  return (
    <div className="flex-shrink-0 w-72 bg-white rounded-lg shadow-md overflow-hidden">
      <div className="aspect-[4/3] bg-gray-200 relative">
        <img
          src={event.image || 'https://via.placeholder.com/400x300'}
          alt={event.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-3 space-y-2">
        <h3 className="font-medium text-gray-900 truncate">{event.name}</h3>
        <div className="flex justify-between items-center text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            </svg>
            {event.city}
          </div>
          <div>{event.date}</div>
        </div>
      </div>
    </div>
  );
};

export default CompactEventCard; 