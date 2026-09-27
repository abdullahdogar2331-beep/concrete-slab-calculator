"use strict";

/*
  Concrete Slab Calculator
  All calculations are performed in the browser.
*/


// ------------------------------
// BAG YIELD SETTINGS
// ------------------------------
// These are approximate yields and should be updated according
// to the specific manufacturer's product label.

const BAG_YIELDS = {
  40: 0.30,
  60: 0.45,
  80: 0.60
};


// ------------------------------
// ELEMENTS
// ------------------------------

const lengthInput = document.getElementById("length");
const widthInput = document.getElementById("width");
const thicknessInput = document.getElementById("thickness");

const lengthUnit = document.getElementById("lengthUnit");
const widthUnit = document.getElementById("widthUnit");
const thicknessUnit = document.getElementById("thicknessUnit");

const priceInput = document.getElementById("price");
const wasteInput = document.getElementById("waste");
const bagSizeInput = document.getElementById("bagSize");

const calculateBtn = document.getElementById("calculateBtn");
const resetBtn = document.getElementById("resetBtn");

const recommendedYards = document.getElementById("recommendedYards");
const cubicFeetOutput = document.getElementById("cubicFeet");
const baseYardsOutput = document.getElementById("baseYards");
const wasteOutput = document.getElementById("wasteResult");
const estimatedCostOutput = document.getElementById("estimatedCost");
const costLabel = document.getElementById("costLabel");
const bagCountOutput = document.getElementById("bagCount");


// ------------------------------
// UNIT CONVERSION
// ------------------------------

function convertToFeet(value, unit) {
  if (unit === "in") {
    return value / 12;
  }

  return value;
}


// ------------------------------
// VALIDATION
// ------------------------------

function validateInput(input, errorElement, label) {
  const value = parseFloat(input.value);

  if (!input.value.trim()) {
    errorElement.textContent = `${label} is required.`;
    return false;
  }

  if (!Number.isFinite(value) || value <= 0) {
    errorElement.textContent = `${label} must be greater than 0.`;
    return false;
  }

  // Protect the calculator from absurdly large values.
  if (value > 1000000) {
    errorElement.textContent = `${label} value is too large.`;
    return false;
  }

  errorElement.textContent = "";
  return true;
}


// ------------------------------
// FORMATTERS
// ------------------------------

function formatNumber(value, decimals = 2) {
  return Number(value).toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  });
}


function formatCurrency(value) {
  return Number(value).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2
  });
}


// ------------------------------
// CALCULATE
// ------------------------------

function calculateConcrete() {

  const lengthError = document.getElementById("lengthError");
  const widthError = document.getElementById("widthError");
  const thicknessError = document.getElementById("thicknessError");

  const validLength = validateInput(
    lengthInput,
    lengthError,
    "Length"
  );

  const validWidth = validateInput(
    widthInput,
    widthError,
    "Width"
  );

  const validThickness = validateInput(
    thicknessInput,
    thicknessError,
    "Thickness"
  );

  if (!validLength || !validWidth || !validThickness) {
    return;
  }


  // Get raw values
  const rawLength = parseFloat(lengthInput.value);
  const rawWidth = parseFloat(widthInput.value);
  const rawThickness = parseFloat(thicknessInput.value);


  // Convert everything to feet
  const lengthFeet = convertToFeet(
    rawLength,
    lengthUnit.value
  );

  const widthFeet = convertToFeet(
    rawWidth,
    widthUnit.value
  );

  const thicknessFeet = convertToFeet(
    rawThickness,
    thicknessUnit.value
  );


  // Basic volume
  const cubicFeet = lengthFeet * widthFeet * thicknessFeet;


  // Convert to cubic yards
  const baseCubicYards = cubicFeet / 27;


  // Waste
  const wastePercent = parseFloat(wasteInput.value) || 0;

  const recommendedCubicYards =
    baseCubicYards * (1 + wastePercent / 100);


  // ------------------------------
  // DISPLAY RESULTS
  // ------------------------------

  cubicFeetOutput.textContent =
    formatNumber(cubicFeet, 2);

  baseYardsOutput.textContent =
    formatNumber(baseCubicYards, 2);

  wasteOutput.textContent =
    `${wastePercent}%`;

  recommendedYards.textContent =
    formatNumber(recommendedCubicYards, 2);


  // ------------------------------
  // COST
  // ------------------------------

  const price = parseFloat(priceInput.value);

  if (
    priceInput.value.trim() &&
    Number.isFinite(price) &&
    price >= 0
  ) {

    const estimatedCost =
      recommendedCubicYards * price;

    estimatedCostOutput.textContent =
      formatCurrency(estimatedCost);

    costLabel.textContent =
      `$${formatNumber(price, 2)} / yd³`;

  } else {

    estimatedCostOutput.textContent = "—";
    costLabel.textContent = "enter price above";
  }


  // ------------------------------
  // BAG ESTIMATE
  // ------------------------------

  const bagSize = bagSizeInput.value;
  const bagYield = BAG_YIELDS[bagSize];

  if (bagYield > 0) {

    const requiredBags =
      Math.ceil(recommendedCubicYards / bagYield);

    bagCountOutput.textContent =
      requiredBags.toLocaleString("en-US");

  } else {

    bagCountOutput.textContent = "—";
  }


  // Smoothly bring results into view on mobile
  if (window.innerWidth <= 650) {
    document.getElementById("resultsCard").scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }
}


// ------------------------------
// WASTE BUTTONS
// ------------------------------

const wasteButtons =
  document.querySelectorAll(".waste-btn");

wasteButtons.forEach(button => {

  button.addEventListener("click", () => {

    wasteButtons.forEach(btn => {
      btn.classList.remove("active");
    });

    button.classList.add("active");

    wasteInput.value =
      button.dataset.waste;
  });

});


// ------------------------------
// BAG SIZE CHANGE
// ------------------------------

bagSizeInput.addEventListener("change", () => {

  // Only recalculate if the user has already entered values.
  if (
    lengthInput.value &&
    widthInput.value &&
    thicknessInput.value
  ) {
    calculateConcrete();
  }

});


// ------------------------------
// CALCULATE BUTTON
// ------------------------------

calculateBtn.addEventListener(
  "click",
  calculateConcrete
);


// ------------------------------
// ENTER KEY
// ------------------------------

[
  lengthInput,
  widthInput,
  thicknessInput,
  priceInput
].forEach(input => {

  input.addEventListener("keydown", event => {

    if (event.key === "Enter") {
      calculateConcrete();
    }

  });

});


// ------------------------------
// RESET
// ------------------------------

resetBtn.addEventListener("click", () => {

  lengthInput.value = "";
  widthInput.value = "";
  thicknessInput.value = "";
  priceInput.value = "";

  lengthUnit.value = "ft";
  widthUnit.value = "ft";
  thicknessUnit.value = "in";

  wasteInput.value = "10";
  bagSizeInput.value = "80";

  document.getElementById("lengthError").textContent = "";
  document.getElementById("widthError").textContent = "";
  document.getElementById("thicknessError").textContent = "";

  wasteButtons.forEach(btn => {
    btn.classList.remove("active");
  });

  document
    .querySelector('.waste-btn[data-waste="10"]')
    .classList.add("active");

  recommendedYards.textContent = "—";
  cubicFeetOutput.textContent = "—";
  baseYardsOutput.textContent = "—";
  wasteOutput.textContent = "—";
  estimatedCostOutput.textContent = "—";
  costLabel.textContent = "enter price above";
  bagCountOutput.textContent = "—";

});
