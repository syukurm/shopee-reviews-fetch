import { z } from "zod";

export const ShopeeItemRatingSchema = z.object({
  shopid: z.number(),
  comment: z.string(),
  ctime: z.number(),
  rating_star: z.number(),
  author_username: z.string().nullable(),
  anonymous: z.boolean(),
  product_items: z.array(
    z.object({
      name: z.string(),
      model_name: z.string(),
    })
  ),
});

export const ShopeeItemRatingsAPIResponseSchema = z.object({
  data: z.object({
    ratings: z.array(ShopeeItemRatingSchema),
    has_more: z.boolean(),
  }),
});
