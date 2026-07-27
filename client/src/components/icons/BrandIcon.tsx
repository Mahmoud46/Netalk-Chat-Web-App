import netalk_badge from "../../assets/icons/brand/netalk_badge.png";
import netalk_badge_dark from "../../assets/icons/brand/netalk_badge_dark.png";

import type { ReactNode } from "react";
import type { ThemeMode } from "../../types";

export const BrandIcon = ({
  theme = "light",
  className = "",
}: {
  theme?: ThemeMode;
  className?: string;
}): ReactNode =>
  theme == "light" ? (
    <img src={netalk_badge} loading="lazy" className={className ?? ""} />
  ) : (
    <img src={netalk_badge_dark} loading="lazy" className={className ?? ""} />
  );
