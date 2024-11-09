// src/services/api.js
import axios from "axios";

// Base URL for the API
const BASE_URL = "https://test.create.diagnal.com";

// Fetch data for a specific page
export const fetchData = async (pageNumber) => {
  try {
    const response = await axios.get(`${BASE_URL}/data/page${pageNumber}.json`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return {};
  }
};

// Fetch image URL by image name
export const fetchImage = (imageName) => {
  return `${BASE_URL}/images/${imageName}`;
};
