const u = require('../core/utils');
const BaseControl = require('./BaseControl');
const axios = require('axios');
const apis = require('../core/apis');



class ProjectManager extends BaseControl {

    constructor(args) {
        super(args);

    }

    async getProjects(access_token, cond_name) {
        console.log({ access_token, name: cond_name });
        return await axios.get(apis.projects, {
            params: { access_token, name: cond_name }
        }).then((res) => {
            //console.log(res.data)
            return { projects: res.data.list.data };
        });
    }

    async getProjectDetail(access_token, id) {
        return await axios.get(apis.projectData(id), {
            params: { access_token }
        }).then((res) => {
            //console.log(res);
            return {
                scene_data: res.data.info,
                links: res.data.info.buttons.map(b => ({
                    icon: b.icon,
                    link_id: b.settings.timelines[0],
                    name: b.name
                }))
            };
        })
    }





}

module.exports = ProjectManager;