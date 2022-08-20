import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';

import { useAuthContext } from 'context/AuthContext';
import { ReactComponent as Logo } from 'assets/icons/OperatorIcon.svg';
import { ReactComponent as LogoutIcon } from 'assets/icons/logout-icon.svg';
import { ReactComponent as WalletIcon } from 'assets/icons/wallet-icon.svg';
// import { ReactComponent as AnalyticsIcon } from 'assets/icons/analytics-icon.svg';
import { ReactComponent as StoreIcon } from 'assets/icons/store-icon.svg';
import { ReactComponent as QuestionIcon } from 'assets/icons/question-icon.svg';
import { ReactComponent as LogoText } from 'assets/icons/logo-text.svg';
import './style.scss';

const AppHeader = () => {
  const location = useLocation();
  const { logout } = useAuthContext();

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="dark"
      variant="dark"
      className="d-flex justify-content-between px-3 navbar-container"
    >
      <Navbar.Toggle id="navbar-hamburger-menu-button" aria-controls="responsive-navbar-nav" />
      <Navbar.Brand
        id="navbar-logo-button"
        to="/login"
        as={Link}
        className="d-flex align-items-center"
      >
        <Logo alt="Rye" className="d-inline-block align-top navbar-logo" />
        <LogoText className="navbar-logo-text" />
      </Navbar.Brand>
      <Navbar.Brand
        to="/wallet"
        id="navbar-wallet-button"
        className="navbar-wallet-icon-wrapper"
        as={Link}
      >
        <WalletIcon
          alt="Wallet"
          width="30"
          height="30"
          className="d-inline-block align-top navbar-wallet-icon"
        />
      </Navbar.Brand>
      <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end collapse-wrapper">
        <Nav>
          <Nav.Link
            to="/edit"
            id="navbar-my-store-button"
            className={classNames(
              { 'navbar-item-hovered': location.pathname === '/edit' },
              'navbar-item'
            )}
            as={Link}
            eventKey="1"
          >
            <StoreIcon />
            <span className="navbar-item-text">My Store</span>
          </Nav.Link>
          {/* <Nav.Link
            to="#"
            className={classNames({'navbar-item-hovered': location.pathname === '/analytics'}, "navbar-item")}
            as={Link}
            eventKey="2"
          >
            <AnalyticsIcon />
            <span className="navbar-item-text">Analytics</span>
          </Nav.Link> */}
          <Nav.Link
            to="/wallet"
            id="navbar-wallet-button"
            className={classNames(
              { 'navbar-item-hovered': location.pathname === '/wallet' },
              'navbar-item'
            )}
            as={Link}
            eventKey="3"
          >
            <WalletIcon />
            <span className="navbar-item-text">Wallet</span>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
      <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end collapse-wrapper">
        <Nav>
          <Nav.Link
            href="https://rye-co.notion.site/Rye-FAQs-1631b149e4dd44519b562af6ec4cb0cc"
            target="_blank"
            id="navbar-faq-button"
            className="navbar-item"
            eventKey="4"
          >
            <QuestionIcon />
            <span className="navbar-item-text">Help</span>
          </Nav.Link>
          <Nav.Link
            id="navbar-logout-button"
            onClick={logout}
            as="div"
            role="button"
            className="navbar-item"
          >
            <LogoutIcon />
            <span className="navbar-item-text">Logout</span>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default AppHeader;
