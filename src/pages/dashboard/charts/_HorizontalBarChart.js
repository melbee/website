/* eslint-disable no-unused-vars */
/* eslint-disable no-debugger */

import { extent, max, range } from 'd3-array'
import { scaleBand, scaleLinear } from 'd3-scale'
import React, { useEffect } from 'react'

import { formatNumber } from '../_utils'

export default function HorizontalBarChart({
  data,
  fill,
  height,
  marginBottom = 0,
  marginLeft = 0,
  marginRight = 0,
  marginTop = 0,
  xTicks,
  width,
  xMax = null,
  yTicks = null,
}) {
  const totalXMargin = marginLeft + marginRight
  const totalYMargin = marginTop + marginBottom
  const yScale = scaleBand()
    .domain(data.map(d => d.name))
    .range([0, height - totalYMargin])
    .padding(0.2)

  const xScale = scaleLinear()
    .domain([120, xMax || max(data, d => d.value)])
    .nice()
    .range([width - totalXMargin, 0])

  const yScaleDomain = yScale.domain()
  const ticks = range(
    0,
    yScaleDomain.length,
    Math.floor(yScaleDomain.length / yTicks),
  )

  return (
    <div>
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <g
          className="axis-group"
          transform={`translate(${marginLeft} ${marginTop})`}
        >
          <g className="chart-grid">
            {xScale.ticks(xTicks).map(tick => (
              <g key={tick}>
                <text x={260 - xScale(tick)} y={height - marginBottom}>
                  {formatNumber(tick)}
                </text>
                <line
                  stroke="black"
                  x1={xScale(tick)}
                  x2={xScale(tick)}
                  y1={0}
                  y2={height - totalYMargin}
                />
              </g>
            ))}
          </g>
        </g>

        <g className="axis-group" transform={`translate(0, ${marginTop})`}>
          {ticks.map(d => {
            const name = yScale.domain()[d]
            return <text y={yScale(name)} x="0">{`${name}`}</text>
          })}
        </g>

        <g transform={`translate(${marginLeft}, ${marginTop})`}>
          {data.map(d => (
            <rect
              key={d.name}
              x={0}
              y={yScale(d.name)}
              height={yScale.bandwidth()}
              width={xScale(0) - xScale(d.value)}
              fill={fill}
            />
          ))}
        </g>
      </svg>
    </div>
  )
}
