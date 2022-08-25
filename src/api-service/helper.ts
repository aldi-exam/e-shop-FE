export const sleep = (timeout: number = 500) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};
