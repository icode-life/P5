const url = window.location.search;
const params = new URLSearchParams(url);
const orderId = params.get('orderID');

document.getElementById('orderId').textContent = orderId;