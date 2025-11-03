export function toCSV(rows, columns) {
  const head = columns.map((c) => `"${c.label}"`).join(",");
  const body = rows
    .map((r) => columns.map((c) => JSON.stringify(r[c.key] ?? "")).join(","))
    .join("\n");
  return [head, body].join("\n");
}
