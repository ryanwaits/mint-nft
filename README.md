### Install Dependencies

Installing modules for only this package can cause conflicts. **Do these commands from the top directory.** This will install modules for all the repo's packages.

```bash
yarn install
```

### Run Script

This will continously call the `main()` function to try and mint your NFT, and will stop once the sale is active and your tx is sent.

```bash
yarn mint
```