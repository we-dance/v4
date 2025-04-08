import ArtistCard from './ArtistCard';

const FeaturedArtists = () => {
  const artists = [
    {
      id: 1,
      name: "Maria Rodriguez",
      style: "Salsa & Bachata",
      image: "https://via.placeholder.com/200"
    },
    {
      id: 2,
      name: "John Smith",
      style: "Zouk",
      image: "https://via.placeholder.com/200"
    },
    {
      id: 3,
      name: "Sophie Laurent",
      style: "Kizomba",
      image: "https://via.placeholder.com/200"
    },
    {
      id: 4,
      name: "Carlos Mendoza",
      style: "Bachata",
      image: "https://via.placeholder.com/200"
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">⭐ Featured Artists</h2>
      <div className="relative">
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex space-x-6 pb-4">
            {artists.map((artist) => (
              <ArtistCard key={artist.id} artist={artist} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedArtists; 