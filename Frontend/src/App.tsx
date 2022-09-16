import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import Profile from "./page/Profile";
import TimeLine from "./page/TimeLine";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import currentUser from "./useContext/currentUserContext";
import CurrentUser from "./useContext/currentUserContext";

function App() {
	const [count, setCount] = useState(0);

	return (
		// <div className="App">
		// <Auth/>
		// {/* </div> */}
		// {/* <Profile /> */}
		// {/* <TimeLine/> */}
		<CurrentUser>
			<BrowserRouter>
				<Routes>
					{/* <Route path="/" element={<Auth/>} /> */}
					<Route path='/' element={<Login />} />
					<Route path='/register' element={<Register />} />
					<Route path='/timeline' element={<TimeLine />} />
					{/* <Route path="page1" element={<Page1 />} /> */}
				</Routes>
			</BrowserRouter>
		</CurrentUser>
	);
}

export default App;
