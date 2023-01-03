const cardContainer = document.querySelector('.store');

// cardsDB.forEach(cardDetails => {
//   let cardComponent = new CardComponent(cardDetails);
//   cardContainer.append(cardComponent.render());
// });



const cardComponents = [
  new CardComponent(cardsDB[0]),
  new CardComponent(cardsDB[1]),
  new CardComponent(cardsDB[2])
]
cardContainer.append(cardComponents[0].render());
cardContainer.append(cardComponents[1].render());
cardContainer.append(cardComponents[2].render());

cardComponents[1].price = 1751;
cardComponents[1].refresh();