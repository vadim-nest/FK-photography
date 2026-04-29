const DEFAULT_ASPECT_RATIO = 1.5;

export function normalizeAspectRatio(value, fallback = DEFAULT_ASPECT_RATIO) {
  const ratio = Number(value);
  return Number.isFinite(ratio) && ratio > 0 ? ratio : fallback;
}

export function sameHeightGridColumns(items, getAspectRatio, fallback = DEFAULT_ASPECT_RATIO) {
  return items
    .map((item, index) => {
      const ratio = normalizeAspectRatio(getAspectRatio?.(item, index), fallback);
      return `minmax(0, ${ratio}fr)`;
    })
    .join(" ");
}
