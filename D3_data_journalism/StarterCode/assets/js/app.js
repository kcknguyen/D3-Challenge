// @TODO: YOUR CODE HERE!
// Define SVG area dimensions
var svgWidth = 960;
var svgHeight = 640;

// Define the chart's margins as an object
const chartMargin = {
  top: 20,
  right: 40,
  bottom: 80,
  left: 100
};

// Define dimensions of the chart area
const chartWidth = svgWidth - chartMargin.left - chartMargin.right;
const chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

// Select body, append SVG area to it, and set the dimensions
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);


// Append a group to the SVG area and shift ('translate') it to the right and down to adhere
// to the margins set in the "chartMargin" object.
var chartGroup = svg.append("g")
.attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

// Load data from hours-of-tv-watched.csv
d3.csv("./assets/data/data.csv").then(function(stateData) {
  stateData.forEach(function(data) {
    data.age = +data.age;
    data.smokes = data.smokes;
 
// Print the Data
//console.log(data);
//});
//Step 2: Create scale functions
const xLinearScale = d3.scaleLinear()
  .domain([20, d3.max(stateData, d => d.age)])
  .range([0, width]);

const yLinearScale = d3.scaleLinear()
    .domain([0, d3.max(stateData, d => d.smokes)])
    .range([height, 0]);

//       //Step 3: Create axis functions
//       // ==============================
const xAxis = d3.axisBottom(xLinearScale);
const yAxis = d3.axisLeft(yLinearScale);

chartGroup.append("g").attr("transform", 'translate(0, ${height})').call(xAxis);
chartGroup.append("g").call(yAxis)

chartGroup.selectAll("circle")
.data(stateData)
.enter()
.append("circle")
.attr("cx", d=>xLinearScale(d.age))
.attr("cy", d=>yxLinearScale(d.smokes))
.attr("r", "10")
.attr("stroke-width", "1")
.classed("stateCircle", true)
.attr("opacity", 0.75);

chartGroup.append("g")
.selectAll ('text')
.data(stateData)
.enter()
.append("text")
.text(d=>d.abbr)
.attr("x", d=>xLinearScale(d.age))
.attr("y", d=>yxLinearScale(d.smokes))
.attr("front-family", "sans-serif")
.attr("fill", "white")
.classed("stateText", true)
.attr("opacity", 0.75)
.attr("font-weight","bold")
.attr("alignment-baseline", "central");

chartGroup.append("text")
  .attr("transform", 'translate(${width /2}, ${height + margin.top + 13})')
  .attr("text-anchor", "middle")
  .attr("font-size", "16px")
  .attr("fill", "black")
  .text("Age");

  chartGroup.append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", 0 - margin.left)
  .attr("x", 0 - (height / 2))
  .attr("text-anchor", "middle")
  .attr("font-size", "16px")
  .attr("fill", "black")
  .style("font-weight", "bold")
  .text("Smoker (%) ") 
  .catch(function(error){
  console.log(error);
});
})})
// // Initial Params
// var chosenXAxis = "poverty";
// var chosenYAxis = "healthcare";

// // function used for updating x-scale var upon click on axis label
// function xScale(Data, chosenXAxis) {
//   // create scales
//   var xLinearScale = d3.scaleLinear()
//     .domain([d3.min(Data, d => d[chosenXAxis]) * 0.8,
//       d3.max(Data, d => d[chosenXAxis]) * 1.2
//     ])
//     .range([0, width]);

//   return xLinearScale;

//  // function used for updating x-scale var upon click on axis label
// function yScale(Data, chosenYAxis) {
//   // create scales
//   var yLinearScale = d3.scaleLinear()
//     .domain([d3.min(Data, d => d[chosenYAxis]) * 0.8,
//       d3.max(Data, d => d[chosenYAxis]) * 1.2
//     ])
//     .range([0, height]);

//   return yLinearScale; 

// }

// // function used for updating xAxis var upon click on axis label
// function renderAxes(newXScale, xAxis) {
//   var bottomAxis = d3.axisBottom(newXScale);

//   xAxis.transition()
//     .duration(1000)
//     .call(bottomAxis);

//   return xAxis;
// }

