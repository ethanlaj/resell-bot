Resell bot is a Node.js project and it works by taking data from the Ebay and Walmart APIs, matching the UPCs of listings from Ebay with Walmart products, and comparing the prices. If an Ebay listing's price was significantly higher, it would notify users in a Discord server about a possible resellable item.

## Discord Server for Notifications
![Discord Banner 4](https://discordapp.com/api/guilds/848696206691663892/widget.png?style=banner4)

## Default Criteria for the Alerts
1) Walmart price must be greater than $15
2) Ebay price must be EITHER:
- 1.5 times higher than the Walmart price
- $35 over the Walmart price
3) Ebay product is listed as condition "new"
4) Walmart product is (or was) offered in store

If you want to run your own version of this product, you can change the criteria at the top of the resellable/compare.js file:
```javascript
const COMPARE_PRICE = 35;
const MULTIPLIER = 1.5;
const MIN_WALMART_PRICE = 15;
```
Also, make sure you change your server IDs to match your server.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](https://choosealicense.com/licenses/mit/)