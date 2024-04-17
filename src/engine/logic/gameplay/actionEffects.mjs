//actionEffects.mjs

export function createFloatingText(entityId, textContent, color, name) {
  console.log(`${entityId}, ${textContent}, ${color}`);
  const entityDiv = document.getElementById(`entity-${entityId}`);
  const floatingTextDiv = document.createElement("div");

  floatingTextDiv.textContent = textContent;
  floatingTextDiv.style.position = "absolute";
  floatingTextDiv.style.textShadow = "2px 2px white";
  floatingTextDiv.style.width = "100px";
  floatingTextDiv.style.height = "100px";
  floatingTextDiv.style.backgroundImage = `url("../../../../images/${name}.png")`;
  floatingTextDiv.style.backgroundSize = "cover";
  floatingTextDiv.style.color = color;
  floatingTextDiv.style.fontSize = "50px";
  floatingTextDiv.style.fontWeight = "bold";
  floatingTextDiv.style.transition = "transform 1s ease, opacity 1s ease";
  floatingTextDiv.style.transform = "translateY(0px)";
  floatingTextDiv.style.opacity = "1";

  // Append and animate
  entityDiv.appendChild(floatingTextDiv);
  floatingTextDiv.offsetHeight;

  // Timeout to trigger CSS transition for floating effect
  setTimeout(() => {
    floatingTextDiv.style.transform = "translateY(-50px)";
    floatingTextDiv.style.opacity = "0";
  }, 100); // Start animation almost immediately

  console.log(window.getComputedStyle(floatingTextDiv).opacity);
  console.log(window.getComputedStyle(floatingTextDiv).transform);

  // Remove element after animation
  setTimeout(() => {
    entityDiv.removeChild(floatingTextDiv);
  }, 2000); // Match the duration of the animation
}
