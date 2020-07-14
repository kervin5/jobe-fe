import axios from "axios";

export default async (req, res) => {
  try {
    const {
      query: { name },
    } = req;

    const result = await axios.get(mapboxUrl(name));

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(result.data));
  } catch (ex) {
    console.log({ ex });
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: ex }));
  }
};

const mapboxUrl = (location) => {
  return (
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    location +
    ".json?access_token=pk.eyJ1Ijoia3Zhc3F1ZXppdCIsImEiOiJjandzNWtjcjUwMHh2NDJxa2toeWJ6N2FlIn0.Qa-IM4Em_QMvC2QWlMvieQ"
  );
};
