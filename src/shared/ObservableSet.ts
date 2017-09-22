import { action, observable, computed } from "mobx";

export default class ObservableSet<T extends number | string> {
  @observable private map = new Map<T, true>();
  @computed public toArray() {
    const out = Array.from(this.map.keys());
    return out.length > 0 ? out : null;
  }
  @computed public has(elem: T): boolean {
    return this.map.has(elem);
  }
  @action public set(elem: T): void {
    this.map.set(elem, true);
  }
  @action public delete(elem: T): void {
    this.map.delete(elem);
  }
}
