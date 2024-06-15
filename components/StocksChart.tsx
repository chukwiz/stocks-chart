"use client";

import { useAppContext } from "@/context/AppContext";
import { fetchStock, fetchStockDetails } from "@/services/api.service";
import { useQuery } from "@tanstack/react-query";
import React from "react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { stockIntervals } from "@/constants/config";
import { IntervalRadio } from "./IntervalRadio";
import StockSearch from "./StockSearch";
import { StockChart } from "./StockChart";

export interface IStock {
  t: string;
  c: string;
}

const StocksChart = () => {
  const { selectedSymbol, currentStockInterval } = useAppContext();

  const { data: stock, status: stocksStatus } = useQuery({
    queryKey: ["stock", selectedSymbol, currentStockInterval.value],
    queryFn: () => fetchStock(selectedSymbol, currentStockInterval),
    select: (data) =>
      data.results.map((result: IStock) => ({
        date: result.t,
        price: result.c,
      })),
  });

  const { data: stockDetails, status: stockDetailsStatus } = useQuery({
    queryKey: ["stockDetails", selectedSymbol],
    queryFn: () => fetchStockDetails(selectedSymbol),
    select: (data) => ({
      name: data.results.name,
      ticker: data.results.ticker,
      marketCap: data.results.market_cap,
      logo: data.results.branding.logo_url,
    }),
  });

  return (
    <Card className="w-full h-full text-slate-400">
      <CardHeader>
        <div className=" flex justify-between">
          <div className="flex items-center gap-4">
            <StockSearch />

            <h3 className=" text-slate-700 text-2xl font-bold">
              {stockDetails?.ticker && stockDetails.ticker}
            </h3>
          </div>

          <div className="flex items-center gap-4">
            {stockIntervals.map((interval) => (
              <IntervalRadio
                key={interval.label}
                interval={interval}
                currentInterval={currentStockInterval.value}
                type="stock"
              />
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <StockChart data={stock} />
      </CardContent>
      {stockDetails && (
        <CardFooter>
          <div className=" flex gap-4 items-end w-full justify-between text-sm text-gray-400">
            <div className=" flex items-baseline gap-2">
              <img
                className="h-5 w-auto"
                // width={0}
                // height={0}
                alt={stockDetails?.name}
                src={`${stockDetails?.logo}?apiKey=${process.env.NEXT_PUBLIC_POLYGON_API_KEY}`}
              />
              <h3 className="font-semibold text-gray-500 max-w-60 truncate">
                {stockDetails?.name}
              </h3>
            </div>

            {stockDetails?.marketCap && (
              <div className="flex gap-2 font-medium">
                <h3>Market Cap</h3>
                <h3 className="font-semibold text-gray-500">
                  ${stockDetails?.marketCap.toLocaleString()}
                </h3>
              </div>
            )}
          </div>
        </CardFooter>
      )}
    </Card>
  );
};

export default StocksChart;
