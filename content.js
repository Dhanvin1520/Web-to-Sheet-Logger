console.log("Hello from content script");
const selectedText = window.getSelection().toString();

document.addEventListener("mouseup", function (e) {
  const selectedText = window.getSelection().toString().trim();


  const oldBtn = document.getElementById("web2sheet-btn");
  if (oldBtn) oldBtn.remove();

  if (selectedText.length > 0) {
    const btn = document.createElement("button");
    btn.innerText = "Save";
    btn.id = "web2sheet-btn";
    btn.style.position = "absolute";
    btn.style.top = `${e.pageY}px`;
    btn.style.left = `${e.pageX}px`;
    btn.style.zIndex = 9999;
    btn.style.padding = "6px 12px";
    btn.style.background = "#4CAF50";
    btn.style.color = "#fff";
    btn.style.border = "none";
    btn.style.borderRadius = "4px";
    btn.style.cursor = "pointer";
    btn.style.boxShadow = "0 2px 6px rgba(0,0,0,0.2)";

    document.body.appendChild(btn);

    btn.addEventListener("click", () => {
      console.log("Selected Text:", selectedText);
      btn.remove(); 
    });
  }
});