import { useState, useEffect } from "react";
import axios from 'axios';
import moment from 'moment';

function App() {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getNews = (e) => {
    e.preventDefault();
    setIsLoading(true);

    axios.get(`https://newsapi.org/v2/everything?q=${query}&apiKey=213f155b4dc84b68a2bbc6392211da8b`)
      .then(res => {
        console.log(res.data.articles);
        setData(res.data.articles);
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
      });
  };

  return (
    <div>
      <h1>News</h1>
      <input 
        type="text" 
        value={query} 
        onChange={(e) => setQuery(e.target.value)} 
        placeholder="Search for news"
      />
      <button onClick={getNews}>Search</button>

      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          {data.map((item, index) => (
            <div key={index}>
              <h1>{item.title}</h1>
              <img src={item.urlToImage} alt={item.title} />
              <p>{item.description}</p>
              <p>{moment(item.publishedAt).format('MMMM Do YYYY, h:mm:ss a')}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
