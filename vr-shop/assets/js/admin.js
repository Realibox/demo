let api_token = '';
let scene_id = '';
$('#tokenbtn').click(function setToken(e) {
    api_token = document.querySelector('#token').value;
    axios.post('/api_token', {
        api_token
    }).then(() => {
        alert('success set token');
        getProjects();
    }).catch((err) => {
        throw new Error('someting wrong');
    })
})




let sku_list = [{
        sku_id: '1',
        img: '//realicloud-production.oss-cn-shenzhen.aliyuncs.com/147f903b6848038a06cac3e8ca0c176e02924aac/3bbbd9e9db4a951ecac23da1248507fb.png',
        price: '359',
        link: ''
    },
    {
        sku_id: '2',
        img: '//realicloud-production.oss-cn-shenzhen.aliyuncs.com/147f903b6848038a06cac3e8ca0c176e02924aac/194d573618efc6688fa89d2f2d0ab82c.png',
        price: '456',
        link: ''
    },
    {
        sku_id: '3',
        img: '//realicloud-production.oss-cn-shenzhen.aliyuncs.com/147f903b6848038a06cac3e8ca0c176e02924aac/5d786da04498b0a81d4b0e62869dd110.png',
        price: '478',
        link: ''
    },
    {
        sku_id: '4',
        img: '//realicloud-production.oss-cn-shenzhen.aliyuncs.com/147f903b6848038a06cac3e8ca0c176e02924aac/ea90803d0029e666a12c710715d3730d.png',
        price: '589',
        link: ''
    },
    {
        sku_id: '5',
        img: '//realicloud-production.oss-cn-shenzhen.aliyuncs.com/147f903b6848038a06cac3e8ca0c176e02924aac/919f5de1e32a7c3d5755d880beefb4b6.png',
        price: '890',
        link: ''
    },
    {
        sku_id: '6',
        img: '//realicloud-production.oss-cn-shenzhen.aliyuncs.com/147f903b6848038a06cac3e8ca0c176e02924aac/93a919fd34983db7a26076bc0196c730.png',
        price: '311',
        link: ''
    },
]



function getProjects() {
    axios.get('/projects', {
        params: {
            api_token,
            cond_name: 'demo',
        }
    }).then((res) => {
        console.log(res);
        $('#project').append(res.data.projects.map(p => (`<option value="${p.scenes[0].scene_id}"><img src="${p.thumbnail}" alt="" />${p.name}</option>`)).join('\n'));
    })
}

$('#project').change(function() {
    updateLinks($(this).val())


})

function updateLinks(id) {
    scene_id = id;

    axios.get('/project', {
        params: {
            id,
            api_token,

        }
    }).then((res) => {
        console.log('detail', res);
        //
        let optionStr = res.data.links.map(l => (`<option value="${l.link_id}" ><img src="${l.icon}" alt="">${l.name}</option>`)).join('\n');
        console.log(optionStr);
        let sku_str = sku_list.map(s => (`<li>
        <img src="${s.img}" alt="">
        <input type="text" value="${s.price}" placeholder="价格">
	        <select name="links" id="${s.sku_id}">
	            ${optionStr}
	        </select>
	    </li>`)).join('\n');
        $("#color-list").append(sku_str);
    })


}




$("#save").click(function() {
    $("select[name='links']").map((n, ele) => {
        console.log(ele);
        let index = sku_list.findIndex((s) => s.sku_id == ele.id);
        if (!!~index) {
            sku_list[index].link = ele.value;
        }
    })
    axios.post('/detail', {
        detail_id: '01',
        sku_list,
        scene_id,
        api_token
    }).then((res) => {
        alert('success save');
    })

});