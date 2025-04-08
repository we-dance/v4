import Navbar from '../components/Navbar';
import LocationSelector from '../components/LocationSelector';
import FilterButtons from '../components/FilterButtons';
import EventGrid from '../components/EventGrid';
import FeaturedSection from './FeaturedSection';
import DanceCommunity from './DanceCommunity';
import FeaturedArtists from './FeaturedArtists';
import Footer from './Footer';
import PersonalizationHero from '../components/PersonalizationHero';
import FilterBar from '../components/FilterBar';

const HomePage = () => {
  // Mock data for featured sections
  const hotThisWeek = [
    {
      id: 1,
      name: "Miami Beach Salsa Congress",
      city: "Miami",
      date: "This Weekend",
      image: "https://via.placeholder.com/400x300"
    },
    {
      id: 2,
      name: "Bachata Sensation Night",
      city: "New York",
      date: "Friday",
      image: "https://via.placeholder.com/400x300"
    },
    {
      id: 3,
      name: "Latin Dance Party",
      city: "Los Angeles",
      date: "Saturday",
      image: "https://via.placeholder.com/400x300"
    },
    {
      id: 4,
      name: "Salsa Under the Stars",
      city: "Chicago",
      date: "This Friday",
      image: "https://via.placeholder.com/400x300"
    },
    // Add more events...
  ];

  const globalFestivals = [
    {
      id: 1,
      name: "Paris International Dance Festival",
      city: "Paris",
      date: "Sep 20-25",
      image: "https://via.placeholder.com/400x300"
    },
    {
      id: 2,
      name: "Berlin Dance Week",
      city: "Berlin",
      date: "Oct 5-12",
      image: "https://via.placeholder.com/400x300"
    },
    {
      id: 3,
      name: "Amsterdam Salsa Congress",
      city: "Amsterdam",
      date: "Nov 15-20",
      image: "https://via.placeholder.com/400x300"
    },
    {
      id: 4,
      name: "Tokyo Dance Festival",
      city: "Tokyo",
      date: "Dec 1-5",
      image: "https://via.placeholder.com/400x300"
    },
    // Add more events...
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero section */}
        <PersonalizationHero />
        
        {/* Sticky Filter Bar */}
        <FilterBar />
        
        {/* Rest of the content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 py-16">
            <div className="pt-8">
              <EventGrid />
            </div>

            <div className="space-y-12">
              <FeaturedSection 
                title="🔥 Hot This Week" 
                events={hotThisWeek} 
              />
              <FeaturedSection 
                title="🌍 Global Festivals" 
                events={globalFestivals} 
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <DanceCommunity />
              <FeaturedArtists />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default HomePage; 