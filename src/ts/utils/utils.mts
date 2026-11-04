export class Utils {
  containsAll(target: DOMTokenList, candidates: string[]): boolean {
    return candidates.every((className) => target.contains(className));
  }
}
