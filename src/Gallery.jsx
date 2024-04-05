import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useGlobalContext } from "./context";

const url = `https://api.unsplash.com/search/photos?client_id=${
  import.meta.env.VITE_UNSPLASH_ACCESS_KEY
}`;

const Gallery = () => {
  const { searchTerm } = useGlobalContext();
  const response = useQuery({
    queryKey: ["Images", searchTerm],
    queryFn: async () => {
      const result = await axios.get(`${url}&query=${searchTerm}`);
      return result.data;
    },
  });
  if (response.isLoading) {
    return <div className="image-container">Loading...</div>;
  }
  if (response.isError) {
    return (
      <div className="image-container">
        <h4>No results found...</h4>
      </div>
    );
  }
  const results = response.data.results;
  return (
    <div className="image-container">
      {results.map((item) => {
        const url = item?.urls?.regular;
        return (
          <img
            className="img"
            src={url}
            alt={item.alt_description}
            key={item.id}
          ></img>
        );
      })}
    </div>
  );
};

export default Gallery;
