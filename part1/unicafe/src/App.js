import { useState } from "react";

export default function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodRating = () => setGood(good + 1);

  const handleNeutralRating = () => setNeutral(neutral + 1);

  const handleBadRating = () => setBad(bad + 1);

  const getTotalRatings = () => good + neutral + bad;

  const getAverageScore = () => (good - bad) / getTotalRatings();

  const getPositivePercentage = () => (good / getTotalRatings()) * 100 + " %";

  console.log(good);

  return (
    <div>
      <h1>give feedback</h1>

      <Button handleClick={handleGoodRating} text={"good"} />
      <Button handleClick={handleNeutralRating} text={"neutral"} />
      <Button handleClick={handleBadRating} text={"bad"} />

      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        getTotalRatings={getTotalRatings}
        getAverageScore={getAverageScore}
        getPositivePercentage={getPositivePercentage}
      />
    </div>
  );
}

function Statistics({
  good,
  neutral,
  bad,
  getTotalRatings,
  getAverageScore,
  getPositivePercentage,
}) {
  if (good === 0 && neutral === 0 && bad === 0) return <p>No feedback given</p>;

  return (
    <>
      <h2>statistics</h2>

      <table>
        <tbody>
          <StatisticLine text={"good"} value={good} />
          <StatisticLine text={"neutral"} value={neutral} />
          <StatisticLine text={"bad"} value={bad} />
          <StatisticLine text={"all"} value={getTotalRatings()} />
          <StatisticLine text={"average"} value={getAverageScore()} />
          <StatisticLine text={"positive"} value={getPositivePercentage()} />
        </tbody>
      </table>
    </>
  );
}

function Button({ handleClick, text }) {
  return <button onClick={handleClick}>{text}</button>;
}

function StatisticLine({ text, value }) {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
}
