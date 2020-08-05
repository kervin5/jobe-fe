export const colors = [
  "#279AF1",
  "#FFBA08",
  "#407899",
  "#16DB93",
  "#E76F51",
  "#320E3B",
];

export function getColor(index) {
  return colors[index] ?? "#" + ((Math.random() * 0xffffff) << 0).toString(16);
}
