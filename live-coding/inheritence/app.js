class Vehicle { // parent class of all vehicles
  constructor(color, fuelRate, fuelTank) {
    this.color = color;
    this.fuelRate = fuelRate;
    this.fuelTank = fuelTank;
  }

  consumeFuel() {
    this.fuelTank = this.fuelTank - this.fuelRate;
    console.log("Fuel tank:", this.fuelTank);
  }

  drive() {
    console.log("The vehicle is moving");
    this.consumeFuel();
  }
}
// ärver från föräldern Vehicle
// Car är (is-a) Vehicle
class Car extends Vehicle {
  constructor(color) {
    super(color, 0.6, 10)
    this.parkingBreakEngaged = false;
  }

  engageParkingBreak() {
    console.log("Engaged parking break");
  }

  drive() {
    console.log("Wroom wroom");
    this.consumeFuel();
  }
}

class Boat extends Vehicle {
  constructor(color) {
    super(color, 0.3, 20);
    this.anchorDropped = false;
    this.engineOn = false;
  }

  dropAnchor() {
    console.log("Dropped the anchor");
  }

  drive() {
    console.log("I am floating on water, whoo");
    if (this.engineOn) {
      this.consumeFuel();
    } else {
      console.log("And consuming absolutely no fuel!");
    }
  }
}

let boat = new Boat("Green");
let car = new Car("Maroon");

boat.drive();
car.drive();