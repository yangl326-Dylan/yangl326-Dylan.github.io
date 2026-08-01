import { SessionDetail } from "@/components/version/session-detail";
import annotations from "@/data/annotations/s03.json";

export function generateStaticParams() {
  return [{ locale: "zh" }, { locale: "en" }];
}

export default function Page() {
  return <SessionDetail versionId="s03" annotations={annotations} />;
}
