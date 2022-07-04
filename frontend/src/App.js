import "./App.css";
import { Header } from "./Components/Layout/Header";
import { Footer } from "./Components/Layout/Footer";
import Home from "./Components/Home";
import ProductDetail from "./Components/product/ProductDetail";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="container container-fluid">
          <Route path="/" component={Home} exact />
          <Route path="/search/:keyword" component={Home} />
          {/* <Home /> */}
          <Route path="/product/:id" component={ProductDetail} exact />
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
