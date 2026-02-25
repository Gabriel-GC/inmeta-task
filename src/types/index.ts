export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Card {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface TradeCard {
  id: string;
  card: Card;
  type: "OFFERING" | "RECEIVING";
}

export interface Trade {
  id: string;
  userId: string;
  user: User;
  tradeCards: TradeCard[];
  createdAt: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface CreateCardDto {
  name: string;
  description: string;
  imageUrl: string;
}

export interface CreateTradeDto {
  cards: {
    cardId: string;
    type: "OFFERING" | "RECEIVING";
  }[];
}

export interface PaginatedResponse<T> {
  list: T[];
  rpp: number;
  page: number;
  more: boolean;
}
