//Assign HTML DOM variables
let ipField = document.querySelector('.detail__card-ip .detail__card-value');
let locationField = document.querySelector('.detail__card-location .detail__card-value');
let timezoneField = document.querySelector('.detail__card-timezone .detail__card-value');
let ispField = document.querySelector('.detail__card-isp .detail__card-value');
let ipForm = document.forms["ipForm"].getElementsByTagName("input");

let ipForm__submit = document.querySelector('.ipForm__submit');
ipForm__submit.addEventListener('click', (e)=>{
    e.preventDefault()
    handleForm()
})

let getIp = async () =>{
try {
    const response = await axios.get('https://api.ipify.org?format=json').then((response)=>{
    ipField.innerHTML = response.data.ip;
    console.log(response)
    getDetails(response.data.ip)
    })
} catch (error) {
    console.error(error);
}
}

async function getDetails(ip) {
try {
    const response = await axios.get('https://geo.ipify.org/api/v2/country,city?apiKey=at_vXA7Aa0CY1l4BqtzJV0BzY60jYozz&ipAddress='+ip);
    console.log('===============================================================================');
    ipField.innerHTML = response.data.ip;
    locationField.innerHTML = response.data.location.region +", "+response.data.location.country;
    timezoneField.innerHTML = response.data.location.timezone;
    ispField.innerHTML= response.data.isp;
    loadMap(response.data.location.lat, response.data.location.lng)
    console.log(response);
    } catch (error) {
    console.error(error);
    }
}

let loadMap = (lat, long)=>{
    try {
    let map = L.map('map').setView([lat, long], 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    } catch (error) {

    }
}

let handleForm=()=>{
    let params = '';
    // for( let i=0; i<ipForm.length; i++ ){}
    let fieldName = ipForm[0].name;
    let fieldValue = ipForm[0].value;
    getDetails(fieldValue.trim());
}

window.addEventListener("load", (event) => {
    getIp();
});
