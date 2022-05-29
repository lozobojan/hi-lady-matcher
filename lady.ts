import { LangLevel } from "./langLevel";
import { Topic } from "./topic";
import { Availability } from "./availability";

export type Lady = {
    id: bigint;
    name: string;
    langLevel: LangLevel,
    topics: Array<Topic>,
    availability: Availability
};