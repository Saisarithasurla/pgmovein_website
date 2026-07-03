export interface LeadMetadata {
  landingPageUrl?: string;
  referrerUrl?: string;
  deviceType?: string;
  browser?: string;
  os?: string;
  screenResolution?: string;
  timezone?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
}

export function getVisitorMetadata(): LeadMetadata {
  if (typeof window === "undefined") {
    return {};
  }

  const userAgent = navigator.userAgent || "";
  const width = window.screen.width;
  const height = window.screen.height;

  // 1. Detect Device Type
  let deviceType = "Desktop";
  if (/Mobi|Android|iPhone|iPad|iPod/i.test(userAgent)) {
    deviceType = "Mobile";
  }
  if (/Tablet|iPad/i.test(userAgent)) {
    deviceType = "Tablet";
  }

  // 2. Detect OS
  let os = "Unknown OS";
  if (userAgent.indexOf("Win") !== -1) os = "Windows";
  else if (userAgent.indexOf("Mac") !== -1) os = "macOS";
  else if (userAgent.indexOf("X11") !== -1) os = "UNIX";
  else if (userAgent.indexOf("Linux") !== -1) os = "Linux";
  else if (/Android/i.test(userAgent)) os = "Android";
  else if (/iPhone|iPad|iPod/i.test(userAgent)) os = "iOS";

  // 3. Detect Browser
  let browser = "Unknown Browser";
  if (userAgent.indexOf("Chrome") !== -1 && userAgent.indexOf("Chromium") === -1) {
    browser = "Chrome";
  } else if (userAgent.indexOf("Safari") !== -1 && userAgent.indexOf("Chrome") === -1) {
    browser = "Safari";
  } else if (userAgent.indexOf("Firefox") !== -1) {
    browser = "Firefox";
  } else if (userAgent.indexOf("MSIE") !== -1 || !!(document as any).documentMode) {
    browser = "Internet Explorer";
  } else if (userAgent.indexOf("Edge") !== -1) {
    browser = "Edge";
  }

  // 4. Parse UTM Parameters
  const urlParams = new URLSearchParams(window.location.search);
  const utmSource = urlParams.get("utm_source") || undefined;
  const utmMedium = urlParams.get("utm_medium") || undefined;
  const utmCampaign = urlParams.get("utm_campaign") || undefined;

  // 5. Gather Timezone
  let timezone = "N/A";
  try {
    timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch (e) {}

  return {
    landingPageUrl: window.location.href,
    referrerUrl: document.referrer || "Direct",
    deviceType,
    browser,
    os,
    screenResolution: `${width}x${height}`,
    timezone,
    utmSource,
    utmMedium,
    utmCampaign,
  };
}
