import { Component } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import GlobalStyles from "./components/GlobalStyles";
import Home from "./pages/Home";
class App extends Component {
  render() {
    return (

      <GlobalStyles>
        {/* <div className="App">
          <Header />
          <NavBar />
        </div> */}

        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />}>
            </Route>
          </Routes>
        </BrowserRouter>
      </GlobalStyles>
    )
  };
};

export default App;