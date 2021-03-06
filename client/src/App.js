import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Add from "./components/Add";
import Users from "./components/Users";
import Header from "./components/Header";
import SingleUser from "./components/SingleUser";
import Home from "./components/Home";
import AddPost from "./components/AddPost";
import Posts from "./components/Posts";
import SinglePost from "./components/SinglePost";
// import SingleUpdate from "./components/SingleUpdate";
import Products from "./components/Products";
import AddProduct from "./components/AddProduct";
import SingleProduct from "./components/SingleProduct";
import Blog1 from "./components/Blog1";
import Read from "./components/Read";
import Login from "./components/Login";



function App() {

  return (
    <Router>
      <div>
        <Header />

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
        <Route path="/register">
            <Add />
          </Route>
          <Route path="/addpost">
            <AddPost />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/posts">
            <Posts />
          </Route>
          <Route path="/single-user/:id">
            <SingleUser />
          </Route>
          <Route path="/single-post/:id">
            <SinglePost />
          </Route>
          <Route path="/blog1">
            <Blog1/>
          </Route>
          <Route path="/read">
            <Read/>
          </Route>
          {/* <Route path="/single-update/:id">
            <SingleUpdate/>
          </Route> */}

           <Route path="/products">
            <Products/>
          </Route>
          <Route path="/add-product">
            <AddProduct/>
          </Route>
          <Route path="/single-product/:id">
            <SingleProduct />
          </Route>
          <Route path="/login">
            <Login/>
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
