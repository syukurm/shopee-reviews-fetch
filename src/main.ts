import fs from "node:fs/promises";
import { join } from "node:path";

import consola from "consola";
import got from "got";

import type { Review } from "./common/interfaces";
import { ShopeeItemRatingsAPIResponseSchema } from "./common/schemas";
import type { ShopeeItemRatingsAPIResponse } from "./common/types";
import convertShopeeItemRatingToReview from "./utils/convertShopeeItemRatingToReview";
import isInXMonthsAgo from "./utils/isInXMonthsAgo";

const SHOP_ID = "";
const ITEM_ID = "";

const X_MONTHS = 3;

// Counter to counts how many times the fetcher ran
let counter = 0;
/**
 * Fetch item ratings from Shopee API
 *
 * @param {number} offset The offset for item ratings response
 */
async function fetchItemRatings(offset = 0): Promise<ShopeeItemRatingsAPIResponse> {
  const res = await got("https://shopee.co.id/api/v2/item/get_ratings", {
    searchParams: {
      itemid: ITEM_ID,
      shopid: SHOP_ID,
      limit: 30,
      offset,
      filter: 1,
      flag: 1,
      type: 0,
    },
  }).json();

  const data = await ShopeeItemRatingsAPIResponseSchema.parseAsync(res);
  counter++;
  consola.log(`Fetching #${counter}`);

  return data;
}

const reviews: Review[] = [];

const { data } = await fetchItemRatings();

data.ratings.forEach((rating) => {
  const review = convertShopeeItemRatingToReview(rating);
  reviews.push(review);
});

let hasMore = data.has_more;

while (hasMore) {
  const fetchedReviews = await fetchItemRatings(reviews.length);

  fetchedReviews.data.ratings.forEach((rating) => {
    const review = convertShopeeItemRatingToReview(rating);
    reviews.push(review);
  });

  hasMore = fetchedReviews.data.has_more;
}

const filteredReviews = reviews.filter((review) => isInXMonthsAgo(review.createdAt, X_MONTHS));

consola.info("Total reviews:", reviews.length);
consola.success(`Total reviews in ${X_MONTHS} months ago:`, filteredReviews.length);

const jsonify = {
  title: data.ratings[0]?.product_items[0]?.name,
  reviews: filteredReviews,
};

const fileName = `${new Date().toISOString().replaceAll(":", ".")}.json`;
const file = join(process.cwd(), "out", fileName);

// eslint-disable-next-line security/detect-non-literal-fs-filename
await fs.writeFile(file, JSON.stringify(jsonify, null, 2));
