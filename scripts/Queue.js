export default class Queue {
  constructor(key) {
    this.key = key;
    this.items = JSON.parse(localStorage.getItem(key)) || [];
    this.head = 0;
    this.tail = this.items.length;
  }

  add(item) {
    this.items.push(item);
    this.tail++;
    localStorage.setItem(this.key, JSON.stringify(this.items));
  }

  remove() {
    const item = this.items[this.head];
    this.items.splice(this.head, 1);
    this.head++;
    localStorage.setItem(this.key, JSON.stringify(this.items));
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
    localStorage.removeItem(this.key);
  }
}