// src/components/GoogleIcon.js
import React from "react";

// Pick only the icons you actually use (keeps things simple + bundle sane)
import Home from "@material-symbols/svg-400/outlined/home.svg";
import HomeFill from "@material-symbols/svg-400/outlined/home-fill.svg";
import Search from "@material-symbols/svg-400/outlined/search.svg";
import Settings from "@material-symbols/svg-400/outlined/settings.svg";
import AddLocationAlt from "@material-symbols/svg-400/outlined/add_location_alt.svg";
import locationAway from "@material-symbols/svg-400/outlined/location_away.svg";


// Map names -> components (like expo icons "name" prop)
const ICONS = {
  home: Home,
  "home-fill": HomeFill,
  search: Search,
  settings: Settings,
  addLocation: AddLocationAlt,
  locAway: locationAway
};

export default function GoogleIcon({
  name,
  size = 24,
  color = "black",
  ...props
}) {
  const Icon = ICONS[name];

  if (!Icon) return null;
      // Most of these icons respect fill or color; if yours doesn't, see note below.

  return (
    <Icon
      width={size}
      height={size}
      fill={color}
      {...props}
    />
  );
}