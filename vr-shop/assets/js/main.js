let detail_id = '01';
let api_token = '2c06c97f7b34424a85a4480a87c0d6d7';
var elements = {
    canvas: null
};

var rdker = null;
/**
 * 网页加载成功
 */

let links = [];
const originPrice = document.getElementById("originPrice")
const promoPrice = document.getElementById("promoPrice")

$('.color_wrapper').on('click', '.color_item', function(ele) {
    console.log(ele);
    let index = parseInt(this.id.slice(1));
    originPrice.innerHTML = links[index].price;
    promoPrice.innerHTML = parseInt(links[index].price * 0.7);
    rdker.events.call("rdk:interaction:run", links[index].link);
})

async function onLoad() {
    /**
     * 加载Info文件，使用平台定制化UI必须从该文件读取，该文件默认平台自动生成，每次在编辑中发布后会更新该文件
     */

    let scene_id = await axios.get('/detail', {
        params: {
            detail_id,
            api_token,
        }
    }).then(res => {
        let colors = res.data.sku_list.map((l, index) => (`<div class="color_item_wrapper"><div id="${'l'+index}" class="color_item"><img src="${l.img}" alt="" /></div></div>`)).join('\n');
        links = res.data.sku_list;

        $('.color_wrapper').append(colors);


        initScene({
            "name": "demo | realibox",
            "author": "amos",
            "version": "1.2",
            "engines": {
                "rdk": ">1.0.0"
            },
            "description": "",
            "ptype": 0,
            "prefix": "",
            "config": "",
            "sence_data": res.data.scene_data
        });

    })



    /**
     * 得到场景信息，初始化场景
     */

}
/**
 * 初始化场景
 *
 * @param {Object} data
 */
async function initScene(data) {
    // 判断SDK是否定义
    if (!realibox || !realibox.studio) {
        alert("SDK initialization failed!");
        return;
    }
    if (data.name) {
        document.title = decodeURIComponent(data.name);
    }




    // 从Info文件中读取配置文件信息
    sceneData = data.sence_data;
    /**
     * 解析场景数据，解析成功后即可初始化SDK
     */

    if (!sceneData) {
        alert("Scene file parsing error!");
    }

    elements.canvas = document.querySelector("#canvas");

    let options = {
        dracoDecoderConfig: {
            decoderFilePath: "./assets/js/libs/draco/draco_decoder.js",
            wasmWrapperFilePath: "./assets/js/libs/draco/draco_wasm_wrapper.js",
            wasmFilePath: "./assets/js/libs/draco/draco_decoder.wasm"
        }
    };

    if (data.prefix) {
        options.prefix = data.prefix;
    }

    /**
     * 初始化SDK
     */
    rdker = new realibox.studio(elements.canvas, options);

    if (rdker) {
        rdker.initialize(sceneData);
        /**
         * 监听资源加载进度
         */
        rdker.events.on("rdk:resource:update:progress", d => {
            // 可用于实现进度条
            console.log("当前进度：%s%", (d.progress * 100).toFixed(0));
        });
        /**
         * 监听资源初始化完成
         */
        rdker.events.on("rdk:resource:initialize:end", () => {
            // alert("Successful resource loading");
        });
    }
}

function onClick(id) {
    switch (id) {
        case 1:
            rdker.events.call("rdk:interaction:run", "496c4eec-bd75-4f4a-8216-57de07961e92");
            break;
        case 2:
            rdker.events.call("rdk:interaction:run", "d3b0bc38f12830bb842ae2fd0298b1e7f647b117");
            break;
        case 3:
            rdker.events.call("rdk:interaction:run", "03ed2aad563763fc908aa91297e09e9d6e38b8d9");
            break;

        default:
            break;
    }
}