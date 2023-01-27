export default function Total({ parts }) {
  const total = parts.reduce((sum, current) => sum + current.exercises, 0);

  return <p>Total of {total} exercises</p>;
}
