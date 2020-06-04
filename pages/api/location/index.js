import axios from "axios";

export default async (req, res) => {
  try {
    const result = await axios.get(
      "https://freegeoip.app/json/" +
        (req.headers["x-forwarded-for"] || req.connection.remoteAddress)
    );

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
