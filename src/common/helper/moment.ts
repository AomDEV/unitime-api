import * as Moment from "moment";
import { extendMoment } from "moment-range";

export const momentRange = () => extendMoment(Moment);
export const timeToNumber = (time: string) => parseInt(time.split(":").join(""));
export const timeToMoment = (time: string) => Moment(time, "HH:mm");
export const dateRange = (start: string, end: string) => momentRange().range(timeToMoment(start), timeToMoment(end));