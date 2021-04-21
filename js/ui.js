var volumeFormat = wNumb({
    decimals: 0,
    suffix: ' L'
});
// ----- ----- ----- ----- ----- ----- ----- ----- ----- 
// VAR

var emptyWeight = 330;
var fuelQuantityDefault = 150;
var pilotWeightDefault = 75;
var passengerWeightDefault = 0;
var baggageWeightDefault = 0;

var paxMaxWeight = 200;
var occupantMaxWeight = 110;


// ----- ----- ----- ----- ----- ----- ----- ----- ----- 
// GET ID
// Input
var inputEmptyWeight = document.getElementById('input-empty-weight');
var inputStartMoment = document.getElementById('input-start-moment');
var inputFuel = document.getElementById('input-fuel');
var inputPilot = document.getElementById('input-pilot');
var inputPassenger = document.getElementById('input-passenger');
var inputBaggage = document.getElementById('input-baggage');

// sliders
var sliderFuel = document.getElementById('slider-fuel');
var sliderPilot = document.getElementById('slider-pilot');
var sliderPassenger = document.getElementById('slider-passenger');
var sliderBaggage = document.getElementById('slider-baggage');

// switch
var switchPosition = 1;

// ----- ----- ----- ----- ----- ----- ----- ----- ----- 
// EMPTY WEIGHT
// Synchro with the input
inputEmptyWeight.addEventListener('change', function () {
    // sliderFuel.noUiSlider.set([this.value, null]);
    updateFigure();
});

// ----- ----- ----- ----- ----- ----- ----- ----- ----- 
// START MOMENT
// Synchro with the input
inputStartMoment.addEventListener('change', function () {
    // sliderFuel.noUiSlider.set([this.value, null]);
    updateFigure();
});

// ----- ----- ----- ----- ----- ----- ----- ----- ----- 
// FUEL
// Init slider
noUiSlider.create(sliderFuel, {
    start: [fuelQuantityDefault],
    connect: true,
    behaviour: 'snap',
    step: 1,
    range: {
        'min': 0,
        'max': fuelQuantityDefault
    },
    pips: {
        // mode: 'range',
        mode: 'values',
        values: [0, 30, 60, 90, 120, 150],
        density: 7,
    },
});

// When slider is update
sliderFuel.noUiSlider.on('update', function (values, handle) {
    var value = values[handle];
    inputFuel.value = Math.round(value);
    updateFigure();
});

// Synchro with the input
inputFuel.addEventListener('change', function () {
    sliderFuel.noUiSlider.set([this.value, null]);
});




// ----- ----- ----- ----- ----- ----- ----- ----- ----- 
// PASSENGER
// Init slider
noUiSlider.create(sliderPassenger, {
    start: [passengerWeightDefault],
    connect: true,
    behaviour: 'snap',
    step: 1,
    range: {
        'min': 0,
        'max': occupantMaxWeight
    },
    pips: {
        // mode: 'range',
        mode: 'values',
        values: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110],
        density: 5,
    },
});

// When slider is update
sliderPassenger.noUiSlider.on('update', function (values, handle) {
    // console.log('passenger update')
    var value = values[handle];
    inputPassenger.value = Math.round(value);
    // crossUpdateSlider(sliderPilot)
    updateFigure()
});

// Synchro with the input
inputPassenger.addEventListener('change', function () {
    sliderPassenger.noUiSlider.set([this.value, null]);
});

// ----- ----- ----- ----- ----- ----- ----- ----- ----- 
// PILOT 
// Init slider
noUiSlider.create(sliderPilot, {
    start: [pilotWeightDefault],
    connect: true,
    behaviour: 'snap',
    step: 1,
    padding: [55, 0],
    range: {
        'min': 0,
        'max': occupantMaxWeight
    },

    pips: {
        // mode: 'range',
        mode: 'values',
        values: [60, 70, 80, 90, 100, 110],
        density: 5,
    },
});

// When slider is update
sliderPilot.noUiSlider.on('update', function (values, handle) {
    var value = values[handle];
    inputPilot.value = Math.round(value);  
    var pad = Math.max(0, occupantMaxWeight - (paxMaxWeight - value));

    // console.log('pad', pad)
    sliderPassenger.noUiSlider.updateOptions({
        padding: [0, pad]
    })
    
    updateFigure()
});

// Synchro with the input
inputPilot.addEventListener('change', function () {
    sliderPilot.noUiSlider.set([this.value, null]);
});

// ----- ----- ----- ----- ----- ----- ----- ----- ----- 
// BAGGAGE
// Init slider
noUiSlider.create(sliderBaggage, {
    start: [baggageWeightDefault],
    connect: true,
    behaviour: 'snap',
    step: 1,
    range: {
        'min': 0,
        'max': 25
    },
    pips: {
        // mode: 'range',
        mode: 'values',
        values: [0, 5, 10, 15, 20, 25],
        density: 4,
    },
});

// When slider is update
sliderBaggage.noUiSlider.on('update', function (values, handle) {
    var value = values[handle];
    inputBaggage.value = Math.round(value);
    updateFigure()
});

// Synchro with the input
inputBaggage.addEventListener('change', function () {
    sliderBaggage.noUiSlider.set([this.value, null]);
});

// ----- ----- ----- ----- ----- ----- ----- ----- ----- 
// SWITCH BALLAST
document.addEventListener('DOMContentLoaded', function () {
    var checkbox = document.querySelector('input[type="checkbox"]');

    checkbox.addEventListener('change', function () {
        if (checkbox.checked) {
            // console.log('Checked REAR');
            switchPosition = 0;
            updateFigure()
        } else {
            // console.log('Not checked FRONT');
            switchPosition = 1;
            updateFigure()
        }
    });
});

// function updateInputs() {
//     if (hour < 18) {
//         greeting = "Good day";
//       } 

// }