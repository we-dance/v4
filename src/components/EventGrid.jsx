import { useState } from 'react';
import ViewToggle from './ViewToggle';
import EventMap from './EventMap';
import EventCard from './EventCard';

const EventGrid = () => {
  const [view, setView] = useState('grid');
  
  // Mock data - replace with real data later
  const events = [
    {
      id: 1,
      name: "Summer Salsa Festival",
      danceStyles: ["Salsa", "Bachata"],
      type: "Festival",
      city: "Miami",
      date: "Aug 15-17",
      image: "https://via.placeholder.com/400x225"
    },
    {
      id: 2,
      name: "Zouk Social Night",
      danceStyles: ["Zouk"],
      type: "Social",
      city: "New York",
      date: "Jul 25",
      image: "https://via.placeholder.com/400x225"
    },
    {
      id: 3,
      name: "Kizomba Workshop",
      danceStyles: ["Kizomba"],
      type: "Workshop",
      city: "London",
      date: "Sep 5",
      image: "https://via.placeholder.com/400x225"
    },
    // Add more events as needed
  ];

  return (
    <div>
      <ViewToggle view={view} onViewChange={setView} />
      
      {view === 'map' ? (
        <EventMap events={events} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
};

export default EventGrid; 