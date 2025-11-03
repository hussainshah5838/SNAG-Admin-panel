import React, { useState } from "react";
import CampaignBuilder from "../components/CampaignBuilder";

export default function Campaigns() {
  const [cfg, setCfg] = useState({
    name: "Weekend Push",
    channel: "push",
    segment: "Mall Fashionistas",
    sendAt: "17:00",
  });
  return <CampaignBuilder value={cfg} onChange={setCfg} />;
}
