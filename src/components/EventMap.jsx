const EventMap = ({ events }) => {
  return (
    <div className="w-full h-[600px] bg-gray-100 rounded-lg overflow-hidden relative">
      {/* Map placeholder - Replace with actual map implementation */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
          </svg>
          <p className="text-gray-500">
            Map view will be implemented with Google Maps or Mapbox
          </p>
        </div>
      </div>
    </div>
  );
};

export default EventMap; 