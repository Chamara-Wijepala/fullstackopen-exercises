export default function Filter({ handleFilterChange, nameFilter }) {
  return (
    <div>
      filter: <input onChange={handleFilterChange} value={nameFilter} />
    </div>
  );
}
