import { useState, useEffect } from "react";
import axios from 'axios';
import moment from 'moment';

function App() {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);



  useEffect(() => {

    function getTrendingNews() {

      axios.get(`http://api.mediastack.com/v1/news?access_key=f11c1c749f1417d1a64194720c56f082`)
      .then(res => {
        // Filter out articles with missing title, description, or image
        const filteredData = res.data.data.filter(item => 
          item.title && item.description && item.image
        );
        setData(filteredData);
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
      });
    }

    getTrendingNews();

  }, [])



  const getNews = (e) => {
    e.preventDefault();
    setIsLoading(true);

    axios.get(`http://api.mediastack.com/v1/news?access_key=f11c1c749f1417d1a64194720c56f082&keywords=${query}`)
      .then(res => {
        // Filter out articles with missing title, description, or image
        const filteredData = res.data.data.filter(item => 
          item.title && item.description && item.image
        );
        setData(filteredData);
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <h1 className="text-4xl font-bold text-blue-600 mb-8">News Search</h1>
      
      <form className="w-full max-w-lg mb-10" onSubmit={getNews}>
        <div className="flex items-center border-b border-blue-500 py-2">
          <input 
            type="text" 
            value={query} 
            onChange={(e) => setQuery(e.target.value)} 
            placeholder="Search for news..."
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
          />
          <button 
            type="submit" 
            className="flex-shrink-0 bg-blue-500 hover:bg-blue-700 border-blue-500 hover:border-blue-700 text-sm border-4 text-white py-1 px-2 rounded"
          >
            Search
          </button>
        </div>
      </form>

      {isLoading ? (
        <h1 className="text-2xl text-blue-500">Loading...</h1>
      ) : (
        <div className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.map((item, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
                <p className="text-gray-600 mb-4">{item.description}</p>
                <p className="text-sm text-gray-500">
                  {moment(item.published_at).format('MMMM Do YYYY, h:mm:ss a')}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
