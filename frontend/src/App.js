import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import SideNavbar from './components/SideNavbar';
import Homepage from './pages/Homepage';
import Books from './pages/Books';
import BookPage from './pages/BookPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import EditBook from './pages/EditBook';
import NewBook from './components/ProfileComponents/NewBook';
import UserBooks from './components/ProfileComponents/UserBooks';
import UserComments from './components/ProfileComponents/UserComments';
import PageNotFound from './pages/PageNotFound';
import { useState, useEffect } from 'react';

function App() {
  const [windowSize, setWindowSize] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setWindowSize(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <>
      <BrowserRouter>
        <div className="container">
          {windowSize > 600 ? <Header /> : <SideNavbar />}
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/books" element={<Books />} />
            <Route path="/books/:bookId" element={<BookPage />} />
            <Route path="/books/:bookId/edit" element={<EditBook />} />
            <Route path="/profile/:userId" element={<Profile />}>
              <Route index element={<UserBooks />} />
              <Route path="new-book" element={<NewBook />} />
              <Route path="books" element={<UserBooks />} />
              <Route path="comments" element={<UserComments />} />
              <Route path="*" element={<PageNotFound />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/not-found" element={<PageNotFound />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
