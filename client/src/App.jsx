import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage.jsx';
import "./App.scss";

const App = () => {
 
  return (
    <BrowserRouter>
			<Routes>
				<Route path='/' element={<HomePage />}></Route>
			</Routes>
		</BrowserRouter>

  );
};

export default App;