document.addEventListener("DOMContentLoaded", () => {
  // Spawn images pic1 through pic37 on page load
  const images = [
    "pic1.jpg",
    "pic2.jpg",
    "pic3.jpg",
    "pic4.JPG",
    "pic5.JPG",
    "pic6.jpg",
    "pic7.JPG",
    "pic8.JPG",
    "pic9.JPG",
    "pic10.JPG",
    "pic11.JPG",
    "pic12.JPG",
    "pic13.JPG",
    "pic14.JPG",
    "pic15.JPG",
    "pic16.JPG",
    "pic17.JPG",
    "pic18.JPG",
    "pic19.JPG",
    "pic20.JPG",
    "pic21.JPG",
    "pic22.JPG",
    "pic23.jpg",
    "pic24.jpg",
    "pic25.jpg",
    "pic26.jpg",
    "pic27.jpg",
    "pic28.jpg",
    "pic29.jpg",
    "pic30.jpg",
    "pic31.jpg",
    "pic32.jpg",
    "pic33.jpg",
    "pic34.jpg",
    "pic35.jpg",
    "pic36.jpg",
  ];
  images.forEach((image) => spawnImage(image));

  document.addEventListener("click", function (e) {
    spawnHearts(e.clientX, e.clientY);
  });

  const buttons = {
    movieButton: "Continue Watching Hitman: Grab as many snacks as possible, get water and drinks, get dessert, cuddle up in bed with your plushies (pretend they are Dhruv), and watch Hitman.",
    triviaButton:
      "Trivia Night: Find a trivia category we like online. One of us screenshares the question. First person to text the other person buz gets to answer. If they anwer correctly they win, if not the other person gets 10 seconds to answer correctly and get 2 points!",
    scavengerButton:
      "Scavenger Hunt: Get a list of common household items. Put them in a random order generator. First person to find the item and bring it back to the camera wins a point.",
    pictionaryButton:
      "1v1 Pictionary: Go to skribbl.io. Take turns drawing a word or phrase and guess what the other person is drawing.",
  };

  const popup = document.getElementById("popup");
  const popupText = document.getElementById("popupText");
  const closePopup = document.getElementById("closePopup");

  Object.keys(buttons).forEach((buttonId) => {
    document.getElementById(buttonId).addEventListener("click", () => {
      popupText.textContent = buttons[buttonId];
      popup.style.display = "block";
    });
  });

  closePopup.addEventListener("click", () => {
    popup.style.display = "none";
  });

  window.addEventListener("click", (event) => {
    if (event.target == popup) {
      popup.style.display = "none";
    }
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
  image.addEventListener("click", () => (fallRate = 0));
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
