import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage.jsx';
import "./App.scss";
import AboutUsPage from './pages/AboutUsPage/AboutUsPage.jsx';

const App = () => {
 
  return (
    <BrowserRouter>
			<Routes>
				<Route path='/' element={<HomePage />}></Route>
				<Route path='/about-us' element={<AboutUsPage />}></Route>
			</Routes>
		</BrowserRouter>

  );
};

export default App;