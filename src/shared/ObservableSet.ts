import { action, observable, computed } from "mobx";

export default class ObservableSet<T> {
  @observable private map = new Map<T, true>();
  @computed public toArray() {
    const out: Array<T> = [];
    for (const [k, _] of this.map) {
      out.push(k);
    }
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
