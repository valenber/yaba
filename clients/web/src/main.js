const content = document.getElementById("content");

fetch("/api/exchange/rate").then((res) => {
  res.json().then((json) => {
    content.innerText = JSON.stringify(json.data, null, 2);
  });
});
