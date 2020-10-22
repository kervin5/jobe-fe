import moment from "moment";
import { systemLanguage } from "@/root/config";

export default function localizedMoment(value) {
  return moment(value).locale(systemLanguage);
}
