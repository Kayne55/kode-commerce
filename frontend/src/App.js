import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import HomePage from './routes/HomePage';
import ProductPage from './routes/ProductPage';

function App() {
  return (
    <BrowserRouter>
      <div>
        <header>
          <Link to="/">Kode Store</Link>
        </header>
        <main>
          <Routes>
            <Route path="/product/:slug" element={<ProductPage />} />
            <Route path="/" element={<HomePage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
