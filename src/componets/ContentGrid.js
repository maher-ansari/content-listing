import React, { useState, useEffect, useRef } from "react";
 import { fetchData } from "../api"; // Assuming fetchData handles the API request
import ContentItem from "./ContentItem";
import SearchBar from "./SearchBar";

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

const ContentGrid =()=>{
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]); 
  const [page, setPage] = useState(1); 
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState(""); 
  const elementRef= useRef(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const newData = await fetchData(page); // Fetch data for the page

      if (newData?.page?.["content-items"]?.content?.length > 0) {
        const formattedData = newData.page["content-items"].content.map((item) => ({
          ...item,
          image: item["poster-image"],
        }));

        setData((prevData) => [...prevData, ...formattedData]); // Append new data to existing list
        setPage((prevPage) => prevPage + 1); 
       
      } else {
        setHasMore(false)
     
      }
    } catch (error) {
      setHasMore(false)
       // Stop loading in case of an error
    } finally {
      setLoading(false)
    }
  };

  const onInterSection=(entries)=>{
    const firstElement = entries[0]
    if(firstElement.isIntersecting && hasMore && !loading){
        setTimeout(()=>{
            loadData(); 
        },500)
    }
  }
  useEffect(()=>{
    const observer= new IntersectionObserver(onInterSection);
    if(observer && elementRef.current){
      observer.observe(elementRef.current)
    }
    return ()=>{
      if(observer){
        observer.disconnect()
      }
    }
  },[data])

  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  // Filter data based on the search query (search is case-insensitive)
  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
  );


  return (
    <>
    <div className="content-grid">
      <SearchBar value={searchQuery} onChange={(e)=>setSearchQuery(e.target.value)} />
      {filteredData.length> 0?
      <div className="grid">
       { filteredData.map((item, index) => (
          <ContentItem key={index} title={item.name} image={item.image} />
        ))}
        </div>
        :<div className="no-data">No more content available.</div>}
      {loadData && <div className="loading" style={{ display: searchQuery.length ===0 ? 'block' : 'none' }}ref={elementRef}></div>}
      {!hasMore && <div className="end-of-data">No more content available.</div>} 
    </div>
    </>
  )
}
export default ContentGrid;


