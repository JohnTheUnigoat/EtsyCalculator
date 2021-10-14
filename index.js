const etsyListingCreationCommission = 0.2;
const etsyPurchaseCommissionMult = 0.05;
const etsyTaxMult = 1.2;

const paypallCommissionMult = 0.029;
const paypallAdd = 0.3;
const wbComissionMult = 0.04;


// tmp
const boughtPrice = 20;
const packaging = 5;
const shipping = 10;
const extra = 0;

const maxAllowedSalePercentage = 10;


const listedPrice = 100;


const upfrontCost = boughtPrice + packaging + shipping + extra;

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

function getWbCut(listedPrice) {
    let res = (listedPrice - getPaypallCut(listedPrice)) * wbComissionMult;
	console.log('wb cut', res);
	return res;
}

function getSaleMargin(listedPrice) {
    let res = listedPrice / 100 * maxAllowedSalePercentage;
	console.log('sale margin', res);
	return res;
}


function getProfit(listedPrice) {
	return listedPrice
        - upfrontCost
        - getEtsyCut(listedPrice)
        - getPaypallCut(listedPrice)
        - getWbCut(listedPrice)
        - getSaleMargin(listedPrice);
}

alert(getProfit(listedPrice));



/**
 * @param {(number) => number} targetFn 
 * @param {number} desiredValue 
 */
function findArgument(targetFn, desiredValue) {
    // TODO
}