
export interface Card {
  id: number;
  path: string;
  name: string;
  x: number;
  y: number;
  content: string;
  contentId: string;
}

export interface Cards {
  type: string;
  cards: Card[];
  card: (Card | object);
  setId: string;
  setCotentId: number;
}

