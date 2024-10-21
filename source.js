//Slider
var quantitySlider = document.getElementById("quantitySlider");
var colorSlider = 1;

// dinamic texts
var quantityInput = document.getElementById("quantityInput");
//var colorInput = document.getElementById("color");
var resultInput = document.getElementById("result");

// API base URL V1
const baseUrl = "https://api.swagup.com/form-api/v1";

// Text-block
var typeTextBlock = document.getElementById("type-text");
//var resultTypeTextBlock = document.getElementById("result-type"); // Getting the result-type text block

// Variable to store the selected type value, with default value "Pack"
var selectedPricingType = "Pack";

// Elements with IDs
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

fetchSwagPrices(colorSlider.value, quantitySlider.value, selectedPricingType);
//domOps();
// Function to handle radio change
function handleRadioChange() {
    var typeRadio = document.querySelector('input[name="type"]:checked');

    if (typeRadio) {
        selectedPricingType = typeRadio.value;
        console.log(selectedPricingType)
            //typeTextBlock.textContent =
            // typeRadio.value === "Pack" ? "Pack Quantity" : "Item Quantity";
            //resultTypeTextBlock.textContent =
            //typeRadio.value === "Pack" ? "Price per pack" : "Price per item"; // Set text for result-type block

        if (typeRadio.value === "Pack") {
            console.log(typeRadio.value)
                // packElement.classList.add("is-active");
                //bulkElement.classList.remove("is-active");
        } else {
            //packElement.classList.remove("is-active");
            //bulkElement.classList.add("is-active");
            console.log(typeRadio.value)
        }

        console.log(colorSlider, quantitySlider.value, selectedPricingType)
        fetchSwagPrices(
            colorSlider,
            quantitySlider.value,
            selectedPricingType
        );

    }
}







function makeRequestBody(dynamicColors, dynamicQuantity, type) {
    if (type.toLowerCase() === "pack") {
        const itemIds = [144, 131, 64, 105, 296, 2652, 93, 91];
        const unitsPerPack = 1;
        const products = itemIds.map((item_id) => ({
            item_id,
            units_per_pack: unitsPerPack,
            colors: parseInt(dynamicColors)
        }));

        const packRequestBody = {
            quantities: [{ quantity: parseInt(dynamicQuantity) }],
            products
        };
        return packRequestBody;
    } else {
        const bulkRequestBody = {
            products: [{
                item_id: 188,
                colors: parseInt(dynamicColors),
                quantities: [{
                    quantity: parseInt(dynamicQuantity)
                }]
            }]
        };
        return bulkRequestBody;
    }
}

function getRoute(type) {
    if (type.toLowerCase() === "pack") {
        return baseUrl + "/pack-multiple-price/";
    } else {
        return baseUrl + "/bulk-pricing/";
    }
}

async function fetchSwagPrices(dynamicColors, dynamicQuantity, type) {
    const prevCost = resultInput.innerText;
    resultInput.innerText = "...";
    let body = JSON.stringify(
        makeRequestBody(dynamicColors, dynamicQuantity, type)
    );
    let url = getRoute(type);
    try {
        const res = await fetch(url, {
            headers: {
                accept: "application/json, text/plain, */*",
                "accept-language": "en-GB,en;q=0.8",
                "content-type": "application/json",
                "sec-ch-ua": '"Chromium";v="116", "Not)A;Brand";v="24", "Brave";v="116"',
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": '"macOS"',
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-site",
                "sec-gpc": "1"
            },
            referrer: "https://www.swagup.com/",
            referrerPolicy: "strict-origin-when-cross-origin",
            body: body,
            method: "POST",
            mode: "cors",
            credentials: "omit"
        });

        let pricing = await res.json();
        if (selectedPricingType.toLowerCase() === "pack") {
            resultInput.innerText = "$ " + pricing.quantities[0].price;
        } else {
            resultInput.innerText = "$ " + pricing.products[0].quantities[0].price;
        }
    } catch (error) {
        resultInput.innerText = prevCost;
    }
}





quantitySlider.addEventListener("input", (e) => {
    quantityInput.innerText = parseInt(e.target.value);
});


//Choosing color
document.querySelectorAll('input[name="logo-color"]').forEach(function(radio) {
    radio.addEventListener("change", (e) => {

        //var colorSlider = 1;
        colorSlider = e.target.value;
        console.log(colorSlider)
        handleRadioChange();
    });
});

quantitySlider.addEventListener("change", async(e) => {
    await fetchSwagPrices(

        colorSlider,
        quantitySlider.value,
        selectedPricingType
    );
});

//Type change
document.querySelectorAll('input[name="type"]').forEach(function(radio) {
    radio.addEventListener("change", (e) => {
        handleRadioChange();
    });
});