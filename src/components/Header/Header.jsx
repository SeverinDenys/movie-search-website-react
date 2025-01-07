import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <h1>Find your film</h1>
      <Link to="/myWatchList/">
        <button>My Watchlist</button>
      </Link>
    </header>
  );
};

export default Header;
