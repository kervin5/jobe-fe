import es from "./es";
import en from "./en";

const languages = {
  en,
  es,
};
const language = process.env.NEXT_PUBLIC_LANGUAGE ?? "en";
export default languages[language];
