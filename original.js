//Slider items
var quantitySlider = document.getElementById("quantitySlider");
//var colorSlider = document.getElementById("colorSlider");

// dinamic texts
var quantityInput = document.getElementById("quantityInput");
//var colorInput = document.getElementById("color");
var resultInput = document.getElementById("result");

// API base URL V1
const baseUrl = "https://api.swagup.com/form-api/v1";

// title, type of products
var typeTextBlock = document.getElementById("type-text");
//var resultTypeTextBlock = document.getElementById("result-type"); // Getting the result-type text block

// Variable to store the selected type value, with default value "Pack"
var selectedPricingType = "Pack";

// Image elements to show with IDs
var packElement = document.getElementById("packElement");
var bulkElement = document.getElementById("bulkElement");

// Set defaults
quantityInput.innerText = 50;
//colorInput.innerText = 1;
quantitySlider.value = quantityInput.innerText;
//colorSlider.value = colorInput.innerText;
resultInput.innerText = "$ 00"; // Setting default value to result input
typeTextBlock.textContent = "Pack Quantity"; // Setting default text
//resultTypeTextBlock.textContent = "Price per pack"; // Setting default text for result-type block

//fetchSwagPrices(colorSlider.value, quantitySlider.value, selectedPricingType);
//domOps();


// Function to handle radio type of product change
function handleRadioChange() {
    var typeRadio = document.querySelector('input[name="type"]:checked');

    if (typeRadio) {
        selectedPricingType = typeRadio.value;
        typeTextBlock.textContent =
            typeRadio.value === "Pack" ? "Pack Quantity" : "Item Quantity";
        resultTypeTextBlock.textContent =
            typeRadio.value === "Pack" ? "Price per pack" : "Price per item"; // Set text for result-type block

        if (typeRadio.value === "Pack") {
            packElement.classList.add("is-active");
            bulkElement.classList.remove("is-active");
        } else {
            packElement.classList.remove("is-active");
            bulkElement.classList.add("is-active");
        }
        //fetch for price
        fetchSwagPrices(
            colorSlider.value,
            quantitySlider.value,
            selectedPricingType
        );
    }
}

quantitySlider.addEventListener("input", (e) => {
    quantityInput.innerText = parseInt(e.target.value);
});

quantitySlider.addEventListener("change", async(e) => {
    await fetchSwagPrices(
        colorSlider.value,
        quantitySlider.value,
        selectedPricingType
    );
});