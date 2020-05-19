const u = require('../core/utils');
const BaseControl = require('./BaseControl');
const axios = require('axios');
const apis = require('../core/apis');
const Authorizer = require('./Authorizer');
const GoodsManager = require('./GoodsManager');
const ProjectManager = require('./ProjectManager');

class Alloter extends BaseControl {
    constructor(args) {
        super(args);
        this.authorizer = new Authorizer();
        this.goodsManager = new GoodsManager();
        this.projectManager = new ProjectManager();

    }

    // /
    main(ctx) {
        ctx.response.body = 'Hello World';

    }

    // /token
    setToken(ctx) {

        let { api_token } = ctx.request.body;
        this.authorizer.setApiToken(api_token);
        ctx.response.type = 'json';
        ctx.response.body = {
            msg: 'success'
        };
    }

    async getProjects(ctx) {

        let { api_token, cond_name } = ctx.request.query;

        let access_token = await this.authorizer.check(api_token);
        let data = await this.projectManager.getProjects(access_token, cond_name);
        //console.log(data);
        ctx.response.type = 'json';
        ctx.response.body = data;
    }

    async getProjectData(ctx) {

        let { api_token, id } = ctx.request.query;
        let access_token = await this.authorizer.check(api_token);
        let data = await this.projectManager.getProjectDetail(access_token, id);

        ctx.response.type = 'json';
        ctx.response.body = data;

    }

    updateGoodDetail(ctx) {
        let { detail_id, sku_list, scene_id } = ctx.request.body;
        let data = this.goodsManager.updateGoodDetail(detail_id, sku_list, scene_id);

        ctx.response.type = 'json';
        ctx.response.body = data;
    }

    async getGoodDetail(ctx) {
        let { api_token, detail_id } = ctx.request.query;
        let access_token = await this.authorizer.check(api_token);
        let data = this.goodsManager.getGoodDetail(detail_id);
        console.log('ddddddd', data);
        let data2 = await this.projectManager.getProjectDetail(access_token, data.scene_id);
        data.scene_data = data2.scene_data;
        ctx.response.type = 'json';
        ctx.response.body = data;
    }






}

module.exports = Alloter;