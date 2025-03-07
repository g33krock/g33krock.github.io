// script.js
document.addEventListener("DOMContentLoaded", () => {
    const doorImage = document.getElementById("door-image");

    doorImage.addEventListener("click", () => {
        doorImage.src = "./images/Door/dungeon-door.gif";
        setTimeout(() => {
            doorImage.src = "./images/Door/dungeon-door-open.png";
            setTimeout(() => {
                doorImage.classList.add("expanded");
                setTimeout(() => {
                    window.location.href = "playerSelect.html";
                }, 400); 

            }, 10); 
        }, 1500); 
    });
});
