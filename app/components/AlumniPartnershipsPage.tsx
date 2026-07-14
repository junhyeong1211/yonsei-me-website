import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import type { Locale, LocaleText } from "../data/content";
import { alumniPartnerships } from "../data/alumniPartnerships";

const text = (value: LocaleText, locale: Locale) => value[locale];
const copy = (locale: Locale, ko: string, en: string) => locale === "ko" ? ko : en;
const localizedPath = (locale: Locale, path: string) => `/${locale}${path}`;

export function AlumniPartnershipsPage({ locale }: { locale: Locale }) {
  const { cases, contactEmail, description, inquiries, network, partnershipAreas, title } = alumniPartnerships;

  return (
    <>
      <header className="page-header alumni-partnerships-header">
        <div className="container page-header-inner">
          <p className="section-label light">ALUMNI &amp; PARTNERSHIPS</p>
          <h1>{text(title, locale)}</h1>
          <p>{text(description, locale)}</p>
        </div>
      </header>

      <div className="alumni-partnerships-page">
        <section className="section alumni-network-section" aria-labelledby="alumni-network-title">
          <div className="container alumni-partnerships-container">
            <header className="alumni-section-heading">
              <p className="section-label">ALUMNI NETWORK</p>
              <h2 id="alumni-network-title">{copy(locale, "동문 네트워크", "Alumni Network")}</h2>
            </header>
            <div className="alumni-network-grid">
              {network.map((item, index) => {
                const content = <><span>{String(index + 1).padStart(2, "0")}</span><h3>{text(item.title, locale)}</h3><p>{text(item.description, locale)}</p><small>{copy(locale, "콘텐츠 준비 중", "Content in preparation")}</small>{item.path && <ArrowRight size={18} aria-hidden="true" />}</>;
                return item.path
                  ? <Link href={localizedPath(locale, item.path)} key={item.id}>{content}</Link>
                  : <article key={item.id}>{content}</article>;
              })}
            </div>
          </div>
        </section>

        <section className="section partnership-areas-section" aria-labelledby="partnership-areas-title">
          <div className="container alumni-partnerships-container">
            <header className="alumni-section-heading">
              <p className="section-label">PARTNERSHIP AREAS</p>
              <h2 id="partnership-areas-title">{copy(locale, "대외협력 분야", "Partnership Areas")}</h2>
            </header>
            <div className="partnership-area-grid">
              {partnershipAreas.map((area, index) => <article key={area.id}><span>{String(index + 1).padStart(2, "0")}</span><h3>{text(area.title, locale)}</h3><p>{text(area.description, locale)}</p></article>)}
            </div>
          </div>
        </section>

        <section className="section partnership-cases-section" aria-labelledby="partnership-cases-title">
          <div className="container alumni-partnerships-container">
            <header className="alumni-section-heading">
              <p className="section-label">EXCHANGE HIGHLIGHTS</p>
              <h2 id="partnership-cases-title">{copy(locale, "주요 교류 사례", "Exchange Highlights")}</h2>
            </header>
            {cases.map((item) => {
              const path = item.relatedNewsSlug ? localizedPath(locale, `/news/${item.relatedNewsSlug}`) : null;
              return <article className="partnership-case" key={item.id}><div><span>{text(item.category, locale)}</span><time>{item.date}</time></div><h3>{path ? <Link href={path}>{text(item.title, locale)}</Link> : text(item.title, locale)}</h3><p>{text(item.description, locale)}</p>{path && <Link className="partnership-case-link" href={path}>{copy(locale, "관련 뉴스 보기", "View related news")}<ArrowRight size={17} /></Link>}</article>;
            })}
          </div>
        </section>

        <section className="section alumni-inquiry-section" aria-labelledby="alumni-inquiry-title">
          <div className="container alumni-partnerships-container">
            <header className="alumni-section-heading">
              <p className="section-label">GET INVOLVED</p>
              <h2 id="alumni-inquiry-title">{copy(locale, "참여 및 문의", "Participate & Contact")}</h2>
              <p>{copy(locale, "공식 학부 연락처를 통해 문의할 수 있습니다.", "Contact the department through its official email address.")}</p>
            </header>
            <div className="alumni-inquiry-links">
              {inquiries.map((item) => item.kind === "email"
                ? <a href={`mailto:${contactEmail}`} key={item.id} aria-label={`${text(item.title, locale)} ${contactEmail}`}><div><strong>{text(item.title, locale)}</strong><span>{text(item.description, locale)}</span><small>{contactEmail}</small></div><Mail size={19} aria-hidden="true" /></a>
                : <Link href={localizedPath(locale, item.path!)} key={item.id}><div><strong>{text(item.title, locale)}</strong><span>{text(item.description, locale)}</span></div><ArrowRight size={19} aria-hidden="true" /></Link>)}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

