import React from "react";
import { Logo } from "../components/index.js";
import main from "../assets/images/main.svg";
import styled from "styled-components";
import { Link,Navigate } from "react-router-dom";
import { useAppContext } from "../context/appContext";

const Landing = () => {
  const {user}=useAppContext()
  return (
    <React.Fragment>
      {user&&<Navigate to='/' />}
    <Wrapper>
      <nav>
        <Logo/>
      </nav>
      <div className="container page">
        <div className="info">
          <h1>
            job <span>tracking</span> app
          </h1>
          <p>
          I'm baby lomo narwhal DSA bespoke gastropub tbh heirloom blue bottle. Craft beer banh mi kogi polaroid irony before they sold out beard trust fund photo booth humblebrag kitsch pork belly. Kale chips chillwave quinoa cronut wolf salvia poke intelligentsia tumblr, gastropub gluten-free cliche. Vinyl woke biodiesel, venmo quinoa chicharrones pabst pork belly cardigan. Yuccie sustainable air plant ennui tumeric.
          </p>
          <Link to="/register" className="btn btn-hero">Login/Register</Link>
        </div>
        <img src={main} alt="job hunt" className="img main-img"></img>
      </div>
    </Wrapper>
    </React.Fragment>
  ); 
};

const Wrapper = styled.main`
nav{
    width:var(--fluid-width);
    max-width:var(--max-width);
    margin: 0 auto;
    height:var(--nav-height);
    display: flex;
    align-items: center;
}
.page{
    min-height: calc(100vh - var(--nav-height));
    display: grid;
    align-items: center;
    margin-top: -3rem;
}
h1{
    font-weight: 700%;
    span{
        color:var(--primary-500);
    }
}
p{
    color: var(--grey-600);

}
.main-img{
    display: none;
}
@media (min-width: 992px){
    .page{
        grid-template-columns: 1fr 1fr;
        column-gap: 3rem;
    }
    .main-img{
        display: block;
    }
}
`


export default Landing;
