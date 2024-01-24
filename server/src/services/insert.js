import db from "../models";
import ChoThueCanHo from "../../data/choThueCanHo.json";
import { dataPrices, dataAcreages } from "../../data/prices-acreages.js";

require("dotenv").config();

export const insertService = () =>
  new Promise(async (resolve, reject) => {
    try {
      ChoThueCanHo.body.forEach(async (item) => {
        let desc = (item?.mainContent?.content || []).join("\n");
        let idPost = await db.POST.max("id");
        let idAttribute = await db.ATTRIBUTE.max("id");
        let idImg = await db.IMAGE.max("id");
        let totalUser = await db.USER.count();

        await db.POST.create({
          id: +idPost + 1,
          name: item?.header?.title,
          info: desc,
          star: item?.header?.star,
          attributeId: +idAttribute + 1,
          categoryCode: "CTCH",
          userId: Math.floor(Math.random() * totalUser),
          imgsId: +idImg + 1,
          acreageCode: dataAcreages.find(
            (acreage) =>
              acreage.max > currentAcreages && acreage.min <= currentAcreages
          )?.id,
          priceCode: dataPrices.find(
            (price) => price.max > currentPrice && price.min <= currentPrice
          )?.id,
        });
        await db.ATTRIBUTE.create({
          id: +idAttribute + 1,
          price: item?.header?.attributes?.price,
          categoryCode: "CTCH",
          acreage: item?.header?.attributes?.acreage,
          address: item?.header?.address,
        });
        await db.IMAGE.create({
          id: +idImg + 1,
          path: JSON.stringify(item?.images),
        });
      });
      resolve("Done.");
    } catch (error) {
      reject(error);
    }
  });

export const insertPricesAndAcreages = () =>
  new Promise((resolve, reject) => {
    try {
      dataPrices.forEach(async (item) => {
        await db.PRICE.create({
          id: item.id,
          value: item.value,
        });
      });
      dataAcreages.forEach(async (item) => {
        await db.ACREAGE.create({
          id: item.id,
          value: item.value,
        });
      });
      resolve("OK");
    } catch (err) {
      reject(err);
    }
  });
