export interface Review {
  author: {
    name: string;
    url: string | null;
  };
  content: string;
  rating: number;
  variant: string | undefined;
  createdAt: string;
}
