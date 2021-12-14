// Adapted from https://github.com/mathiasbynens/he/blob/36afe179392226cf1b6ccdb16ebbb7a5a844d93a/src/he.js#L106-L134

const decodeMap = new Map([
    [0, 65533],
    [128, 8364],
    [130, 8218],
    [131, 402],
    [132, 8222],
    [133, 8230],
    [134, 8224],
    [135, 8225],
    [136, 710],
    [137, 8240],
    [138, 352],
    [139, 8249],
    [140, 338],
    [142, 381],
    [145, 8216],
    [146, 8217],
    [147, 8220],
    [148, 8221],
    [149, 8226],
    [150, 8211],
    [151, 8212],
    [152, 732],
    [153, 8482],
    [154, 353],
    [155, 8250],
    [156, 339],
    [158, 382],
    [159, 376],
]);

const fromCodePoint =
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition, node/no-unsupported-features/es-builtins
    String.fromCodePoint ||
    function (codePoint: number): string {
        let output = "";

        if (codePoint > 0xffff) {
            codePoint -= 0x10000;
            output += String.fromCharCode(
                ((codePoint >>> 10) & 0x3ff) | 0xd800
            );
            codePoint = 0xdc00 | (codePoint & 0x3ff);
        }

        output += String.fromCharCode(codePoint);
        return output;
    };

export function replaceCodePoint(codePoint: number) {
    if ((codePoint >= 0xd800 && codePoint <= 0xdfff) || codePoint > 0x10ffff) {
        return 0xfffd;
    }

    return decodeMap.get(codePoint) ?? codePoint;
}

export default function decodeCodePoint(codePoint: number): string {
    return fromCodePoint(replaceCodePoint(codePoint));
}