// // function used for updating xAxis var upon click on axis label
// function renderAxes(newYScale, yAxis) {
//   var bottomAxis = d3.axisLeft(newYScale);

//   yAxis.transition()
//     .duration(1000)
//     .call(leftAxis);

//   return yAxis;
// }
// // function used for updating circles group with a transition to
// // new circles
// function renderCircles(circlesGroup, newXScale, newYScale, chosenXAxis, chosenYAxis) {

//   circlesGroup.transition()
//     .duration(1000)
//     .attr("cx", d => newXScale(d[chosenXAxis]));
//     attr("cy", d => newYScale(d[chosenYAxis]));
//   return circlesGroup;
// };
// // function used for updating circles group with new tooltip
// function updateToolTip(chosenXAxis, chosenYAxis, circlesGroup) {

//   var xlabel;
//   var ylabel;

//   if (chosenXAxis === "poverty") {
//     xlabel = "Poverty";
//   }
//   else if (chosenXAxis === "age:"){
//     xlabel = "age:";
//   }
// else (chosenXAxis === "Income:"){
//   xlabel = "Income;"
// }
// if (chosenYAxis === "healthcare"){
//   ylabel = "Lack Healthcare: (%)";
// }
// else if (chosenYAxis === "smokes"){
//   ylabel = "smokes:";
// }
// else ylabel = "obese:" 

//   var toolTip = d3.tip()
//     .attr("class", "tooltip")
//     .offset([80, -60])
//     .html(function(d) {
//       return (`${d.abbr}<br>${label} ${d[chosenXAxis]}`);
//     });

//   circlesGroup.call(toolTip);

//   circlesGroup.on("mouseover", function(data) {
//     toolTip.show(data);
//   })
//     // onmouseout event
//     .on("mouseout", function(data, index) {
//       toolTip.hide(data);
//     });

//   return circlesGroup;

  //}


// // Retrieve data from the CSV file and execute everything below
// d3.csv("hairData.csv").then(function(hairData, err) {
//   if (err) throw err;

//   // parse data
//   hairData.forEach(function(data) {
//     data.hair_length = +data.hair_length;
//     data.num_hits = +data.num_hits;
//     data.num_albums = +data.num_albums;
//   });

//   // xLinearScale function above csv import
//   var xLinearScale = xScale(hairData, chosenXAxis);

//   // Create y scale function
//   var yLinearScale = d3.scaleLinear()
//     .domain([0, d3.max(hairData, d => d.num_hits)])
//     .range([height, 0]);

//   // Create initial axis functions
//   var bottomAxis = d3.axisBottom(xLinearScale);
//   var leftAxis = d3.axisLeft(yLinearScale);

//   // append x axis
//   var xAxis = chartGroup.append("g")
//     .classed("x-axis", true)
//     .attr("transform", `translate(0, ${height})`)
//     .call(bottomAxis);

//   // append y axis
//   chartGroup.append("g")
//     .call(leftAxis);

//   // append initial circles
//   var circlesGroup = chartGroup.selectAll("circle")
//     .data(hairData)
//     .enter()
//     .append("circle")
//     .attr("cx", d => xLinearScale(d[chosenXAxis]))
//     .attr("cy", d => yLinearScale(d.num_hits))
//     .attr("r", 20)
//     .attr("fill", "pink")
//     .attr("opacity", ".5");

//   // Create group for two x-axis labels
//   var labelsGroup = chartGroup.append("g")
//     .attr("transform", `translate(${width / 2}, ${height + 20})`);

//   var hairLengthLabel = labelsGroup.append("text")
//     .attr("x", 0)
//     .attr("y", 20)
//     .attr("value", "hair_length") // value to grab for event listener
//     .classed("active", true)
//     .text("Hair Metal Ban Hair Length (inches)");

//   var albumsLabel = labelsGroup.append("text")
//     .attr("x", 0)
//     .attr("y", 40)
//     .attr("value", "num_albums") // value to grab for event listener
//     .classed("inactive", true)
//     .text("# of Albums Released");

