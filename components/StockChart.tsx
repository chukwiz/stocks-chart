"use client";

import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  AreaChart,
  Area,
  ResponsiveContainer,
} from "recharts";
import { format } from "date-fns";
import { formatPrice } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface StockProps {
  date: string;
  price: number;
}

export const StockChart = ({
  data,
}: {
  data: { date: string; price: string }[];
}) => {

  const formatXAxis = (tickItem: any) => {
    return format(tickItem, "p");
  };

  const formatYAxis = (item: any) => {
    return `${formatPrice(item)}`;
  };

  const formatP = (value: any) => {
    return formatPrice(value);
  };
  return (
    <>
    <ResponsiveContainer width={"100%"} height={200}>
      {data ? (
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          className=" bg-[#82ca9e0d]"
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="date"
            tickFormatter={formatXAxis}
            tickLine={false}
            minTickGap={35}
            fontSize={12}
          />
          <YAxis
            domain={["dataMin", "auto"]}
            tickLine={false}
            fontSize={10}
            tickFormatter={formatYAxis}
          />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip
            wrapperStyle={{ backgroundColor: "#a32828", borderRadius: 40 }}
            formatter={formatP}
          />
          {/* <Area type="monotone" dataKey="uv" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" /> */}
          <Area
            type="monotone"
            dataKey="price"
            stroke="#82ca9d"
            fillOpacity={1}
            fill="url(#colorPrice)"
            strokeWidth={1}
            // unit={"usd"}
          />
        </AreaChart>
      ) : (
        <div className="flex flex-col space-y-3">
          <Skeleton className="h-[125px] w-full rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>
        </div>
      )}
      </ResponsiveContainer>
    </>
  );
};
