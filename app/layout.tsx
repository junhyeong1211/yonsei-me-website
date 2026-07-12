import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const isLocalHost = host.startsWith("localhost") || host.startsWith("127.0.0.1") || host.startsWith("[::1]");
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (isLocalHost ? "http" : "https");
  const origin = `${protocol}://${host}`;

  return {
    metadataBase: new URL(origin),
    title: {
      default: "연세대학교 기계공학부",
      template: "%s | 연세대학교 기계공학부",
    },
    description:
      "연세대학교 기계공학부의 교육, 연구, 교수진, 학과 소식을 연결하는 공식 홈페이지 프론트엔드입니다.",
    icons: {
      icon: [{ url: "/images/yonsei-symbol.png", type: "image/png" }],
      shortcut: ["/images/yonsei-symbol.png"],
      apple: [{ url: "/images/yonsei-symbol.png", type: "image/png" }],
    },
    openGraph: {
      title: "YONSEI UNIVERSITY · MECHANICAL ENGINEERING",
      description: "교육, 연구, 교수진과 학과 소식을 한 곳에서 확인하세요.",
      images: [{ url: `${origin}/og.png`, width: 1733, height: 909 }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "YONSEI UNIVERSITY · MECHANICAL ENGINEERING",
      description: "교육, 연구, 교수진과 학과 소식을 한 곳에서 확인하세요.",
      images: [`${origin}/og.png`],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
