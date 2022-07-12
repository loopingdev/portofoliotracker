const BASE_URI = `https://api.covalenthq.com/v1/${process.env.REACT_APP_CHAIN_ID}`;

async function getHolders(pageNumber){
    const URL = `${BASE_URI}/tokens/${process.env.REACT_APP_TOKEN_ADDRESS}/token_holders/?key=${process.env.REACT_APP_COVALENT_KEY}&page-number=${pageNumber}`
    const resp = await fetch(URL);
    const data = await resp.json();
    return data;
}

async function getTreasuryItems(){
    const URL = `${BASE_URI}/address/${process.env.REACT_APP_TREASURY_ADDRESS}/balances_v2/?key=${process.env.REACT_APP_COVALENT_KEY}`;
    const resp = await fetch(URL);
    const data = await resp.json();
    return data;
}

async function getTokenTransfersByAddress(walletAddress){
    const URL = `${BASE_URI}/address/${walletAddress}/transfers_v2/?key=${process.env.REACT_APP_COVALENT_KEY}&contract-address=${process.env.REACT_APP_TOKEN_ADDRESS}`;
    const resp = await fetch(URL);
    const data = await resp.json();
    return data;
}

export const getTokenHoldersCount = async () => {
    let pageNumber = 0;
    let holderData = null;
    let holdersCount = 0;
    let hasMore = true;

    while (hasMore){
        holderData = await getHolders(pageNumber);
        pageNumber = pageNumber+1;
        holdersCount += holderData.data.items.length;
        
        hasMore = holderData.data.pagination.has_more;
    }
    
    return holdersCount;
}

export const getTreasuryValue = async () => {
    const treasuryItems = await getTreasuryItems();
    const nativeToken = treasuryItems.data.items.find(item => item.contract_address === process.env.REACT_APP_TOKEN_ADDRESS.toLowerCase())
    return nativeToken.balance / ("1e" + 18)
}

export const getTokenBalance = async (walletAddress) => {
    let total = 0;
    const tokenBalance = await getTokenTransfersByAddress(walletAddress);
    if (tokenBalance.data?.items){
        const contractItem = tokenBalance.data.items.find(token => token.to_address == process.env.REACT_APP_TOKEN_ADDRESS.toLowerCase())
        const transfers = contractItem?.transfers?.map(transfer => {
            return transfer.to_address == walletAddress && transfer.transfer_type == "IN" ? transfer.delta / ("1e"+18) : 0
        })
        if(transfers){
            total = transfers.reduce((partialSum, a) => partialSum + a, 0);
        }
        
    }
    
    
    return total;
}