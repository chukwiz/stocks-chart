import { useState } from "react";
import { HiX, HiSearch } from "react-icons/hi";
import { useQuery } from "@tanstack/react-query";
import { searchStocks } from "@/services/api.service";
import { useAppContext } from "@/context/AppContext";
import SearchResults from "./SearchResults";

const StockSearch = () => {
  const {stockSearchInput, setStockSearchInput} = useAppContext()

  const { data, refetch } = useQuery({
    queryKey: ["stockSearchResult", stockSearchInput],
    queryFn: ({ signal }) => searchStocks(stockSearchInput),
    refetchInterval: 3 * 60 * 1000,
    staleTime: 3 * 60 * 1000,
    enabled: !!stockSearchInput
  });


  const clear = () => {
    setStockSearchInput("");
    // setMatches([]);
  };

  const updateMatches = () => {
    // setMatches(result);
  };
  return (
    <div className="flex items-center my-4 border-2 rounded-md w-64 relative z-50 bg-white border-neutral-200">
      <input
        type="text"
        value={stockSearchInput}
        onChange={(e) => {
            setStockSearchInput(e.target.value);
        }}
        className="w-full px-4 py- focus:outline-none rounded-md"
        placeholder="Search stocks..."
        onKeyUp={(event) => {
          if (event.key === "Enter") {
            updateMatches();
          }
        }}
      />

      {stockSearchInput && (
        <button className="text-gray-600" onClick={clear}>
          <HiX size={14} />
        </button>
      )}

      <button
        onClick={updateMatches}
        className="p-2 bg-primary-400 text-primary-50 rounded-md flex justify-center items-center m-1"
      >
        <HiSearch size={20} />
      </button>

      {stockSearchInput && data?.results.length > 0 ? <SearchResults results={data.results} /> : null}
    </div>
  );
};

export default StockSearch;