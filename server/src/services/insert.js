import db from "../models";
import ChoThueCanHo from "../../data/choThueCanHo.json";
import ChoThuePhongTro from "../../data/choThuePhongTro.json";
import NhaChoThue from "../../data/NhaChoThue.json";
import ChoThueMatBang from "../../data/choThueMatBang.json";
import { dataPrices, dataAcreages } from "../../data/prices-acreages.js";

require("dotenv").config();

const dataBody = [
  {
    body: ChoThuePhongTro.body,
    code: "CTPT",
  },
  {
    body: ChoThueMatBang.body,
    code: "CTMB",
  },
  {
    body: ChoThueCanHo.body,
    code: "CTCH",
  },
  {
    body: NhaChoThue.body,
    code: "NCT",
  },
];

const getNumberFromString = (string) => {
  let number = 0;
  if (string.search("đồng/tháng") !== -1) {
    number = +string.match(/\d+/)[0] / Math.pow(10, 3);
  } else if (string.search("triệu/tháng") !== -1) {
    number = +string.match(/\d+/)[0];
  } else if (string.search("m")) {
    number = +string.match(/\d+/)[0];
  }
  return number;
};

export const insertService = async () => {
  try {
    for (const cate of dataBody) {
      for (const item of cate.body) {
        let desc = (item?.mainContent?.content || []).join("\n");
        let idPost = await db.POST.max("id");
        let idAttribute = await db.ATTRIBUTE.max("id");
        let idImg = await db.IMAGE.max("id");
        let totalUser = await db.USER.count();
        let totalImg = await db.IMAGE.count();
        let currentPrice = +item?.header?.attributes?.price.split(" ")[0];
        currentPrice = currentPrice > 600 ? currentPrice / 1000 : currentPrice;

        const lastCommaIndex1 = item?.header?.address.lastIndexOf(",");
        const lastCommaIndex2 = item?.header?.address.lastIndexOf(
          ",",
          lastCommaIndex1 - 1
        );
        const tenHuyen = item?.header?.address
          .substring(lastCommaIndex2 + 2, lastCommaIndex1)
          .trim();

        let currentAcreage = getNumberFromString(
          item?.header?.attributes?.acreage
        );
        // console.log(tenHuyen);
        const districtId = await db.DISTRICT.findOne({
          where: {
            value: tenHuyen,
          },
        });
        // console.log(item?.header?.address);
        // console.log(tenHuyen);
        // console.log(districtId.id);

        await db.POST.create({
          id: +idPost + 1,
          title: item?.header?.title,
          description: desc,
          star: item?.header?.star || 5,
          attributeId: +idAttribute + 1,
          categoryCode: cate.code,
          userId: Math.floor(Math.random() * totalUser) + 1,
          // imgsId: Math.floor(Math.random() * totalImg) + 1,
          imgsId: +idImg + 1,
          acreageCode: dataAcreages.find(
            (acreage) =>
              acreage.max > currentAcreage && acreage.min <= currentAcreage
          )?.id,
          priceCode: dataPrices.find(
            (price) => price.max > currentPrice && price.min <= currentPrice
          )?.id,
        });

        await db.ATTRIBUTE.create({
          id: +idAttribute + 1,
          price: +currentPrice,
          acreage: +currentAcreage,
          address: item?.header?.address,
          districtId: districtId.id,
        });

        await db.IMAGE.create({
          id: +idImg + 1,
          path: JSON.stringify(item?.images),
        });
      }
    }

    return "Hoàn thành.";
  } catch (error) {
    throw error;
  }
};

export const insertPriceAndAcreageService = () =>
  new Promise((resolve, reject) => {
    try {
      dataPrices.forEach(async (item) => {
        await db.PRICE.create({
          id: item.id,
          value: item.value,
          min: item.min,
          max: item.max,
        });
      });
      dataAcreages.forEach(async (item) => {
        await db.ACREAGE.create({
          id: item.id,
          value: item.value,
          min: item.min,
          max: item.max,
        });
      });
      resolve("OK");
    } catch (err) {
      reject(err);
    }
  });
