export default class Queue {
  constructor() {
    this.items = [];
    this.head = 0;
    this.tail = 0;
  }

  add(item) {
    this.items.push(item);
    this.tail++;
  }

  remove() {
    const item = this.items[this.head];
    this.items.splice(this.head, 1);
    this.head++;
    return item;
  }

  getAll() {
    return this.items.slice(this.head);
  }

  isEmpty() {
    return this.head === this.tail;
  }

  size() {
    return this.tail - this.head;
  }
  
  clear() {
    this.items = [];
    this.head = 0;
    this.tail = 0;
  }
}
