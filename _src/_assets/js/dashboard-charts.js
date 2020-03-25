/* eslint-disable */

(function loadAllCharts() {
  const formatDate = d3.timeFormat('%b. %e')
  const parseDate = d3.timeParse('%Y%m%d')
  const usDailyReq = d3.json(`https://covidtracking.com/api/us/daily`)
  const usStatesCurrentReq = d3.json(`https://covidtracking.com/api/states`)

  function addUsDailyPositiveBarChart(data) {
    const transformedData = data.map(function(d) {
      const date = parseDate(d.date)
      return {
        name: formatDate(date),
        value: d.positive,
      }
    })

    const chartContainer = d3.select('#chart-daily-positive-total')
    const hed = chartContainer.append('h3').classed('chart-hed', true)
    const chart = chartContainer.append('div').classed('chart', true)
    const source = chartContainer.append('div').classed('chart-source', true)
    const barChart = britecharts.bar()

    barChart
      .margin({
        left: 60,
        right: 20,
        top: 20,
        bottom: 60,
      })
      .height(400)
      .width(600)
      .colorSchema(['#546D8E'])
      .highlightBarFunction(function(bar) {
        bar.attr('fill', 'orange')
      })
      .xAxisLabel('Date')

    chart.datum(transformedData).call(barChart)

    hed.text('Positive cases to date')
    source.html(`
      <p><strong>Notes:</strong></p>
      <p>Source: <a href="https://covidtracking.com/api/us/daily">COVID Tracking Project</a></p>
    `)
  }

  function addUsDailyDeathBarChart(data) {
    const transformedData = data.map(function(d) {
      const date = parseDate(d.date)
      return {
        name: formatDate(date),
        value: d.death,
      }
    })

    console.log({ transformedData  })

    const chartContainer = d3.select('#chart-daily-death-total')
    const hed = chartContainer.append('h3').classed('chart-hed', true)
    const chart = chartContainer.append('div').classed('chart', true)
    const source = chartContainer.append('div').classed('chart-source', true)
    const barChart = britecharts.bar()

    barChart
      .margin({
        left: 60,
        right: 20,
        top: 20,
        bottom: 60,
      })
      .colorSchema(['#546D8E'])
      .highlightBarFunction(function(bar) {
        bar.attr('fill', 'orange')
      })
      .height(400)
      .width(600)
      .xAxisLabel('Date')

    hed.text('Total deaths to date')
    chart.datum(transformedData).call(barChart)
    source.html(`
      <p><strong>Notes:</strong></p>
      <p>Source: <a href="https://covidtracking.com/api/us/daily">COVID Tracking Project</a></p>
    `)
  }

  function addUsStatesCurrentPositiveBarChart(data) {
    const transformedData = data
      .sort(function(a, b) {
        return a.positive - b.positive
      })
      .map(function(d) {
        return {
          name: d.state,
          value: d.positive,
        }
      })

    console.log({ transformedData  })

    const chartContainer = d3.select('#chart-states-current-positive-total')
    const hed = chartContainer.append('h3').classed('chart-hed', true)
    const chart = chartContainer.append('div').classed('chart', true)
    const source = chartContainer.append('div').classed('chart-source', true)
    const barChart = britecharts.bar()

    barChart
      .margin({
        left: 60,
        right: 20,
        top: 20,
        bottom: 60,
      })
      .percentageAxisToMaxRatio(1.3)
      .isHorizontal(true)
      .colorSchema(['#546D8E'])
      .highlightBarFunction(function(bar) {
        bar.attr('fill', 'orange')
      })
      .height(600)
      .width(600)
      .xAxisLabel('Positive')

    hed.text('Positive cases by State')
    chart.datum(transformedData).call(barChart)
    source.html(`
      <p><strong>Notes:</strong></p>
      <p>Source: <a href="https://covidtracking.com/api/states">COVID Tracking Project</a></p>
    `)
  }

  function addUsStatesCurrentDeathBarChart(data) {
    const transformedData = data
      .sort(function(a, b) {
        return a.death - b.death
      })
      .map(function(d) {
        return {
          name: d.state,
          value: d.death,
        }
      })

    console.log({ transformedData  })

    const chartContainer = d3.select('#chart-states-current-death-total')
    const hed = chartContainer.append('h3').classed('chart-hed', true)
    const chart = chartContainer.append('div').classed('chart', true)
    const source = chartContainer.append('div').classed('chart-source', true)
    const barChart = britecharts.bar()

    barChart
      .margin({
        left: 60,
        right: 20,
        top: 20,
        bottom: 60,
      })
      .percentageAxisToMaxRatio(1.3)
      .isHorizontal(true)
      .colorSchema(['#546D8E'])
      .highlightBarFunction(function(bar) {
        bar.attr('fill', 'orange')
      })
      .height(600)
      .width(600)
      .xAxisLabel('Deaths')

    hed.text('Total deaths by State')
    chart.datum(transformedData).call(barChart)
    source.html(`
      <p><strong>Notes:</strong></p>
      <p>Source: <a href="https://covidtracking.com/api/states">COVID Tracking Project</a></p>
    `)
  }  

  Promise.all([usDailyReq, usStatesCurrentReq]).then(data => {
    console.log({ data })
    const usDaily = data[0]
    const usStatesCurrent = data[1]
    addUsDailyPositiveBarChart(usDaily)
    addUsDailyDeathBarChart(usDaily)
    addUsStatesCurrentPositiveBarChart(usStatesCurrent)
    addUsStatesCurrentDeathBarChart(usStatesCurrent)
  }).catch(err => {
    console.error({ err })
  })
})()