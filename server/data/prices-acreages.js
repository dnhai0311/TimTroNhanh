const prices = [
  {
    id: 1,
    min: 0,
    max: 1,
    value: "Dưới 1 triệu",
  },
  {
    id: 2,
    min: 1,
    max: 2,
    value: "Từ 1 - 2 triệu",
  },
  {
    id: 3,
    min: 2,
    max: 3,
    value: "Từ 2 - 3 triệu",
  },
  {
    id: 4,
    min: 3,
    max: 5,
    value: "Từ 3 - 5 triệu",
  },
  {
    id: 5,
    min: 5,
    max: 7,
    value: "Từ 5 - 7 triệu",
  },
  {
    id: 6,
    min: 7,
    max: 10,
    value: "Từ 7 - 10 triệu",
  },
  {
    id: 7,
    min: 10,
    max: 15,
    value: "Từ 10 - 15 triệu",
  },
  {
    id: 8,
    min: 15,
    max: 9999,
    value: "Trên 15 triệu",
  },
];

const acreages = [
  {
    id: 1,
    min: 0,
    max: 20,
    value: "Dưới 20m",
  },
  {
    id: 2,
    min: 20,
    max: 30,
    value: "Từ 20m - 30m",
  },
  {
    id: 3,
    min: 30,
    max: 50,
    value: "Từ 30m - 50m",
  },
  {
    id: 4,
    min: 50,
    max: 70,
    value: "Từ 50m - 70m",
  },
  {
    id: 5,
    min: 70,
    max: 90,
    value: "Từ 70m - 90m",
  },
  {
    id: 6,
    min: 90,
    max: 9999,
    value: "Trên 90m",
  },
];

export const dataPrices = prices.map((item) => ({
  ...item,
}));
export const dataAcreages = acreages.map((item) => ({
  ...item,
}));
