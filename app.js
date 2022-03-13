class Card {
  constructor(src) {
    this.src = src;
    this.parent = document.querySelector(".parent");
  }
  create() {
    // create els
    let card = document.createElement("div");
    let front = document.createElement("div");
    let back = document.createElement("div");
    let img = document.createElement("img");

    // add class and src
    card.classList.add("card");
    back.classList.add("back");
    front.classList.add("front");
    back.id = this.src;
    img.src = this.src;

    // append child
    back.append(img);
    card.append(back);
    card.append(front);
    this.parent.append(card);

    // add property
    this.card = card;
  }
}

class Memory {
  constructor(cardsLength) {
    this.cardsCount = cardsLength;
    this.imgs = [
      "camera.svg",
      "file-empty.svg",
      "home.svg",
      "image.svg",
      "music.svg",
      "pencil.svg",
    ];
    this.cards = [];
  }
  generate() {
    this.cardsSrc = [...this.imgs, ...this.imgs].sort((a, b) => {
      let num = [-1, 0, 1];
      let randomNumber = Math.floor(Math.random() * num.length);
      return num[randomNumber];
    });
  }
  display() {
    this.generate();
    for (let src of this.cardsSrc) {
      let card = new Card(`images/${src}`);
      card.create();
      this.cards.push(card.card);
    }
  }
  choose() {
    this.times = 0;
    this.checkValues = [];
    this.timeoutValue = false;
    setInterval(() => {
      for (let card of this.cards) {
        card.onclick = () => {
          if (this.timeoutValue) return;
          card.classList.add("active");
          this.times++;
          this.checkValues.push(card);
        };
      }

      if (this.times == 2) {
        this.returnStatus();
        this.check();
        this.gameOver();
      }
    });
  }
  returnStatus() {
    this.timeoutValue = true;
    this.times = 0;
    setTimeout(() => {
      this.cards.forEach((e) => e.classList.remove("active"));
      this.timeoutValue = false;
    }, 500);
  }
  check() {
    if (
      this.checkValues[0].children[0].id == this.checkValues[1].children[0].id
    ) {
      this.checkValues[0].classList.add("finish");
      this.checkValues[1].classList.add("finish");
    }
    // empty
    this.checkValues = [];
  }
  gameOver() {
    let finished = document.querySelectorAll(".finish") || 0;
    let congrats = document.querySelector(".congrats");

    if (finished.length == this.cards.length) {
      congrats.style.display = "grid";
    }
  }
}

let game = new Memory(12);
game.display();
game.choose();
