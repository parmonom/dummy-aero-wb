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
// FIGURE
var dataEnvelope = [
    { x: 17.5, y: 385 }, { x: 17.5, y: 600 },
    { x: 31.5, y: 600 }, { x: 31.5, y: 385 },
    { x: 17.5, y: 385 }
];

var dataResult = [
    { x: 20, y: 400 }, { x: 26, y: 500 },
];

const graph_domain = { x_min: 15, x_max: 33, y_min: 350, y_max: 650 };
const figure_size = { height: 350, width: 350, x_margin: 40, y_margin: 30 };

// append the svg object to the body of the page
var svg = d3.select("#figure_area")
    .append("svg")
    .attr("width", figure_size.width)
    .attr("height", figure_size.height)

// X scale and Axis
var x_scale = d3.scaleLinear()
    .domain([graph_domain.x_min, graph_domain.x_max])
    .range([figure_size.x_margin, (figure_size.width - figure_size.x_margin)]);

var x_ticks = [16, 18, 20, 22, 24, 26, 28, 30, 32];
var x_axis = d3.axisBottom()
    .scale(x_scale)
    .tickValues(x_ticks);

svg.append("g")
    .attr("transform", "translate(0, " + (figure_size.height - figure_size.y_margin) + ")")
    .call(x_axis);
svg
    .append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("x", figure_size.width - figure_size.x_margin)
    .attr("y", (figure_size.height - figure_size.y_margin - 6))
    .text("Centerage (%)");


// Y scale and Axis
var y_scale = d3.scaleLinear()
    .domain([graph_domain.y_min, graph_domain.y_max])
    .range([figure_size.height - figure_size.y_margin, figure_size.y_margin]);

var y_ticks = [350, 400, 450, 500, 550, 600, 650];
var y_axis = d3.axisLeft()
    .scale(y_scale)
    .tickValues(y_ticks);

svg.append("g")
    .attr("transform", "translate(" + figure_size.x_margin + ",0)")
    .call(y_axis);
svg
    .append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("transform", "rotate(-90)")
    .attr("x", -figure_size.x_margin + 10)
    .attr("y", figure_size.y_margin + 16)
    .attr("dy", ".75em")
    .text("Weight (kg)");

// Add envelope
svg
    .append("path")
    .datum(dataEnvelope)
    .attr("fill", "none")
    .attr("stroke", "black")
    .attr("stroke-width", 1.5)
    .attr("d", d3.line()
        .x(function (d) { return x_scale(d.x) })
        .y(function (d) { return y_scale(d.y) })
    );

// Add weight line
var lineResult = svg.append("line")
    .attr('x1', x_scale(dataResult[0].x))
    .attr('y1', y_scale(dataResult[0].y))
    .attr('x2', x_scale(dataResult[1].x))
    .attr('y2', y_scale(dataResult[1].y))
    .attr("stroke", 'black')
    .attr("stroke-width", 1.5)

// Add take off point
var pointTO = svg.append("circle")
    .attr("cx", x_scale(dataResult[0].x))
    .attr("cy", y_scale(dataResult[0].y))
    .attr("fill", 'red')
    .attr("r", 2.5);

// Add zero fuel point
var pointZF = svg.append("circle")
    .attr("cx", x_scale(dataResult[1].x))
    .attr("cy", y_scale(dataResult[1].y))
    .attr("fill", 'red')
    .attr("r", 2.5);

// ----- ----- ----- ----- ----- ----- ----- ----- ----- 
// VARS 
//weight
const ballastWeight = 6;

// moment
const ballastFrontMoment = -1466 * ballastWeight;
const ballastRearMoment = 2094 * ballastWeight;

// arms
const armFuel = 689; //mm
const armPilotLight = 369; //mm
const armPilotHeavy = 416; //mm
const armPassenger = 1273; //mm
const armBaggage = 1894; //mm
const armRearBallast = 2094; //mm
const armFrontBallast = -1466; //mm

// Default centrage
const refmac = 114; //mm
const mac = 1237; //mm

// arm pilot linear
var coef_a = ((armPilotHeavy - armPilotLight) / (110 - 55));
var coef_b = (armPilotLight - coef_a * 55);

