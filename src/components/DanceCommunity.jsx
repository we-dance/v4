const DanceCommunity = () => {
  const communities = [
    {
      id: 1,
      name: "Salsa Vienna",
      members: "2.5k members",
      image: "https://via.placeholder.com/50"
    },
    {
      id: 2,
      name: "Zouk Berlin",
      members: "1.8k members",
      image: "https://via.placeholder.com/50"
    },
    {
      id: 3,
      name: "Bachata Paris",
      members: "3.2k members",
      image: "https://via.placeholder.com/50"
    },
    {
      id: 4,
      name: "Kizomba London",
      members: "1.5k members",
      image: "https://via.placeholder.com/50"
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">🎭 Local Dance Communities</h2>
      <div className="space-y-4">
        {communities.map((community) => (
          <div key={community.id} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img
                src={community.image}
                alt={community.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h3 className="font-medium text-gray-900">{community.name}</h3>
                <p className="text-sm text-gray-500">{community.members}</p>
              </div>
            </div>
            <button className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 border border-blue-600 hover:border-blue-700 rounded-lg transition-colors">
              Join
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DanceCommunity; 