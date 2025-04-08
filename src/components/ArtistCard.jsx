const ArtistCard = ({ artist }) => {
  return (
    <div className="flex-shrink-0 w-48 text-center">
      <div className="relative mb-3">
        <img
          src={artist.image}
          alt={artist.name}
          className="w-32 h-32 rounded-full mx-auto object-cover border-2 border-white shadow-md"
        />
      </div>
      <h3 className="font-medium text-gray-900">{artist.name}</h3>
      <p className="text-sm text-gray-500 mb-3">{artist.style}</p>
      <button className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 border border-blue-600 hover:border-blue-700 rounded-lg transition-colors w-full">
        View Events
      </button>
    </div>
  );
};

export default ArtistCard; 