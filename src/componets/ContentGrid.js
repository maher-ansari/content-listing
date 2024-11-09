import React, { useState, useEffect } from "react";
import { fetchData, fetchImage } from "../api"; // Assuming fetchData handles the API request
import ContentItem from "./ContentItem";
import SearchBar from "./SearchBar";

const ContentGrid = () => {
  const [data, setData] = useState([]); // Holds the content data
  const [loading, setLoading] = useState(false); // Tracks if a request is ongoing
  const [page, setPage] = useState(1); // Tracks the current page to fetch
  const [searchQuery, setSearchQuery] = useState(""); // The search query
  const [hasMore, setHasMore] = useState(true); // Flag to track if there's more data to load

  // Effect to load initial data when the component mounts
  useEffect(() => {
    if (!loading && hasMore) {
      console.log('in if .....')
      loadData(page); // Fetch data for the first page
    }
  }, [page]); // Trigger effect whenever the page state changes (but not loading)

  const loadData = async (pageNumber) => {
    setLoading(true); // Set loading state to true
    console.log('in load')
    try {
      const newData = await fetchData(pageNumber); // Fetch data for the page

      if (newData?.page?.["content-items"]?.content?.length > 0) {
        // If data exists, format and append it to the existing data
        const formattedData = newData.page["content-items"].content.map((item) => ({
          ...item,
          image: item["poster-image"],
        }));

        setData((prevData) => [...prevData, ...formattedData]); // Append new data to the existing list

        // If less than the expected number of items (i.e., end of data), stop further loading
        if (newData.page["content-items"].content.length < 10) {
          setHasMore(false); // No more pages to load
        }
      } else {
        setHasMore(false); // Stop if no content was returned
      }
      
    } catch (error) {
      console.error("Error loading data:", error);
      setHasMore(false); // Stop loading in case of error
    } finally {
      console.log('in finall')
      setLoading(false); // Reset loading state
    }
  };

  // Handle scroll event for infinite scrolling
  const handleScroll = () => {
    if (loading || !hasMore) return; // Don't load more if already loading or no more data

    const scrollPosition = window.innerHeight + window.scrollY; // Current scroll position
    const scrollHeight = document.documentElement.scrollHeight; // Total scrollable height

    // Check if we are at the bottom of the page
    if (scrollPosition >= scrollHeight - 100) {
      setPage((prevPage) => prevPage + 1); // Trigger the loading of the next page
    }
  };

  // Handle search query changes
  const handleSearch = (e) => {
    setSearchQuery(e.target.value); // Update the search query
  };

  // Filter data based on the search query (search is case-insensitive)
  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Set up the scroll event listener and cleanup on unmount
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loading, hasMore]); // Only reattach the scroll listener when loading or hasMore changes

  return (
    <div className="content-grid">
    <SearchBar value={searchQuery} onChange={handleSearch}/>
      <div className="grid">
        {filteredData.map((item, index) => (
          <ContentItem key={index} title={item.name} image={item.image} />
        ))}
      </div>
      {loading && <div className="loading">Loading...</div>}
      {!hasMore && <div className="end-of-data">The content server is temporarily unavailable. We’re working on fixing it.</div>} {/* End of data message */}
    </div>
  );
};

export default ContentGrid;
