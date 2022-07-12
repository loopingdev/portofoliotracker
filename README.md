# Rora Realm - Dashboard

## Setup

1. Install Dependencies

    Run the following command:
    ```
        yarn
    ```

2. Create accounts in following platforms and get API keys:

    1. Covalent - https://www.covalenthq.com/
    2. Infura - https://infura.io/

3. Rename the .env.example file .env file and add the API keys:

    ```
        REACT_APP_TOKEN_ADDRESS=0xf9Ab8A817672c1468F5a6abB54f1D825f7b7bFc5
        REACT_APP_TREASURY_ADDRESS=0x66963139262014c19A65727b1e1c2f8C263cfA6d
        REACT_APP_INFURA_KEY=<INFURA_KEY_HERE>
        REACT_APP_COVALENT_KEY=<COVALENT_KEY_HERE>
        REACT_APP_CHAIN_ID=56
    ```

## Usage

1. Run `yarn start`
2. Navigate to localhost:3000

## Build project

1. Run `yarn build`