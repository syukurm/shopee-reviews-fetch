# Shopee Reviews Fetch

> A simple app to fetch reviews of a product item in Shopee from their API

I made this to quickly fetch reviews of a product item in Shopee using their API, then filter the data to only within 3 months ago, after that save it into a JSON file.

## Getting Started

Follow these steps to get the app running

### Prerequisites

Make sure you have the correct version of these installed

- [Node.js](https://nodejs.org/): `>=16.17.1`
- [pnpm](https://pnpm.io/): `>=7.12.2`

### Installing

Clone this repo and install all of the required dependencies

```shell
pnpm install
```

### Running it

Before running it, open the [main.ts](src/main.ts) file and fill in the `SHOP_ID` and `ITEM_ID` with the product's id and the shop's id you want to fetch the reviews from

```typescript
// Example
const SHOP_ID = "123456789";
const ITEM_ID = "1111111111";
```

After that build and run it

```bash
# Build it
pnpm build

# Run it
pnpm start
```

Check the `out` folder for the fetched reviews

## Extra Note

First of all, I barely know anything about Shopee's API. I found this `get_ratings` endpoint by checking the browser's developer tools network tab while I'm at a product page on Shopee's website. There's [Shopee Open Platform](https://open.shopee.com), but I can't seem to find the documentation for this endpoint. I think you need to have an account to use any of the endpoints mentioned in this documentation, and I personally don't wanna make any account, I just want to get all of the reviews of a product within 3 months ago quickly.

I've configured the app to only save the reviews that are within 3 months ago, you can change that in the [main.ts](src/main.ts) file

```typescript
const X_MONTHS = 3; // Change the '3'
```

Or you can modify the code to make it saves all of the reviews.

You can get the `ITEM_ID` of a product and the `SHOP_ID` of the product's shop by opening the product's page and checking the network tab on your browser's developer tools. There you should see a GET request to `get_ratings` endpoint with 7 query parameters.

- `filter` parameter I think is for filtering the review content. I don't know much about this one, but i think if it's `1` the API will only gets you reviews with comment in it, if it's `3` the API will only gets you reviews with media like picture and video attached to it, and if it's `0` then it will show all of it.

- `flag` parameter, I don't know what is this for.

- `itemid` parameter, this is the ID of the product.

- `limit` parameter, determines the limit on how many reviews the API should respond with. I think the highest number you can go is `59`. Any more than that will make the API respond with 0 reviews. And for the lowest number you can go is `0`, but if you go with `0` the API will respond with 15 reviews.

- `offset` parameter, I'm not good at explaining this one, you should check [this](https://www.sql.org/sql-database/postgresql/manual/queries-limit.html).

- `shopid` parameter, this is the ID of the shop.

- `type` parameter I think is for filtering the reviews star rating, so if it's `5` then the API will only gets you reviews with 5 stars rating, but if it's `0` then it will show any star rating.

## Current Problem

While making and testing the app, I've found that the highest number you can go on the `offset` parameter is `3000`, any more than that makes the API respond with 0 reviews. This makes us can only fetch around 3000 reviews max from a product, which is not what I wanted.

## Made using

- [Typescript](https://www.typescriptlang.org/) - I ❤️ Typescript
- [Got](https://github.com/sindresorhus/got) - HTTP Client
- [Day.js](https://day.js.org/) - For dealing with dates
- [Zod](https://zod.dev/) - Validating the API response
- [SWC](https://swc.rs/) - For compilation

## License

The code in this project is licensed under [MIT](LICENSE) License.
