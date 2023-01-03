// Super klassen för all renderbara komponenter
class Component {

  template() { // Abstract methods
    throw new Error("Template not implemented");
  }

  className() { // Abstract methods
    throw new Error("No class names defined");
  }

  refresh() {
    this.el.innerHTML = this.render().innerHTML;
  }

  render() {
    let div = document.createElement('div');

    try {
      div.innerHTML = this.template();
      div.firstElementChild.className = this.className();
    } catch (err) {
      console.warn(err);
    }

    this.el = div.firstElementChild;

    if (this.handleClick == undefined) {
      console.warn("handle click is not implemented");
    } else {
      this.el.addEventListener("click", event => this.handleClick(event));
    }

    return this.el;
  }
}

class CardDetailsModal extends Component {
  constructor(cardComponent) {
    super();
    this.parent = cardComponent;
    this.isOpen = false;
  }

  show() {
    if (this.isOpen) {
      return false;
    }

    this.modalElement = this.render();
    document.body.append(this.modalElement);

    this.isOpen = true;
  }

  exit(event) {
    if (event.currentTarget != event.target) {
      return false;
    }

    this.modalElement.remove();

    this.isOpen = false;
  }

  template() {
    return `
    <div>
      <div class="modal-content">
        <image class="modal-image" src=${this.parent.image.ref}>
        <p>Price: ${this.parent.price}&nbsp;kr</p>
        <p>Rating: ${this.parent.rating}&nbsp;/&nbsp;5</p>
        <button class="reserve-button">Reserve</button>
      </div>
    </div>
    `
  }

  className() {
    return "card-modal"
  }

  handleClick(event) {
    this.exit(event);
  }
}

class CardComponent extends Component {
  constructor(cardDetails) {
    super();
    this.name = cardDetails.name;
    this.host = cardDetails.host;
    this.date = cardDetails.date;
    this.rating = cardDetails.rating;
    this.price = cardDetails.price;
    this.image = cardDetails.image;

    this.modal = new CardDetailsModal(this);
  }

  className() {
    return "card";
  }

  template() {
    return `
    <article itemscope itemtype="https://schema.org/Product">
      <img
        class="card-image"
        width="300"
        itemprop="image"
        src="${this.image.ref}"
        alt="${this.image.alt}"
      />

      <section class="card-body">
        <div class="card-description" itemprop="description">
          <h3 class="description-name" itemprop="name">${this.name}</h3>
          <p class="description-host">${this.host}</p>
          <p class="description-date">${this.date}</p>
          <p class="description-price">${this.price} SEK</p>
        </div>

        <span class="card-rating">${this.rating}</span>
      </section>
    </article>
    `
  }

  handleClick(event) {
    this.modal.show();
  }
}