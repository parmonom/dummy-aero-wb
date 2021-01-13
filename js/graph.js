// ----- ----- ----- ----- ----- ----- ----- ----- ----- 
// FORMATTERS
var weightFormat = wNumb({
    decimals: 0,
    suffix: ' kg'
});

var centerageFormat = wNumb({
    mark: '.',
    decimals: 1,
    suffix: ' %'
});



// ----- ----- ----- ----- ----- ----- ----- ----- ----- 
// VARS 
var xMin = 14;
var xMax = 30;
var yMin = 300;
var yMax = 800;

// weightDefault
var weightEmpty = 300; //kg

// initiator data (dummy)
var initMarker = [{ x: 26, y: 500 }]

var profilEnvelope = [
    { x: 16, y: 350 }, { x: 16, y: 750 },
    { x: 28, y: 750 }, { x: 28, y: 350 },
    { x: 16, y: 350 }
];


// moment
var momentEmpty = 112491.5; //kgmm

// arms
var armEmpty = momentEmpty / weightEmpty //mm
var armFuel = 689 //mm
var armPilot = 348 //mm
var armPassenger = 1273 //mm
var armBaggage = 1894 //mm
var armRearBallast = 2094 //mm
var armFrontBallast = -1466 //mm

// Default centrage
var refmac = 114 //mm
var mac = 1237 //mm

// ----- ----- ----- ----- ----- ----- ----- ----- ----- 
// FIGURE

// set the dimensions and margins of the graph
var margin = { top: 10, right: 40, bottom: 30, left: 30 },
    width = 350 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svG = d3.select("#figure_area")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");


// X scale and Axis
var x = d3.scaleLinear()
    .domain([xMin, xMax])
    .range([0, width]);

var xticks = [18, 20, 22, 24, 26, 28, 30, 32, 34];
var xAxis = d3.axisLeft()
    .scale(x)
    .tickValues(xticks);

svG
    .append('g')
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

// X-axis label
svG
    .append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("x", width)
    .attr("y", height - 6)
    .text("Centerage (%)");


// Y scale and Axis
var y = d3.scaleLinear()
    .domain([yMin, yMax])
    .range([height, 0]);

var yticks = [350, 400, 450, 500, 550, 600, 650, 700, 750, 800];
var yAxis = d3.axisLeft()
    .scale(y)
    .tickValues(yticks);

svG
    .append('g')
    .call(yAxis);

// Y-axis label
svG
    .append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("y", 6)
    .attr("dy", ".75em")
    .attr("transform", "rotate(-90)")
    .text("Weight");

// Add marker weight and balance
var point = svG.selectAll("whatever")
    .data(initMarker)
    .enter()
    .append("circle")
    .attr("cx", function(d) { return x(d.x) })
    .attr("cy", function(d) { return y(d.y) })
    .attr("fill", 'red')
    .attr("r", 2.5)

// Add envelope
svG
    .append("path")
    .datum(profilEnvelope)
    .attr("fill", "none")
    .attr("stroke", "black")
    .attr("stroke-width", 1.5)
    // .attr("transform", "translate(" + margin.left + "," + (margin.top) + ")")
    .attr("d", d3.line()
        .x(function(d) { return x(d.x) })
        .y(function(d) { return y(d.y) })
    )

// ----- ----- ----- ----- ----- ----- ----- ----- ----- 
// UPDATE FIGURE
var idWeightOutput = document.getElementById('weight-output');
var idCenterageOutput = document.getElementById('centerage-output');

function updateFigure() {
    var weightTotal =
        // weightEmpty +
        parseFloat(inputEmpty.value) +
        parseFloat(inputFuel.value) * 0.72 +
        parseFloat(inputPilot.value) +
        parseFloat(inputPassenger.value) +
        parseFloat(inputBaggage.value);

    var momentTotal =
        // weightEmpty * armEmpty +
        parseFloat(inputEmpty.value) * armEmpty +
        parseFloat(inputFuel.value) * armFuel * 0.72 +
        parseFloat(inputPilot.value) * armPilot +
        parseFloat(inputPassenger.value) * armPassenger +
        parseFloat(inputBaggage.value) * armBaggage;

    var armTotal = momentTotal / weightTotal;
    var centerage = (armTotal - refmac) / mac;
    // console.log(weightTotal);
    idWeightOutput.innerHTML = "Total weight: " + weightFormat.to(weightTotal);
    idCenterageOutput.innerHTML = "Centerage: " + centerageFormat.to(centerage * 100);

    dataPoint = [{ x: centerage * 100, y: weightTotal }];
    point
        .data(dataPoint)
        .attr("cx", function(d) { return x(d.x); })
        .attr("cy", function(d) { return y(d.y); })
}