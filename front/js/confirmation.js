const url = window.location.search;
const params = new URLSearchParams(url);
const orderId = params.get('orderId');

document.getElementById('orderId').textContent = orderId;