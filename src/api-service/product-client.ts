import { ProductInterface } from "@/components/products/types";
import db from "./db";

export const getProducts = async (): Promise<ProductInterface[]> => {
  try {
    return db.products as unknown as ProductInterface[];
  } catch (error) {
    console.log(error);
    return Promise.reject();
  }
};
