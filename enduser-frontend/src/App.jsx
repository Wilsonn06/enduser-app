import { Routes, Route } from 'react-router-dom';
import PropertyList from './pages/PropertyList';
import PropertyDetail from './pages/PropertyDetail';
import Search from './pages/Search';
import Wishlist from './pages/Wishlist';
import Navbar from './components/navbar';
import { useParams } from 'react-router-dom';

function App() {
  return (
    <div>
      <Navbar /> {/* Navigasi selalu muncul */}
      <Routes>
        <Route path="/" element={<PropertyList />} />
        <Route path="/properties/:id" element={<PropertyDetailWrapper />} />
        <Route path="/search" element={<Search />} />
        <Route path="/wishlist" element={<Wishlist />} />
      </Routes>
    </div>
  );
}

// Wrapper untuk mengambil parameter :id dari URL
function PropertyDetailWrapper() {
  const { id } = useParams();
  return <PropertyDetail id={id} />;
}

export default App;
