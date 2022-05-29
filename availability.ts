import { Interval } from "./interval";

export type Availability = {
    weekdays: Interval;
    weekends: Interval;
};