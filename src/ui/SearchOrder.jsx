import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchOrder() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    navigate(`/order/${query}`);
    setQuery("");
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search for order..."
        className="w-28 rounded-full px-4 py-4 text-sm transition-all duration-300 focus:outline-none focus:ring focus:ring-yellow-200 md:w-64 md:focus:w-72"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  );
}
