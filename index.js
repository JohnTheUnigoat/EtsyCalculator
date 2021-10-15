let priceBoughtInput = document.getElementById('price-bought');
let packagingInput = document.getElementById('packaging');
let shippingInput = document.getElementById('shipping');
let extraInput = document.getElementById('extra');
let salePercentageInput = document.getElementById('sale-percentage');
let profitInput = document.getElementById('profit');

let submitButton = document.getElementById('submit');

submitButton.addEventListener('click', () => {
    /** @type {ParametersModel} */
    let parameters = {};

    parameters.priceBought = Number(priceBoughtInput.value);
    parameters.packaging = Number(packagingInput.value);
    parameters.shipping = Number(shippingInput.value);
    parameters.extra = Number(extraInput.value);
    parameters.salePercentage = Number(salePercentageInput.value);
    parameters.profit = Number(profitInput.value);

    console.log(parameters);
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

    console.log('etsy cut', res);
    return res;
}

function getPaypallCut(listedPrice) {
    let res = listedPrice * paypallCommissionMult + paypallAdd;

    console.log('paypall cut', res);
    return res;
}

function getWbCut(afterPaypallCut) {
    let res = afterPaypallCut * wbComissionMult;

    console.log('wb cut', res);
    return res;
}

function getSaleMargin(listedPrice, salePercentage) {
    let res = listedPrice / 100 * salePercentage;

    console.log('sale margin', res);
    return res;
}


function getProfit(listedPrice, boughtPrice, packaging, shipping, extra, salePercentage) {
    console.log(listedPrice, boughtPrice, packaging, shipping, extra, salePercentage);

    const upfrontCost = boughtPrice + packaging + shipping + extra;
    const etsyCut = getEtsyCut(listedPrice);
    const paypallCut = getPaypallCut(listedPrice);
    const afterPaypallCut = listedPrice - paypallCut;
    const wbCut = getWbCut(afterPaypallCut);
    const saleMargin = getSaleMargin(listedPrice, salePercentage);

    return listedPrice - upfrontCost - etsyCut - paypallCut - wbCut - saleMargin;
}

/** 
 * @typedef {{
 *  priceBought: number,
 *  packaging: number,
 *  shipping: number,
 *  extra: number,
 *  salePercentage: number,
 *  profit: number,
 * }} ParametersModel
 */

/** @param {ParametersModel} parameters */
function findListedPrice(parameters) {
    
}
