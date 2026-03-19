import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FragranceCatalog from './components/FragranceCatalog';
import FragranceDetail from './components/FragranceDetail';
import PerfumerList from './components/PerfumerList';
import AuthModal from './components/AuthModal';
import Footer from './components/Footer';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home'); // home | catalog | perfumers | detail
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFragrance, setSelectedFragrance] = useState(null);
  const [authModal, setAuthModal] = useState(null); // null | 'login' | 'register'
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSelectFragrance = (fragrance) => {
    setSelectedFragrance(fragrance);
    setCurrentPage('detail');
  };

  const handleSearch = (q) => {
    setSearchQuery(q);
    setCurrentPage('catalog');
  };

  const handleOpenAuth = (mode) => setAuthModal(mode);
  const handleCloseAuth = () => setAuthModal(null);
  const handleAuthSuccess = (email) => {
    setIsLoggedIn(true);
    setAuthModal(null);
  };

  const navigatePage = (page) => {
    setCurrentPage(page);
    if (page !== 'detail') setSelectedFragrance(null);
  };

  return (
    <div>
      <Navbar
        onSearch={handleSearch}
        onOpenAuth={handleOpenAuth}
        isLoggedIn={isLoggedIn}
        currentPage={currentPage}
        setCurrentPage={navigatePage}
      />

      {currentPage === 'home' && (
        <>
          <Hero onSearch={handleSearch} setCurrentPage={navigatePage} />
          <Footer />
        </>
      )}

      {currentPage === 'catalog' && (
        <>
          <FragranceCatalog
            searchQuery={searchQuery}
            onSelectFragrance={handleSelectFragrance}
          />
          <Footer />
        </>
      )}

      {currentPage === 'perfumers' && (
        <>
          <PerfumerList
            onSelectFragrance={handleSelectFragrance}
            setCurrentPage={navigatePage}
          />
          <Footer />
        </>
      )}

      {currentPage === 'detail' && selectedFragrance && (
        <>
          <FragranceDetail
            fragrance={selectedFragrance}
            onBack={() => navigatePage('catalog')}
            onOpenAuth={handleOpenAuth}
            isLoggedIn={isLoggedIn}
            setCurrentPage={navigatePage}
            onSelectFragrance={handleSelectFragrance}
          />
          <Footer />
        </>
      )}

      {authModal && (
        <AuthModal
          mode={authModal}
          onClose={handleCloseAuth}
          onSuccess={handleAuthSuccess}
        />
      )}
    </div>
  );
}
