import React from "react";

export default function Docs() {
  return (
    <div className="card p-4 space-y-2">
      <h3 className="font-semibold">Legal & Help</h3>
      <a className="btn-ghost" href="#" onClick={(e) => e.preventDefault()}>
        Terms & Conditions
      </a>
      <a className="btn-ghost" href="#" onClick={(e) => e.preventDefault()}>
        Privacy Policy
      </a>
      <a className="btn-ghost" href="#" onClick={(e) => e.preventDefault()}>
        Retailer Onboarding Guide
      </a>
    </div>
  );
}
