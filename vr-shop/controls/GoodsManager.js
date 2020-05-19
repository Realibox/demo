const u = require('../core/utils');
const BaseControl = require('./BaseControl');
const axios = require('axios');
const apis = require('../core/apis');



class GoodsManager extends BaseControl {

    constructor(args) {
        super(args);
        this.goods = [];
    }

    async updateGoodDetail(detail_id, sku_list, scene_id) {

        let index = this.goods.findIndex((g) => g.detail_id == detail_id)
        if (!!~index) {
            this.goods[index].sku_list = sku_list;
            this.goods[index].scene_id = scene_id;
        } else {
            this.goods.push({
                detail_id,
                sku_list,
                scene_id
            })
        }
        return 0;
    }

    getGoodDetail(detail_id) {
        let index = this.goods.findIndex((g) => g.detail_id == detail_id)
        if (!!~index) {
            return this.goods[index];
        } else {
            throw new Error('connot found detail_id');
        }
    }
}

module.exports = GoodsManager;