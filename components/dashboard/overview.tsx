"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

const data = [
  {
    name: "Jan",
    total: 1800,
  },
  {
    name: "Fév",
    total: 2200,
  },
  {
    name: "Mar",
    total: 2800,
  },
  {
    name: "Avr",
    total: 2400,
  },
  {
    name: "Mai",
    total: 2900,
  },
  {
    name: "Juin",
    total: 3200,
  },
  {
    name: "Juil",
    total: 3800,
  },
  {
    name: "Août",
    total: 4000,
  },
  {
    name: "Sep",
    total: 3700,
  },
  {
    name: "Oct",
    total: 4100,
  },
  {
    name: "Nov",
    total: 4500,
  },
  {
    name: "Déc",
    total: 5000,
  },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}€`}
        />
        <Tooltip formatter={(value: number) => [`${value}€`, "Ventes"]} cursor={{ fill: "rgba(0, 0, 0, 0.05)" }} />
        <Bar dataKey="total" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-primary" />
      </BarChart>
    </ResponsiveContainer>
  )
}
