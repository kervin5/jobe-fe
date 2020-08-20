import axios from "axios";

export default async (req, res) => {
  try {
    const result = await axios.post(
      "https://exactstafftranslate.cognitiveservices.azure.com/sts/v1.0/issuetoken?Subscription-Key=23f89154a2b64b9c86a3ba511e5c6acb"
    );
    const translationResult = await axios({
      method: req.method,
      url: req.query.url || req.body.url,
      data: req.body.data || {},
      headers: { Authorization: `Bearer ${result.data}` }
    });
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ data: translationResult.data }));
  } catch (ex) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: ex }));
  }
};
