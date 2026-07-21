import "./SearchBar.css";

function SearchBar({ value, onSearch }) {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Cari menu..."
        value={value}
        onChange={(event) => onSearch(event.target.value)}
      />
    </div>
  );
}

export default SearchBar;