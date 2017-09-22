import { action, observable, computed } from "mobx";

export default class ObservableSet<T> {
  @observable private map = new Map<T, true>();
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
