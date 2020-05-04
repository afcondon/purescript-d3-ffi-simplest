'use strict'

var rootGUP
var svgGUP
var rootChart
var svgChart
var width = 960
var height = 480
var alphabet = 'abcdefghijklmnopqrstuvwxyz'

// ============================ Purescript FFI functions are the only exports ===================================
exports.initGUP = function (DOMroot) {
  rootGUP = d3.select(DOMroot)

  svgGUP = rootGUP
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', 'translate(32,100)')

  // The initial display.
  updateGUPJS(alphabet)
}
exports.updateGUP = function (ignored) {
  return updateGUPJS(randomLetters())
}

exports.initChart = function (DOMroot) {
  rootChart = d3.select(DOMroot)

  svgChart = rootChart.attr('width', width).attr('height', height)
}

exports.drawChart = function (data) {
  return drawChartJS(data)
}

// ============================ JS implementation of the chart example  ===================================

var drawChartJS = function (data) {
  svgChart
    .append('g')
    .attr('fill', color)
    .selectAll('rect')
    .data(data)
    .join('rect')
    .attr('x', (d, i) => x(i))
    .attr('y', d => y(d.value))
    .attr('height', d => y(0) - y(d.value))
    .attr('width', x.bandwidth())

  svgChart.append('g').call(xAxis)

  svgChart.append('g').call(yAxis)

  return svg.node()
}
xAxis = g =>
  g.attr('transform', `translate(0,${height - margin.bottom})`).call(
    d3
      .axisBottom(x)
      .tickFormat(i => data[i].name)
      .tickSizeOuter(0)
  )

yAxis = g =>
  g
    .attr('transform', `translate(${margin.left},0)`)
    .call(d3.axisLeft(y).ticks(null, data.format))
    .call(g => g.select('.domain').remove())
    .call(g =>
      g
        .append('text')
        .attr('x', -margin.left)
        .attr('y', 10)
        .attr('fill', 'currentColor')
        .attr('text-anchor', 'start')
        .text(data.y)
    )
// ============================ JS implementation of the update function for the GUP example  ===================================
var updateGUPJS = function (data) {
  var t = d3.transition().duration(750)

  svgGUP
    .selectAll('text')
    .data(data, d => d)
    .join(
      enter =>
        enter
          .append('text')
          .attr('fill', 'green')
          .attr('x', (d, i) => i * 32)
          .attr('y', -60)
          .style('fill-opacity', 1e-6)
          .text(d => d)
          .call(enter =>
            enter
              .transition(t)
              .style('fill-opacity', 1)
              .attr('y', 0)
          ),
      update =>
        update
          .attr('fill', 'black')
          .attr('y', 0)
          .call(update => update.transition(t).attr('x', (d, i) => i * 32)),
      exit =>
        exit.attr('fill', 'brown').call(exit =>
          exit
            .transition(t)
            .attr('y', 60)
            .style('fill-opacity', 1e-6)
            .remove()
        )
    )
}

function randomLetters () {
  return d3
    .shuffle(alphabet.split(''))
    .slice(0, Math.floor(6 + Math.random() * 20))
    .sort()
}
