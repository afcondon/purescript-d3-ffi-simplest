'use strict'

var GUPSelection
var svg
var width = 960
var height = 480
var alphabet = 'abcdefghijklmnopqrstuvwxyz'

// ============================ Purescript FFI functions are the only exports ===================================
exports.initDOMJS = function (DOMroot) {
  GUPSelection = d3.select(DOMroot)

  svg = GUPSelection.append('svg')
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', 'translate(32,100)')

  // The initial display.
  update(alphabet)
}
exports.updateJS = function (ignored) {
  return update(randomLetters())
}

var update = function (data) {
  var t = d3.transition().duration(750)

  svg
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