//   // append y axis
//   chartGroup.append("text")
//     .attr("transform", "rotate(-90)")
//     .attr("y", 0 - margin.left)
//     .attr("x", 0 - (height / 2))
//     .attr("dy", "1em")
//     .classed("axis-text", true)
//     .text("Number of Billboard 500 Hits");

//   // updateToolTip function above csv import
//   var circlesGroup = updateToolTip(chosenXAxis, circlesGroup);

//   // x axis labels event listener
//   labelsGroup.selectAll("text")
//     .on("click", function() {
//       // get value of selection
//       var value = d3.select(this).attr("value");
//       if (value !== chosenXAxis) {

//         // replaces chosenXAxis with value
//         chosenXAxis = value;

//         // console.log(chosenXAxis)

//         // functions here found above csv import
//         // updates x scale for new data
//         xLinearScale = xScale(hairData, chosenXAxis);

//         // updates x axis with transition
//         xAxis = renderAxes(xLinearScale, xAxis);

//         // updates circles with new x values
//         circlesGroup = renderCircles(circlesGroup, xLinearScale, chosenXAxis);

//         // updates tooltips with new info
//         circlesGroup = updateToolTip(chosenXAxis, circlesGroup);

//         // changes classes to change bold text
//         if (chosenXAxis === "num_albums") {
//           albumsLabel
//             .classed("active", true)
//             .classed("inactive", false);
//           hairLengthLabel
//             .classed("active", false)
//             .classed("inactive", true);
//         }
//         else {
//           albumsLabel
//             .classed("active", false)
//             .classed("inactive", true);
//           hairLengthLabel
//             .classed("active", true)
//             .classed("inactive", false);
//         }
//       }
//     });
// }).catch(function(error) {
//   console.log(error);
// });


// // Step 1: Parse Data/Cast as numbers
//     // ==============================
//     stateData.forEach(function(data) {
//       data.poverty = +data.poverty;
//       data.healthcare = +data.healthcare;
//       data.smokes = +data.smokes;
//       data.age = +data.age;
//       data.obesity = +data.obesity
//       data.income = +data.income
//     });

//     // Step 2: Create scale functions
//     // ==============================
//     var xLinearScale = d3.scaleLinear()
//       .domain([20, d3.max(stateData, d => d.poverty)])
//       .range([0, width]);

//     var yLinearScale = d3.scaleLinear()
//       .domain([0, d3.max(stateData, d => d.healthcare)])
//       .range([height, 0]);

//       //Step 3: Create axis functions
//       // ==============================
//       var bottomAxis = d3.axisBottom(xLinearScale);
//       var leftAxis = d3.axisLeft(yLinearScale);
  
//       // Step 4: Append Axes to the chart
//     // ==============================
//     chartGroup.append("g")
//       .attr("transform", `translate(0, ${height})`)
//       .call(bottomAxis);

//     chartGroup.append("g")
//       .call(leftAxis);


//   // Step 5: Create Circles
//     // ==============================
//     var circlesGroup = chartGroup.selectAll("circle")
//     .data(stateData)
//     .enter()
//     .append("circle")
//     .attr("cx", d => xLinearScale(d.poverty))
//     .attr("cy", d => yLinearScale(d.healthcare))
//     .attr("r", "15")
//     .attr("fill", "pink")
//     .attr("opacity", ".5");



//     var toolTip = d3.tip()
//     .attr("class", "tooltip")
//     .offset([80, -60])
//     .html(function(d) {
//       return (`${d.abbr}<br>poverty: ${d.poverty}<br>Healthcare: ${d.healthcare}`);
//     });

//   // Step 7: Create tooltip in the chart
//   // ==============================
//   chartGroup.call(toolTip);

//   // Step 8: Create event listeners to display and hide the tooltip
//   // ==============================
//   circlesGroup.on("click", function(data) {
//     toolTip.show(data, this);
//   })
//     // onmouseout event
//     .on("mouseout", function(data, index) {
//       toolTip.hide(data);
//     });

//   // Create axes labels
//   chartGroup.append("text")
//     .attr("transform", "rotate(-90)")
//     .attr("y", 0 - margin.left + 40)
//     .attr("x", 0 - (height / 2))
//     .attr("dy", "1em")
//     .attr("class", "axisText")
/////////     .text("Healthcare vs Poverty")

