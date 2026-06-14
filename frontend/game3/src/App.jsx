import { useState, useEffect } from 'react'
import './App.css'


function formatPoints(n) {
  const rounded = parseFloat(n.toPrecision(3))
  if (rounded >= 1_000_000_000_000_000_000_000_000_000_000_000) return (rounded / 1_000_000_000_000_000_000_000_000_000_000_000) + 'D'
  if (rounded >= 1_000_000_000_000_000_000_000_000_000_000) return (rounded / 1_000_000_000_000_000_000_000_000_000_000) + 'N'
  if (rounded >= 1_000_000_000_000_000_000_000_000_000) return (rounded / 1_000_000_000_000_000_000_000_000_000) + 'O'
  if (rounded >= 1_000_000_000_000_000_000_000_000) return (rounded / 1_000_000_000_000_000_000_000_000) + 'SP'
  if (rounded >= 1_000_000_000_000_000_000_000) return (rounded / 1_000_000_000_000_000_000_000) + 'S'
  if (rounded >= 1_000_000_000_000_000_000) return (rounded / 1_000_000_000_000_000_000) + 'Q'
  if (rounded >= 1_000_000_000_000_000) return (rounded / 1_000_000_000_000_000) + 'QD'
  if (rounded >= 1_000_000_000_000) return (rounded / 1_000_000_000_000) + 'T'
  if (rounded >= 1_000_000_000) return (rounded / 1_000_000_000) + 'B'
  if (rounded >= 1_000_000)     return (rounded / 1_000_000) + 'M'
  if (rounded >= 1_000)         return (rounded / 1_000) + 'K'
  return String(rounded)
}

function App() {
  const [points, setpoints] = useState(0)
  const [purchased, setPurchased] = useState([false,false,false,false,false,false,false,false,false,false])
  const [clickPointsMultiplier, setclickPointsMultiplier] = useState(1)
  const [pointsPerSecond, setpointsPerSecond] = useState([0,0,0,0,0,0,0,0,0,0])
  const [costs,setCosts] = useState([10,150,2000,50000,1,1,1,1,1,1])
  const [ppsmultiplier, setppsmultiplier] = useState([1,10,1,1,1,1,1,1,1,1])
  const tmpppsMultiplier = ppsmultiplier
  const tmppointsPerSecond = pointsPerSecond
  const tmpCosts = costs

  useEffect(() => {
    const interval = setInterval(() => {
      setpoints(prev => prev + (pointsPerSecond.reduce((a, b) => a + b, 0))*0.1)
    }, 100)
    return () => clearInterval(interval)
  }, [pointsPerSecond])

  function Points() {
  return clickPointsMultiplier * 1
}
  return (
    <>
      <div className = "mainButton">
        <h1>Points: {formatPoints(points)}</h1>
        <p>costs: {formatPoints(costs[0])}</p>
        <p>Points Per Second: {pointsPerSecond.reduce((a, b) => a + b, 0).toFixed(1)}</p>
        <p>Click Points Multiplier: {clickPointsMultiplier.toFixed(1)}</p>
        <button onClick={() => setpoints(points + Points())}>+{formatPoints(Points())} points</button>
      </div>
      <div className="oneTimeUpgrades">

        <button onClick={() => {
          if (points >= 200) {
            setPurchased(prev => { const newPurchased = [...prev]; newPurchased[0] = true; return newPurchased; });
            setpointsPerSecond(prev => prev.map((v, i) => i === 0 ? v * 3 : v));
            setppsmultiplier(prev => prev.map((v, i) => i === 0 ? v * 3 : v));
            setpoints(prev => prev - 200);
          }
        }}
          disabled={purchased[0]}
          >cost: 200</button>

        <button onClick={() => {
          if (points >= 4500) {
            setPurchased(prev => { const newPurchased = [...prev]; newPurchased[1] = true; return newPurchased; });
            setpointsPerSecond(prev => prev.map((v, i) => i === 1 ? v * 3 : v));
            setppsmultiplier(prev => prev.map((v, i) => i === 1 ? v * 3 : v));
            setpoints(prev => prev - 4500);
          }
        }}
          disabled={purchased[1]}
          >cost: 4500</button>

      </div>
      <div className="Upgrades">
        <button onClick={
          () => { 
          if (points >= costs[0]) { 
            setpointsPerSecond(pointsPerSecond.map((v, i) => i === 0 ? v + ppsmultiplier[0] : v));
            setpoints(points-costs[0]); 
            tmpCosts[0] = costs[0] * 1.2
            setCosts(tmpCosts)
          } 
        }} 
            >cost: {formatPoints(costs[0])}</button>
          <button onClick={
          () => { 
          if (points >= costs[1]) { 
            setpointsPerSecond(pointsPerSecond.map((v, i) => i === 1 ? v + ppsmultiplier[1] : v));
            setpoints(points-costs[1]); 
            tmpCosts[1] = costs[1] * 1.2
            setCosts(tmpCosts)
          } 
        }} 
            >cost: {formatPoints(costs[1])}</button>
      </div>

    </>
  )
}

export default App
