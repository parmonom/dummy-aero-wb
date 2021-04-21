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
var twoOccupantWeight = 25;

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
// CREATE SLIDERS

// PILOT 
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

// PASSENGER
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

// BAGGAGE
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

// FUEL
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


// ----- ----- ----- ----- ----- ----- ----- ----- ----- 
// ON UPDATE SLIDERS
// PILOT
sliderPilot.noUiSlider.on('update', function (values, handle) {
    var value = values[handle];
    inputPilot.value = Math.round(value);  
    // passenger max weight admissible
    var pad = Math.max(0, occupantMaxWeight - (paxMaxWeight - value));

    sliderPassenger.noUiSlider.updateOptions({
        padding: [0, pad]
    })
    updateFigure()
});

// PASSENGER 
sliderPassenger.noUiSlider.on('update', function (values, handle) {
    var value = values[handle];
    inputPassenger.value = Math.round(value);
    // reduce fuel and baggage admissible with two occupants
    if (value > twoOccupantWeight) {
        sliderFuel.noUiSlider.updateOptions({
            padding: [0, 50]
        })
        sliderBaggage.noUiSlider.updateOptions({
            padding: [0, 10]
        })
    } else {
        sliderFuel.noUiSlider.updateOptions({
            padding: [0, 0]
        })
        sliderBaggage.noUiSlider.updateOptions({
            padding: [0, 0]
        })
    }
    updateFigure()
});

// BAGGAGE
sliderBaggage.noUiSlider.on('update', function (values, handle) {
    var value = values[handle];
    inputBaggage.value = Math.round(value);
    updateFigure()
});

// FUEL
sliderFuel.noUiSlider.on('update', function (values, handle) {
    var value = values[handle];
    inputFuel.value = Math.round(value);
    updateFigure();
});


// ----- ----- ----- ----- ----- ----- ----- ----- ----- 
// ON UPDATE INPUTS
// EMPTY WEIGHT
inputEmptyWeight.addEventListener('change', function () {
    // sliderFuel.noUiSlider.set([this.value, null]);
    updateFigure();
});

// START MOMENT
inputStartMoment.addEventListener('change', function () {
    // sliderFuel.noUiSlider.set([this.value, null]);
    updateFigure();
});

// PILOT
inputPilot.addEventListener('change', function () {
    sliderPilot.noUiSlider.set([this.value, null]);
});

// PASSENGER
inputPassenger.addEventListener('change', function () {
    sliderPassenger.noUiSlider.set([this.value, null]);
});

// BAGGAGE
inputBaggage.addEventListener('change', function () {
    sliderBaggage.noUiSlider.set([this.value, null]);
});

// FUEL 
inputFuel.addEventListener('change', function () {
    sliderFuel.noUiSlider.set([this.value, null]);
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
