import { AppBar, Toolbar, styled, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import logo from "../image/Blogger-Logo.png";

const Image = styled("img")`
  padding: 5px;
  height: 40px;
`;

const Component = styled(AppBar)`
  display: flex;
  flex-direction: row;
  background: #ffffff;
  color: black;
`;

const Container = styled(Toolbar)`
  flex: 1;
  display: flex;
  align-items: center;
  & > a {
    padding: 20px;
    color: #000;
    text-decoration: none;
  }
`;
const CenteredContainer = styled(Toolbar)`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center; /* Center horizontally */
  & > a {
    padding: 20px;
    color: #000;
    text-decoration: none;
  }
`;

const LogoText = styled(Typography)`
  font-size: 30px;
  text-align: center;
  color: #333; /* You can adjust the color to your preference */
`;

const Header = () => {
  return (
    <Component>
      <Container>
        <Image src={logo} alt="" />
        <LogoText variant="h1">BLOGGERS</LogoText>
      </Container>
      <CenteredContainer>
        <Link to="/">HOME</Link>
        <Link to="/about">ABOUT</Link>
        <Link to="/contact">CONTACT</Link>
        <Link to="/account">LOGOUT</Link>
      </CenteredContainer>
    </Component>
  );
};

export default Header;
