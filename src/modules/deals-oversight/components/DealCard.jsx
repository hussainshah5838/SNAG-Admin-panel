import React from "react";
import Badge from "../../../shared/components/Badge";

export default function DealCard({ deal, onOpen }) {
  return (
    <article className="card overflow-hidden">
      <img src={deal.image} alt="" className="w-full h-36 object-cover" />
      <div className="p-3 space-y-1">
        <div className="flex items-center justify-between">
          <div className="font-medium truncate">{deal.title}</div>
          <Badge variant="brand">{deal.brand}</Badge>
        </div>
        <div className="muted text-sm">
          Radius {deal.radius}m · Ends{" "}
          {new Date(deal.expiresAt).toLocaleDateString()}
        </div>
        <div className="flex items-center justify-between pt-2">
          <div className="muted text-xs">Redemptions: {deal.redemptions}</div>
          <button className="btn-ghost" onClick={onOpen}>
            Details
          </button>
        </div>
      </div>
    </article>
  );
}
