import type { z } from "zod";

import type { ShopeeItemRatingsAPIResponseSchema, ShopeeItemRatingSchema } from "./schemas";

export type ShopeeItemRating = z.infer<typeof ShopeeItemRatingSchema>;
export type ShopeeItemRatingsAPIResponse = z.infer<typeof ShopeeItemRatingsAPIResponseSchema>;
