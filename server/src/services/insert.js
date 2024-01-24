import db from "../models";
import { v4 } from "uuid";
import ChoThueCanHo from "../../data/choThueCanHo.json";

require("dotenv").config();

export const insertService = () =>
  new Promise(async (resolve, reject) => {
    try {
      ChoThueCanHo.body.forEach(async (item) => {
        let postId = v4();
        let attributesId = v4();
        let imgsId = v4();
        let desc = (item?.mainContent?.content || []).join("\n");
        await db.POST.create({
          id: postId,
          name: item?.header?.title,
          info: desc,
          star: item?.header?.star,
          attributesId,
          categoryCode: "CTCH",
          userId: "a059a3fb-098d-42da-a841-3e3c37ed6552",
          imgsId,
          // areaCode: dataArea.find(
          //   (area) => area.max > currentArea && area.min <= currentArea
          // )?.code,
          // priceCode: dataPrice.find(
          //   (area) => area.max > currentPrice && area.min <= currentPrice
          // )?.code,
        });
        await db.ATTRIBUTE.create({
          id: attributesId,
          price: item?.header?.attributes?.price,
          categoryCode: "CTCH",
          acreage: item?.header?.attributes?.acreage,
          address: item?.header?.address,
        });
        await db.IMAGE.create({
          id: imgsId,
          path: JSON.stringify(item?.images),
        });
      });
      resolve("Done.");
    } catch (error) {
      reject(error);
    }
  });

export const createPricesAndAcreages = () =>
  new Promise((resolve, reject) => {
    try {
      dataPrice.forEach(async (item, index) => {
        await db.Price.create({
          code: item.code,
          value: item.value,
          order: index + 1,
        });
      });
      dataArea.forEach(async (item, index) => {
        await db.Area.create({
          code: item.code,
          value: item.value,
          order: index + 1,
        });
      });
      resolve("OK");
    } catch (err) {
      reject(err);
    }
  });
