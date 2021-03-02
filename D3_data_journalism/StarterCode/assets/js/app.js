// @TODO: YOUR CODE HERE!
// Define SVG area dimensions
const svgWidth = 960;
const svgHeight = 640;

// Define the chart's margins as an object
const margin = {
  top: 20,
  right: 40,
  bottom: 80,
  left: 100
};;

// Define dimensions of the chart area
const width = svgWidth - margin.left - margin.right;
const height = svgHeight - margin.top - margin.bottom;

// Select body, append SVG area to it, and set the dimensions
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);
