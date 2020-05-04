'use strict'

var rootGUP
var svgGUP
var alphabet = 'abcdefghijklmnopqrstuvwxyz'
var widthGUP = 960
var heightGUP = 480


var rootChart
var svgChart
var color = "steelblue"
var margin = ({top: 30, right: 0, bottom: 30, left: 40})
var widthChart = 960
var heightChart = 480

// ============================ Purescript FFI functions are the only exports ===================================
exports.initGUP = function (DOMroot) {
  rootGUP = d3.select(DOMroot)

  svgGUP = rootGUP
    .append('svg')
    .attr('width', widthGUP)
    .attr('height', heightGUP)
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

  svgChart = rootChart.append('svg').attr("viewBox", [0, 0, widthChart, heightChart])
}

exports.drawChart = function (data) {
  return drawChartJS(data)
}

// ============================ JS implementation of the chart example  ===================================

var drawChartJS = function (data) {
  var x = d3.scaleBand()
      .domain(d3.range(data.length))
      .range([margin.left, widthChart - margin.right])
      .padding(0.1)

  var y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.value)]).nice()
        .range([heightChart - margin.bottom, margin.top])

  var xAxis = g => g.attr('transform', `translate(0,${heightChart - margin.bottom})`).call(
            d3.axisBottom(x)
              .tickFormat(i => data[i].name)
              .tickSizeOuter(0)
          )

  var yAxis = g => g.attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(y).ticks(null, data.format))
      .call(g => g.select('.domain').remove())
      .call(g => g.append('text')
          .attr('x', -margin.left)
          .attr('y', 10)
          .attr('fill', 'currentColor')
          .attr('text-anchor', 'start')
          .text(data.y) )
        
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
}

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
