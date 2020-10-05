import moment from "moment";
import { systemLanguage } from "@/root/config";

export default (value) => moment(value).locale(systemLanguage);
