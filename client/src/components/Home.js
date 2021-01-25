import React from "react";
import Container from '@material-ui/core/Container';
import './home.css'
import Blog from "./Blog";

const Home = () => {
  return (
    <Container maxWidth="lg" style={{ backgroundColor: 'whitesmoke', }}>
    <div className="" >
      <h1 className="title-text pl-5">
        Blog
      </h1>
    </div>
<Blog/>
    </Container>
  );
};

export default Home;
