javascript: (function () {
  var imgs = document.querySelectorAll("img");
  if (imgs.length === 0) { alert("Aucune image trouvée."); return; }
  imgs.forEach(function (img) {
    var alt = img.getAttribute("alt");
    var span = document.createElement("span");
    span.style.position = "absolute";
    span.style.backgroundColor = "yellow";
    span.style.color = "black";
    span.style.fontSize = "12px";
    span.style.zIndex = 999999;
    span.innerText = "alt: " + (alt === null ? "[aucun]" : alt);
    var rect = img.getBoundingClientRect();
    span.style.left = (window.scrollX + rect.left) + "px";
    span.style.top = (window.scrollY + rect.top) + "px";
    document.body.appendChild(span);
  });
})();
