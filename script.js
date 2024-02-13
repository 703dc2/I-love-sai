document.addEventListener("DOMContentLoaded", () => {
  const images = ["pic1.jpg", "pic2.jpg", "pic3.jpg", "pic4.JPG", "pic5.JPG", "pic6.jpg", "pic7.JPG", "pic8.JPG", "pic9.JPG", "pic10.JPG", "pic11.JPG", "pic12.JPG", "pic13.JPG", "pic14.JPG", "pic15.JPG", "pic16.JPG", "pic17.JPG", "pic18.JPG", "pic19.JPG", "pic20.JPG", "pic21.JPG", "pic22.JPG", "pic23.jpg", "pic24.jpg", "pic25.jpg", "pic26.jpg", "pic27.jpg", "pic28.jpg", "pic29.jpg", "pic30.jpg", "pic31.jpg", "pic32.jpg", "pic33.jpg", "pic34.jpg", "pic35.jpg", "pic36.jpg"];   // List your images here, ensure the path is correct.
  images.forEach((image) => spawnImage(image));

  document.addEventListener("click", function (e) {
    spawnHearts(e.clientX, e.clientY);
  });

  const yesButton = document.getElementById("yesButton");
  const noButton = document.getElementById("noButton");

  yesButton.addEventListener("click", () => {
    alert("❤️ Thank you! Happy Valentine's Day! ❤️");
  });

  noButton.addEventListener("mouseover", () => {
    // Control the movement to ensure the button stays within the viewport
    let newX = noButton.offsetLeft + (Math.random() >= 0.5 ? -60 : 50); // Move left or right by 50px
    let newY = noButton.offsetTop + (Math.random() >= 0.5 ? -60 : 50); // Move up or down by 50px

    // Ensure the button doesn't go off-screen
    newX = Math.max(
      -400,
      Math.min(newX, window.innerWidth - noButton.offsetWidth)
    );
    newY = Math.max(
      -400,
      Math.min(newY, window.innerHeight - noButton.offsetHeight)
    );
    noButton.style.position = "fixed";
    noButton.style.left = `${newX}px`;
    noButton.style.top = `${newY}px`;
  });
});

function spawnImage(imageSrc) {
  const image = document.createElement("img");
  image.src = `pictures/${imageSrc}`;
  image.classList.add("falling-image");
  document.body.appendChild(image);

  const screenSize = Math.max(window.innerWidth, window.innerHeight);
  const size = Math.random() * (200 - 100) + 100; // Random size between 100px and 200px.
  image.style.width = `${size}px`;
  image.style.height = "auto";
  image.style.position = "absolute";
  image.style.left = `${Math.random() * (window.innerWidth - size)}px`; // Ensure images don't overflow the screen width.
  image.style.top = `${-size}px`; // Start above the screen.

  let currentTop = parseFloat(image.style.top);
  let fallRate = 0.2 + Math.random() * 0.9; // Adjust fall rate for variability.

  function fall() {
    currentTop += fallRate;
    image.style.top = `${currentTop}px`;

    if (currentTop < window.innerHeight + size) {
      // Continue falling until it's below the screen.
      requestAnimationFrame(fall);
    } else {
      image.remove(); // Cleanup after the image is out of view.
      spawnImage(imageSrc); // Respawn the image by calling spawnImage again.
    }
  }

  fall();

  // Pause animation on hover.
  image.addEventListener("mouseenter", () => (fallRate = 0));
  image.addEventListener(
    "mouseleave",
    () => (fallRate = 0.2 + Math.random() * 0.9)
  );
}

function spawnHearts(x, y) {
  const amount = 5; // Number of hearts to spawn on each click
  for (let i = 0; i < amount; i++) {
    const heart = document.createElement("img");
    heart.src = "pictures/heart.webp"; // Make sure the path is correct
    heart.classList.add("heart");
    document.body.appendChild(heart);

    // Position hearts at click location
    heart.style.left = `${x - 25}px`;
    heart.style.top = `${y - 25}px`;

    // Animate hearts outward from click
    setTimeout(() => {
      // Delay to allow for initial placement before animation
      const angle = Math.random() * Math.PI * 2; // Random angle for direction
      const distance = Math.random() * 100 + 50; // Random distance
      heart.style.transform = `translate(${Math.cos(angle) * distance}px, ${
        Math.sin(angle) * distance
      }px) scale(0)`; // Move and shrink
    }, 10);

    // Remove heart after animation to clean up
    setTimeout(() => heart.remove(), 5000); // Adjust timing based on transition
  }
}
