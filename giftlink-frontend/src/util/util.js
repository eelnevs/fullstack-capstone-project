export const camelToTitleCase = (word) =>
    [...word]
        .map((w, i) =>
            i === 0 ? w.toUpperCase() : w === w.toUpperCase() ? ` ${w}` : w
        )
        .join("");