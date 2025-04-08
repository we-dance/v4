const ViewToggle = ({ view, onViewChange }) => {
  return (
    <div className="flex items-center justify-end mb-6">
      <div className="bg-gray-100 p-1 rounded-lg inline-flex">
        <button
          onClick={() => onViewChange('grid')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2
            ${view === 'grid'
              ? 'bg-white shadow text-gray-900'
              : 'text-gray-600 hover:text-gray-900'
            }`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
          Grid
        </button>
        <button
          onClick={() => onViewChange('map')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2
            ${view === 'map'
              ? 'bg-white shadow text-gray-900'
              : 'text-gray-600 hover:text-gray-900'
            }`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
          </svg>
          Map
        </button>
      </div>
    </div>
  );
};

export default ViewToggle; 