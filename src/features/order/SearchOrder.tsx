import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";

const SearchOrder = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const handelSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!query) return;
    navigate(`/order/${query}`);
    setQuery("");
  };

  return (
    <form onSubmit={handelSubmit}>
      <input
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search Order"
        value={query}
      />
    </form>
  );
};

export default SearchOrder;
