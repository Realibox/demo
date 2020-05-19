const u = require('../core/utils');
const BaseControl = require('./BaseControl');
const axios = require('axios');
const apis = require('../core/apis');



class Authorizer extends BaseControl {

    constructor(args) {
        super(args);
        this.app_id = 'QG84vlUdvi1xQRanC9QiFru4pVa5Bkrf';
        this.app_secret = 'HKtkP66ut2PfKgrF53YlVXrDyfCVy6Oc8IMri2FEIGMpv3mlWhnMOC5olYnDvPOY';

        //一般用数据库或者redis存着
        this.spaces = [];

    }

    // 根据用户传上来的token，把它存储起来
    async setApiToken(api_token) {
        let index = this.spaces.findIndex(v => v.api_token == api_token);
        if (!!~index) {
            this.spaces[index].api_token = api_token;
        } else {
            this.spaces.push({
                access_token: '',
                api_token,
                expire_time: 0
            })
        }

        let res = await this.check(api_token);



        //console.log(this.spaces);

        return res;

    }

    // 根据初始化好的三个值，对token进行维护
    async maintainAccessToken(api_token, index) {
        //console.log(this.spaces[index]);
        return axios.get(apis.realiboxToken, {
            params: {
                appid: this.app_id,
                appsecret: this.app_secret,
                api_token
            }
        }).then((res) => {
            console.log(res.data);
            this.spaces[index].api_token = api_token;
            this.spaces[index].expire_time = (new Date()).getTime() + res.data.info.expires_in * 1000;
            this.spaces[index].access_token = res.data.info.access_token;

            return 0;

        }).catch(e => {
            console.error(e);
            return 1;
        })

    }

    async check(api_token) {
        let index = this.spaces.findIndex(v => v.api_token == api_token);
        if (!!~index) {
            let now = (new Date()).getTime();
            if (now > this.spaces[index].expire_time) {
                await this.maintainAccessToken(api_token, index);
            }
            return this.spaces[index].access_token;
        } else {
            throw new Error('cannot found api_token');
        }
        //console.log(this.spaces);

    }

}

module.exports = Authorizer;