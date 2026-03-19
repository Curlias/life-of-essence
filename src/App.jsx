import { useState } from 'react';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import FragranceCatalog from './components/FragranceCatalog';
import FragranceDetail from './components/FragranceDetail';
import PerfumerList from './components/PerfumerList';
import AuthModal from './components/AuthModal';
import Footer from './components/Footer';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [catalogOptions, setCatalogOptions] = useState({});
  const [selectedFragrance, setSelectedFragrance] = useState(null);
  const [authModal, setAuthModal] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Central navigation function used by footer and other components
  const navigate = (target, options = {}) => {
    if (target === 'home') {
      setCurrentPage('home');
      setSelectedFragrance(null);
    } else if (target === 'catalog') {
      setCatalogOptions(options);
      setCurrentPage('catalog');
      setSelectedFragrance(null);
    } else if (target === 'perfumers') {
      setCurrentPage('perfumers');
    } else if (target === 'detail') {
      if (options.fragrance) setSelectedFragrance(options.fragrance);
      setCurrentPage('detail');
    } else if (target === 'login' || target === 'register') {
      setAuthModal(target);
    }
  };

  const handleSearch = (q) => {
    setSearchQuery(q);
    setCatalogOptions({});
    setCurrentPage('catalog');
  };

  const handleSelectFragrance = (fragrance) => {
    setSelectedFragrance(fragrance);
    setCurrentPage('detail');
  };

  return (
    <div>
      <Navbar
        onSearch={handleSearch}
        onOpenAuth={setAuthModal}
        isLoggedIn={isLoggedIn}
        currentPage={currentPage}
        setCurrentPage={(page) => navigate(page)}
      />

      {currentPage === 'home' && (
        <>
          <HomePage
            onSearch={handleSearch}
            setCurrentPage={setCurrentPage}
            onNavigate={navigate}
          />
          <Footer onNavigate={navigate} onOpenAuth={setAuthModal} isLoggedIn={isLoggedIn} />
        </>
      )}

      {currentPage === 'catalog' && (
        <>
          <FragranceCatalog
            searchQuery={searchQuery}
            initialOptions={catalogOptions}
            onSelectFragrance={handleSelectFragrance}
          />
          <Footer onNavigate={navigate} onOpenAuth={setAuthModal} isLoggedIn={isLoggedIn} />
        </>
      )}

      {currentPage === 'perfumers' && (
        <>
          <PerfumerList
            onSelectFragrance={handleSelectFragrance}
            setCurrentPage={setCurrentPage}
          />
          <Footer onNavigate={navigate} onOpenAuth={setAuthModal} isLoggedIn={isLoggedIn} />
        </>
      )}

      {currentPage === 'detail' && selectedFragrance && (
        <>
          <FragranceDetail
            fragrance={selectedFragrance}
            onBack={() => navigate('catalog')}
            onOpenAuth={setAuthModal}
            isLoggedIn={isLoggedIn}
            setCurrentPage={setCurrentPage}
            onSelectFragrance={handleSelectFragrance}
          />
          <Footer onNavigate={navigate} onOpenAuth={setAuthModal} isLoggedIn={isLoggedIn} />
        </>
      )}

      {authModal && (
        <AuthModal
          mode={authModal}
          onClose={() => setAuthModal(null)}
          onSuccess={() => { setIsLoggedIn(true); setAuthModal(null); }}
        />
      )}
    </div>
  );
}
