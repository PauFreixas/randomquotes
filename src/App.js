import logo from './logo.svg';
import './App.css';

function App() {
  return (
      <div id="wrapper">
        <div id="quote-box">
          <div className="quote-text">
            <i className="fa fa-quote-left"> </i><span id="text"></span>
          </div>
          <div className="quote-author">- <span id="author"></span></div>
          <div className="buttons">
            <a
                className="button"
                id="tweet-quote"
                title="Tweet this quote!"
                target="_top"
            >
              <i className="fa fa-twitter"></i>
            </a>
            <a
                className="button"
                id="tumblr-quote"
                title="Post this quote on tumblr!"
                target="_blank"
            >
              <i className="fa fa-tumblr"></i>
            </a>
            <button className="button" id="new-quote">New quote</button>
          </div>
        </div>
        <div className="footer">by <a href="https://codepen.io/hezag/">hezag</a></div>
      </div>
  );
}

export default App;
