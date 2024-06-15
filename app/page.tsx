import StocksChart from "@/components/StocksChart";

export default function Home() {
  return (
    <main className="flex min-h-screen max-w-5xl mx-auto flex-col items-center justify-between p-24">
      <StocksChart />
    </main>
  );
}