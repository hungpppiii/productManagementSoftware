export const getDate = (date) => {
  return date?.split("T").at(0).split("-").reverse().join("/");
};
