import dayjs from "dayjs";

import type { Review } from "../common/interfaces";
import type { ShopeeItemRating } from "../common/types";

// I'm not quite sure, but looks like the "ctime" value from shopee needs to be multiplied by 1000 in order to show correct time information
const ONE_THOUSAND = 1000;

/**
 * Converts ShopeeItemRating into Review format
 *
 * @param {ShopeeItemRating} item The Shopee Item Rating
 * @returns {Review} Converted item in Review Format
 */
export default function convertShopeeItemRatingToReview(item: ShopeeItemRating): Review {
  let content = item.comment.replaceAll("\n\n", ", ");
  content = content.replaceAll("\n", ", ");

  const createdAt = dayjs(new Date(item.ctime * ONE_THOUSAND)).format("YYYY-MM-DD HH:mm");

  return {
    author: {
      name: String(item.author_username),
      url: item.anonymous ? null : `https://shopee.co.id/shop/${item.shopid}`,
    },
    content,
    rating: item.rating_star,
    variant: item.product_items[0]?.model_name,
    createdAt,
  };
}
