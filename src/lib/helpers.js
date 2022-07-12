export const formatNumber = (num) => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

export const getMarketCap = (currentSupply, tokenPrice) => {
    return currentSupply * tokenPrice;
}