import { Crops } from "..";

async function getCropsOnSaleList() {
  const cropsData = await Crops.findAll();
  return cropsData.map((dataItem) => {
    return {
      cropId: dataItem.cropId,
      name: dataItem.name,
      description: dataItem.description,
      onSaleCount: dataItem.onSaleCount,
      price: dataItem.price,
      requiredLevel: dataItem.requiredLevel,
    };
  });
}

export { getCropsOnSaleList };
