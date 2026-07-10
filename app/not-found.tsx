import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found-page">
      <p className="section-label">404 · NOT FOUND</p>
      <h1>페이지를 찾을 수 없습니다</h1>
      <p>주소를 다시 확인하거나 홈페이지에서 필요한 정보를 찾아보세요.</p>
      <Link className="button primary" href="/ko">
        홈페이지로 이동
      </Link>
    </main>
  );
}
