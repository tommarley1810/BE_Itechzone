/**
 * CountdownTimer.jsx — Đồng hồ đếm ngược cho Flash Sale
 */
import { useState, useEffect } from 'react'

export default function CountdownTimer({ targetTime, className = '' }) {
  const [timeLeft, setTimeLeft] = useState(calcTimeLeft())

  function calcTimeLeft() {
    const now = new Date().getTime()
    const target = new Date(targetTime).getTime()
    const diff = Math.max(0, target - now)
    return {
      hours:   Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / 1000 / 60) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    }
  }

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calcTimeLeft()), 1000)
    return () => clearInterval(timer)
  }, [targetTime])

  const pad = (n) => String(n).padStart(2, '0')

  const TimeBlock = ({ value, label }) => (
    <div className="flex flex-col items-center">
      <div className="w-12 h-12 bg-dark-900 dark:bg-black rounded-xl flex items-center justify-center
                      text-white font-bold text-xl font-mono border border-white/10">
        {pad(value)}
      </div>
      <span className="text-xs text-gray-400 mt-1 font-medium">{label}</span>
    </div>
  )

  return (
    <div className={`flex items-end gap-2 ${className}`}>
      <TimeBlock value={timeLeft.hours}   label="Giờ" />
      <span className="text-white font-bold text-xl mb-3">:</span>
      <TimeBlock value={timeLeft.minutes} label="Phút" />
      <span className="text-white font-bold text-xl mb-3">:</span>
      <TimeBlock value={timeLeft.seconds} label="Giây" />
    </div>
  )
}
