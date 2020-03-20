const getBtn = document.getElementById('getFundsData');

const getStyle = function (str) {
    // 跌了 绿
    if (str.includes('-')) {
        return 'green';
    }
    // 默认为黑色
    return 'red';
};

const getName = function (str) {
    return str.split('(')[0];
};

const renderHead = function () {
    const headers = ['基金名称', '当前单价', '涨跌幅(%)', '涨跌价格', '昨日单价', '昨日涨跌幅(%)'];
    let header = '';
    headers.forEach(name => {
       header += `<th>${name}</th>`
    });
    return `<thead><tr>${header}</tr></thead>`;
};

const renderBody = function (json) {
    const keys = ['fundName', 'currentPrice', 'currentRate', 'currentSpread', 'yesterdayPrice', 'yesterdayRate'];
    let body = '';
    const getTD = function(i) {
        let td = '';
        let currentStyle = getStyle(i[keys[2]]);
        let yesterdayStyle = getStyle(i[keys[5]]);
        keys.forEach((k, idx) => {
            if (idx <= 3) {
                td += `<td style="color: ${currentStyle}">${idx === 0 ? getName(i[k]) : i[k]}</td>`;
            } else {
                td += `<td style="color: ${yesterdayStyle}">${i[k]}</td>`;
            }
        });
        return td;
    };
    json.forEach(i => {
        body += `<tr>${getTD(i)}</tr>`;
    });
    return `<tbody>${body}</tbody>`;
};

const render = function (json) {
    document.getElementsByTagName('table')[0].innerHTML = `${renderHead()}${renderBody(json)}`;
    // document.getElementsByTagName('table')[0].innerHTML = `${renderHead()}`;
    // document.getElementsByTagName('table')[0].innerHTML = `${renderBody(json)}`;
};

const getFundsData = function (cb) {
    fetch('https://cloudapi.bytedance.net/faas/services/tt9mal/invoke/getHTML')
        .then(response => response.json())
        .then(json => render(json))
        .catch(error => console.log(error));
};

getBtn.onclick = function () {
    getFundsData(render);
};

setInterval(() => getFundsData(render), 5 * 1000);
