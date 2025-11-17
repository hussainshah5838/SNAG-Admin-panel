import React from "react";
import DataTable from "../../../shared/components/DataTable";

export default function Logs() {
  const rows = Array.from({ length: 20 }).map((_, i) => ({
    id: i + 1,
    channel: ["push", "email", "sms"][i % 3],
    status: ["sent", "delivered", "failed"][i % 3],
    ts: Date.now() - i * 120000,
    details: "OK",
  }));
  return null;
}
