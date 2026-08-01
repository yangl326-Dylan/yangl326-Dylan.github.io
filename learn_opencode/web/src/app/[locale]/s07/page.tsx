import { SessionDetail } from "@/components/version/session-detail";
import annotations from "@/data/annotations/s07.json";

export function generateStaticParams() {
  return [{ locale: "zh" }, { locale: "en" }];
}

export default function Page() {
  return <SessionDetail versionId="s07" annotations={annotations} />;
}
