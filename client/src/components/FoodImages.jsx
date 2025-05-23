import { useState, useEffect } from 'react';
const FoodImages = ({ item }) => {
  const [url, setUrl] = useState(null);
  useEffect(() => {
    if (item.image) {
      setUrl(item.image);
    }
  }, [item.image]); // Better to include item.image in the dependency array
  return item.image ? (
    <figure className="h-1/2 w-full overflow-hidden">
      <img
        className="card-image h-full w-full object-cover duration-300"
        src={url}
        alt={item.title}
        loading="lazy" // ✅ Enables native lazy loading
      />
    </figure>
  ) : (
    <h3>...loading</h3>
  );
};
export default FoodImages;