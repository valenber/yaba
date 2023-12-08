const content = document.getElementById("content");

fetch("/api/exchange/rate").then((res) => {
  res.text().then((text) => {
    content.innerHTML = text;
  });
});