// id text output
var idWeightOutputTO = document.getElementById('weightTO-output');
var idCenterageOutputTO = document.getElementById('centerageTO-output');
var idWeightOutputZF = document.getElementById('weightZF-output');
var idCenterageOutputZF = document.getElementById('centerageZF-output');
var idWeightFuel = document.getElementById('fuel-output');
var idWarningPax = document.getElementById('warning-pax');
var idWarningFuel = document.getElementById('warning-fuel');
var idWarningBaggage = document.getElementById('warning-baggage');

// ----- ----- ----- ----- ----- ----- ----- ----- ----- 
// UPDATE FIGURE
function sendWarningTotalPax() {
    idWarningPax.innerHTML = "Total pax weight > 200kg"
}
function removeWarningTotalPax() {
    idWarningPax.innerHTML = ""
}


function updateFigure() {
    // get weights
    var emptyWeight = parseFloat(inputEmptyWeight.value);
    var fuelVolume = parseFloat(inputFuel.value);
    var fuelWeight = fuelVolume * 0.72;
    var pilotWeight = parseFloat(inputPilot.value);
    var passengerWeight = parseFloat(inputPassenger.value);
    var baggageWeight = parseFloat(inputBaggage.value);
    
    // warnings 
    // pax weight > 200kg
    if (pilotWeight + passengerWeight > 200) {
        idWarningPax.style.display = "block"
    } else {
        idWarningPax.style.display = "none"
    }
    // 2 occupants 
    if (passengerWeight > 25) {
    // fuel > 100l
        if (fuelVolume > 100) {
            idWarningFuel.style.display = "block"
        } else {
            idWarningFuel.style.display = "none"
        }
        // baggage > 15l
        if (baggageWeight > 15) {
            idWarningBaggage.style.display = "block"
        } else {
            idWarningBaggage.style.display = "none"
        }
    } else {
        idWarningBaggage.style.display = "none"
        idWarningFuel.style.display = "none"
    }
    // empty / start moment
    var startMoment = (parseFloat(inputStartCG.value) / 100 * mac + refmac) * emptyWeight

    // ballast position
    ballastMoment = switchPosition * ballastFrontMoment + (1 - switchPosition) * ballastRearMoment;

    // pilot local arm
    localArmPilot = coef_a * pilotWeight + coef_b;

    // takeoff weight
    var weightTO = emptyWeight + pilotWeight + passengerWeight + baggageWeight + ballastWeight + fuelWeight;
    // zero fuel weight
    var weightZF = emptyWeight + pilotWeight + passengerWeight + baggageWeight + ballastWeight;

    // takeoff moment
    var momentTO = startMoment + fuelWeight * armFuel + pilotWeight * localArmPilot +
        passengerWeight * armPassenger + baggageWeight * armBaggage + ballastMoment;
    // zero fuel moment
    var momentZF = startMoment + pilotWeight * localArmPilot +
        passengerWeight * armPassenger + baggageWeight * armBaggage + ballastMoment;

    // take off centerage
    var armTO = momentTO / weightTO;
    var centerageTO = (armTO - refmac) / mac;

    // zero fuel centerage
    var armZF = momentZF / weightZF;
    var centerageZF = (armZF - refmac) / mac;

    // console.log(TOweight);
    idWeightOutputTO.innerHTML = "Take-off weight: " + weightFormat.to(weightTO);
    idCenterageOutputTO.innerHTML = "Take-off centerage: " + centerageFormat.to(centerageTO * 100);

    idWeightOutputZF.innerHTML = "Zero-fuel weight: " + weightFormat.to(weightZF);
    idCenterageOutputZF.innerHTML = "Zero-fuel centerage: " + centerageFormat.to(centerageZF * 100);

    idWeightFuel.innerHTML = "Fuel weight: " + weightFormat.to(fuelWeight);

    dataResult = [{ x: centerageZF * 100, y: weightZF },
    { x: centerageTO * 100, y: weightTO }];

    // Update points and line 
    lineResult
        .attr('x1', x_scale(dataResult[0].x))
        .attr('y1', y_scale(dataResult[0].y))
        .attr('x2', x_scale(dataResult[1].x))
        .attr('y2', y_scale(dataResult[1].y))

    pointZF
        .attr("cx", x_scale(dataResult[0].x))
        .attr("cy", y_scale(dataResult[0].y))

    pointTO
        .attr("cx", x_scale(dataResult[1].x))
        .attr("cy", y_scale(dataResult[1].y))

}