import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage.jsx';
import "./App.scss";
import AboutUsPage from './pages/AboutUsPage/AboutUsPage.jsx';
import SignInPage from './pages/SignInPage/SignInPage.jsx';
import SignUpPage from './pages/SignUpPage/SignUpPage.jsx';


const App = () => {
 
  return (
    <BrowserRouter>
			<Routes>
				<Route path='/' element={<HomePage />}></Route>
				<Route path='/about-us' element={<AboutUsPage />}></Route>
				<Route path='/sign-in' element={<SignInPage />}></Route>
				<Route path='/sign-up' element={<SignUpPage />}></Route>
			</Routes>
		</BrowserRouter>

  );
};

export default App;