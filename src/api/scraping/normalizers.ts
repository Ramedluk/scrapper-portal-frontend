import { TObject } from "@/api/types";

import { IReview, ReviewStatus } from "./types";

export function normalizeReview(data?: TObject): IReview {
  return {
    id: (data?._id as string) || "",
    totalReviews: (data?.totalReviews as number) || 0,
    averageRating: (data?.averageRating as number) || 0,
    status: data?.status as ReviewStatus,
    scrapedAt: (data?.scrapedAt as string) || "",
  };
}
