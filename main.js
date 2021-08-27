function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('txt').innerHTML =
    "Current Time: " + h + ":" + m + ":" + s;
    var t = setTimeout(startTime, 500);
}

function checkTime(i) {
    if (i < 10) {i = "0" + i};
    return i;
}

const tableHeaders = 
    `
    <table>
        <tr>
            <th>Date</th>
            <th>Day</th>
            <th>High</th>
            <th>Low</th>
            <th>Weather Condition</th>
        </tr>
    `;

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('button').addEventListener('mousedown', async () => {
        const data = await fetch('https://api.thingspeak.com/channels/758817/feeds.json?api_key=2FWI4EIEU16J82DN');
        const weatherData = await data.json();
        let tableData = tableHeaders;
        await weatherData.feeds.forEach(feed => {
            console.log(feed);
            tableData += 
            `
            <tr>
                <td>${feed.created_at}</td>
                <td>${feed.field1}</td>
                <td>${feed.field2}</td>
                <td>${feed.field3}</td>
                <td>${feed.field4}</td>
            </tr>
            `
        });
        tableData += '</table>';
        document.getElementById('weatherTable').innerHTML = tableData;
    });
})