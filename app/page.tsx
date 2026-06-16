"use client";

import { useState } from "react";
import SearchBox from "../components/recipes/SearchBox/SearchBox";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (value: string) => {
    setSearchQuery(value);
  };

  return (
    <main className="page">
      <SearchBox onSearch={handleSearch} />

      <p>Search query: {searchQuery}</p>
    </main>
  );
}