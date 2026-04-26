import type { Product } from "./Product";

export type Order = {
  id: string;
  quantidade: number;
  total: number;
  product: Product;
};