import { useState } from 'react'
import './App.css'


function formatPoints(n) {
  const rounded = parseFloat(n.toPrecision(3))
  if (rounded >= 1_000_000_000) return (rounded / 1_000_000_000) + 'B'
  if (rounded >= 1_000_000)     return (rounded / 1_000_000) + 'M'
  if (rounded >= 1_000)         return (rounded / 1_000) + 'K'
  return String(rounded)
}

function App() {
  const [points, setPoints] = useState(0)
  const [purchased, setPurchased] = useState(false)
  const [clickPointsMultiplier, setclickPointsMultiplier] = useState(1)
  const [PointsMultiplier, setPointsMultiplier] = useState(1)
  const [costs,setCosts] = useState([1,1,1,1,1,1,1,1,1,1])
  const tmpCosts = costs

  function Points() {
  return clickPointsMultiplier * 1
}

  return (
    <>
      <div className = "mainButton">
        <h1>Points: {formatPoints(points)}</h1>
        <p>costs: {formatPoints(costs[0])}</p>
        <p>Points Multiplier: {PointsMultiplier.toFixed(1)}</p>
        <p>Click Points Multiplier: {clickPointsMultiplier.toFixed(1)}</p>
        <button onClick={() => setPoints(points + Points())}>+{formatPoints(Points())} points</button>
      </div>
      <div className="oneTimeUpgrades">
        <button onClick={() => { if (points >= 100) { setPurchased(true); setclickPointsMultiplier(clickPointsMultiplier * 3); setPoints(points-100); } }} disabled={purchased}>cost: 100</button>
      </div>
      <div className="Upgrades">
        <button onClick={
          () => { 
          if (points >= 10) { 
            setPointsMultiplier(PointsMultiplier * 1.5); 
            setPoints(points-costs[0]); 
            tmpCosts[0] = costs[0] * 1.5
            setCosts(tmpCosts)
          } 
        }} 
            >cost: {formatPoints(costs[0])}</button>
      </div>

    </>
  )
}

export default App
