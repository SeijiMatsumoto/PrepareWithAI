"use client"
import Main from "@/components/Main/Main";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

export default function Home() {

  return (
    <main className="flex min-h-screen p-12 justify-center overflow-hidden">
      <QueryClientProvider client={queryClient}>
        <Main />
      </QueryClientProvider>
    </main >
  );
}