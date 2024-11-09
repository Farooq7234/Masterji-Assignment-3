export interface ApiResponse {
    success: boolean;
    message: string;
  }


export interface Source {
    id: string | null; // Can be null or a string
    name: string;
  }
  
export interface Article {
    source: Source;
    author: string | null; // Sometimes author might be null
    title: string;
    description: string;
    url: string;
    urlToImage: string; // Sometimes images might be null
    publishedAt: string; // ISO date string
    content: string;
  }
  
export interface NewsResponse {
    status: string;
    totalResults: number;
    articles: Article[];
  }
  