const { Crops } = require('../db')

/**
 * @returns {{ 
 *   cropId: string;
 *   name: string;
 *   description: string;
 *   requiredLevel: number;
 *   seedCount: number;
 *   harvestCount: number;
 *   onSaleCount: number;
 *   price: number;
 * }}
 */
async function getCropsList() {
  const cropsData = await Crops.findAll()
  return cropsData.map(dataItem => {
    return {
      cropId: dataItem.cropId,
      name: dataItem.name,
      description: dataItem.description,
      requiredLevel: dataItem.requiredLevel,
      seedCount: dataItem.seedCount,
      harvestCount: dataItem.harvestCount,
      onSaleCount: dataItem.onSaleCount,
      price: dataItem.price
    }
  })
}

module.exports = {
  getCropsList,
}
