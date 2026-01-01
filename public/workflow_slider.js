document.addEventListener("DOMContentLoaded", () => {
    const track = document.querySelector(".workflow-track");
    const slides = document.querySelectorAll(".workflow-slide");
    let index = 0;

    setInterval(() => {
        index = (index + 1) % slides.length;
        track.style.transform = `translateX(-${index * 100}%)`;
    }, 3000); // 3 seconds per slide
});
