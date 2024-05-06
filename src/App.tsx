import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NoMatch from "./pages/NoMatch";
import Movie from "./pages/Movie";
import TVShow from "./pages/TVShow";

function App() {
  return (
    <>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NoMatch />} />
            <Route path="/movie/:id" element={<Movie />} />
            <Route path="/tvshow/:id" element={<TVShow />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;

// e6e35bbf003114d0421f9c9641d6c681
// eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNmUzNWJiZjAwMzExNGQwNDIxZjljOTY0MWQ2YzY4MSIsInN1YiI6IjY2MzBlZGJlOTVjMGFmMDEyYmRhZDdkNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nvlMCNt178lDKg14sIUxkZGJtzwQpw7FtDUzwmqKz5Y
