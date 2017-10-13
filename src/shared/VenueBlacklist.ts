import { action, observable, computed } from "mobx";

export default class VenueBlacklist {
  @observable private map = new Map<number, true>();
  @computed public toArray() {
    const out = Array.from(this.map.keys());
    return out.length > 0 ? out : null;
  }
  @computed get all() {
    const out = Array.from(this.map.keys());
    return out.length > 0 ? out : null;
  }
  @computed public has(elem: number): boolean {
    return this.map.has(elem);
  }
  @action public set(elem: number): void {
    this.map.set(elem, true);
  }
  @action public delete(elem: number): void {
    this.map.delete(elem);
  }
}
