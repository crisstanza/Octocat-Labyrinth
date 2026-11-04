export class Utils {
    containsAll(target, candidates) {
        return candidates.every((className) => target.contains(className));
    }
}
