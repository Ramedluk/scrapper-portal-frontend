export enum ReviewStatus {
  STARTED = "started",
  SUCCESS = "success",
  PARTIAL = "partial",
  FAILED = "failed",
}

export interface IReview {
  id: string;
  totalReviews?: number;
  averageRating?: number;
  status: ReviewStatus;
  scrapedAt: string;
}

export interface IScrapingHistoryParams {
  siteId: string;
  companyId: string;
}
