export class MyDate extends Date {
  addHours = h => {
    this.setHours(this.getHours() + h);
    return this;
  };
  addMinutes = (m) => {
    this.setHours(this.getMinutes() + m);
    return this;
  };
}