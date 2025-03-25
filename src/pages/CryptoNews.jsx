import React from 'react';

const CryptoNews = ({ news, isLoadingNews }) => {

  if (isLoadingNews) 
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );

  if (!news || news.length === 0) {
    return <p className="text-white text-center">No news available.</p>;
  }

  return (
    <div className="p-4">
      <h2 className="text-xl text-black font-bold text-nowrap mb-3">Cryptocurrency News</h2>
      <ul className="space-y-4">
        {news.map((article, index) => (
          <li key={index} className="border p-4 rounded-md shadow-sm">
            {article.image_url && (
              <img
                src={article.image_url}
                alt={article.title}
               className="w-36 h-36 object-contain rounded-sm"
              />
            )}
            <a
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-black font-serif"
            >
              {article.title}
            </a>
            <p className="text-black text-sm">
             {new Date(article.pubDate).toLocaleDateString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CryptoNews;