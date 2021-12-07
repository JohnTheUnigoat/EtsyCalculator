let priceBoughtInput = document.getElementById('price-bought');
let packagingInput = document.getElementById('packaging');
let shippingInput = document.getElementById('shipping');
let extraInput = document.getElementById('extra');
let salePercentageInput = document.getElementById('sale-percentage');
let profitInput = document.getElementById('profit');

const onNumericInput = (e) => {
    e.target.value = e.target.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
}

priceBoughtInput.addEventListener('input', onNumericInput);
packagingInput.addEventListener('input', onNumericInput);
shippingInput.addEventListener('input', onNumericInput);
extraInput.addEventListener('input', onNumericInput);
salePercentageInput.addEventListener('input', onNumericInput);
profitInput.addEventListener('input', onNumericInput);

let submitButton = document.getElementById('submit');

let resultDiv = document.getElementById('result');

submitButton.addEventListener('click', () => {
    const priceBought = Number(priceBoughtInput.value);
    const packaging = Number(packagingInput.value);
    const shipping = Number(shippingInput.value);
    const extra = Number(extraInput.value);
    const salePercentage = Number(salePercentageInput.value);
    const profit = Number(profitInput.value);

    let listedPrice = findListedPrice(priceBought, packaging, shipping, extra, salePercentage, profit);

    listedPriceStr = `${listedPrice.toFixed(1)}0`;

    resultDiv.innerText = `Цена листинга: $${listedPriceStr}`;
    resultDiv.className = 'result';
});


const etsyListingCreationCommission = 0.2;
const etsyPurchaseCommissionMult = 0.05;
const etsyTaxMult = 1.2;

const paypallCommissionMult = 0.029;
const paypallAdd = 0.3;
const wbComissionMult = 0.04;

function getEtsyCut(listedPrice) {
    const purcahseCut = listedPrice * etsyPurchaseCommissionMult;
    const withoutTax = etsyListingCreationCommission + purcahseCut;
    let res = withoutTax * etsyTaxMult;

    return res;
}

function getPaypallCut(listedPrice) {
    let res = listedPrice * paypallCommissionMult + paypallAdd;

    return res;
}

function getWbCut(afterPaypallCut) {
    let res = afterPaypallCut * wbComissionMult;

    return res;
}

function getSaleMargin(listedPrice, salePercentage) {
    let res = listedPrice / 100 * salePercentage;

    return res;
}


function getProfit(listedPrice, priceBought, packaging, shipping, extra, salePercentage) {
    const upfrontCost = priceBought + packaging + shipping + extra;
    const etsyCut = getEtsyCut(listedPrice);
    const paypallCut = getPaypallCut(listedPrice);
    const afterPaypallCut = listedPrice - paypallCut;
    const wbCut = getWbCut(afterPaypallCut);
    const saleMargin = getSaleMargin(listedPrice, salePercentage);

    return listedPrice - upfrontCost - etsyCut - paypallCut - wbCut - saleMargin;
}

function findListedPrice(priceBought, packaging, shipping, extra, salePercentage, profit) {
    let precision = 0.1;

    let totalExpense = priceBought + packaging + shipping + extra + profit;

    let price = totalExpense * (1 + salePercentage) * 20;

    let step = price / 2;

    while(step > precision) {
        let calculatedProfit = getProfit(price, priceBought, packaging, shipping, extra, salePercentage);

        if (calculatedProfit > profit) {
            price -= step;
        } else {
            price += step;
        }

        step /= 2;
    }

    return price;
}
