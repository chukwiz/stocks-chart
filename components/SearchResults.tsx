import { useAppContext } from "@/context/AppContext";

interface SearchResultsProps {
  results: {
    name: string;
    ticker: string;
  }[];
}

const SearchResults = ({ results }: SearchResultsProps) => {
  const { setSelectedSymbol, setStockSearchInput } = useAppContext();

  const setSymbol = (res: string) => {
    setSelectedSymbol(res);
    setStockSearchInput("");
  };

  return (
    <ul className=" absolute top-14 rounded-md w-full shadow-xl h-64 overflow-y-scroll text-gray-500 bg-white custom-search-scrollbar">
      {results.map((result) => (
        <li
          key={result.ticker}
          onClick={() => setSymbol(result.ticker)}
          className=" gap-5 text-sm p-4 m-2 hover:bg-primary-50 rounded-sm text-gray-500 cursor-pointer flex items-center justify-between"
        >
          <span>{result.ticker}</span>
          <span className=" truncate">{result.name}</span>
        </li>
      ))}
    </ul>
  );
};
//  ["1. symbol"]
// ["2. name"]
export default SearchResults;