import { pastMonth, pastWeek, pastYear, today } from "@/lib/date-helper";

export const stockIntervals = [
    // { label: "1D", value: "1D", multiplier: 1, timeSpan: "hour", from: past2Days(), to: today() },
    { label: "1W", value: "1W", multiplier: 4, timeSpan: "hour", from: pastWeek(), to: today() },
    { label: "1M", value: "1M", multiplier: 1, timeSpan: "day", from: pastMonth(), to: today() },
    { label: "1Y", value: "1Y", multiplier: 1, timeSpan: "week", from: pastYear(), to: today() },
];