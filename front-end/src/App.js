import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Header from './components/Header';
import Main from './components/Main';
import Auth from './context/user';
import Signup from './components/Forms.js/Signup';
import ProductDetails from './components/Products/ProductDetails';
import Product from './context/product'
import FavoritesProducts from './Favorites/FavoritesProducts';
import Footer from './components/Footer';

function App() {
  return (
    <Auth>
      <Product>
    <BrowserRouter >
      <Header/>
      <Routes>
      <Route path="/" element={<Main/>} />
      <Route path="/register" element={<Signup/>} />
      <Route path="/:name" element={<ProductDetails/>} />
      <Route path='/favorites' element={<FavoritesProducts/>} />
    </Routes>
    <Footer/>
    </BrowserRouter>
    </Product>
    </Auth>
  );
}

export default App;
