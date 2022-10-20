import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
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

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="container">
          <Header />
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
            <Route
              path="*"
              element={
                <main style={{ padding: '1rem' }}>
                  <h2>There's nothing here!</h2>
                </main>
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
