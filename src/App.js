import './App.css';
import * as Redux from 'redux';
import * as React from 'react';
import * as ReactRedux from 'react-redux';
import $ from 'jquery';


const NEW_QUOTE = 'NEW_QUOTE';

const settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://type.fit/api/quotes",
    "method": "GET"
}

const getNewQuote = (quote, author) => {
    return {
        type: NEW_QUOTE,
        quote: quote,
        author: author
    }
};

const quoteReducer = (state = [], action) => {
    switch (action.type) {
        case NEW_QUOTE:
            return [
                ...state,
                action.quote,
                action.author
            ];
        default:
            return state;
    }
};

const store = Redux.createStore(quoteReducer);

const Provider = ReactRedux.Provider;
const connect = ReactRedux.connect;

function getRandomQuote(data) {
    return data[
        Math.floor(Math.random() * data.length)
        ];
}

class Presentational extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            quote: "",
            author: "",
            data: [],
            api_called: false,
            twitterHref: "",
            tumblrHref: ""
        }
        this.getNewQuote = this.getNewQuote.bind(this)

    }

    componentDidMount(){
        console.log(this.state.twitterHref);
        $.ajax(settings).done((response)=> {
            let data = JSON.parse(response);
            let aux = getRandomQuote(data)

            this.setState((state) => ({
                quote: aux.text,
                author: aux.author,
                data: data,
                api_called: true,
                twitterHref: "https://twitter.com/intent/tweet?text="+aux.text.replace(/\s+/g, '+')+"+-+" + aux.author,
                tumblrHref: "https://www.tumblr.com/widgets/share/tool?shareSource=legacy&canonicalUrl=&url=agar.io&posttype=quote&title=&caption="+aux.author.replace(/\s+/g, '+')+"&content="+aux.text.replace(/\s+/g, '+')

        }));
        });
        console.log(this.state.twitterHref);
    }

    getNewQuote() {
        let randomQuote = getRandomQuote(this.state.data);
        this.setState((state) => ({
            quote: randomQuote.text,
            author: randomQuote.author,
            data: this.state.data,
            api_called: true,
            twitterHref: "https://twitter.com/intent/tweet?text="+randomQuote.text.replace(/\s+/g, '+')+"+-+" + randomQuote.author,
            tumblrHref: "https://www.tumblr.com/share"
        }));
        console.log(this.state.twitterHref);
    }


    render() {
        let tumblrAnchor = 0;
        return (
            <div id="wrapper">
                <div id="quote-box">
                    <div className="quote-text">
                        <i className="fa fa-quote-left"/>
                        <span id="text">

                        {this.state.quote}

                        </span>
                        <i className="fa fa-quote-right"/>
                    </div>
                    <div className="quote-author">- <span id="author">{this.state.author}</span></div>
                    <div className="buttons">
                        <div className = "shareButtons">
                          <a
                              className="button"
                              id="tweet-quote"
                              title="Tweet this quote!"
                              rel="noopener noreferrer"
                              target="_blank"
                              href={this.state.twitterHref}
                          >
                              <i className="fa fa-twitter"></i>
                          </a>
                          <a
                              className="button"
                              id="tumblr-quote"
                              title="Post this quote on tumblr!"
                              rel="noopener noreferrer"
                              target="_blank"
                              href={this.state.tumblrHref}
                          >
                              <i className="fa fa-tumblr"></i>
                          </a>
                        </div>
                        <button className="button" id="new-quote" onClick={this.getNewQuote}>New quote</button>
                    </div>
                </div>
                <div className="footer">Inspired by <a href="https://codepen.io/hezag/">hezag</a></div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {quote: state}
};

const mapDispatchToProps = (dispatch) => {
    return {
        getNewQuote: (quote, author) => {
            dispatch(getNewQuote(quote, author))
        }
    }
};

const Container = connect(mapStateToProps, mapDispatchToProps)(Presentational);

function App() {
  return (
      <Provider store = {store}>
          <Container/>
      </Provider>
);
}

export default App;
