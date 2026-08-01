import { SessionDetail } from "@/components/version/session-detail";
import annotations from "@/data/annotations/s01.json";

export function generateStaticParams() {
  return [{ locale: "zh" }, { locale: "en" }];
}

export default function Page() {
  return <SessionDetail versionId="s01" annotations={annotations} />;
}
