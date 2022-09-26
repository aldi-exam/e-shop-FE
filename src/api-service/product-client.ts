import { ProductInterface } from "@/components/products/types";
import db from "./db";
import { sleep } from "./helper";

export const getProducts = async (): Promise<ProductInterface[]> => {
  try {
    await sleep();
    return db.products as unknown as ProductInterface[];
  } catch (error) {
    console.log(error);
    return Promise.reject();
  }
};
