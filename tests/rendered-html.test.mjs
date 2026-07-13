import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render(pathname) {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the Korean department home", async () => {
  const response = await render("/ko");
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /연세대학교 기계공학부/);
  assert.match(html, /기계공학으로 더 나은 움직임을 만듭니다/);
  assert.match(html, /연구분야/);
  assert.match(html, /교수진/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape/);
});

test("server-renders a core directory route", async () => {
  const response = await render("/ko/faculty");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /33/);
  assert.match(html, /강건욱/);
});

test("server-renders student activities and a club detail route", async () => {
  const listResponse = await render("/ko/about/student-activities");
  assert.equal(listResponse.status, 200);
  const listHtml = await listResponse.text();
  assert.match(listHtml, /학생활동·동아리/);
  assert.match(listHtml, /연세드론/);
  assert.match(listHtml, /MECar/);
  assert.match(listHtml, /로보인/);
  assert.match(listHtml, /SPACE Y/);

  const detailResponse = await render("/ko/about/student-activities/mecar");
  assert.equal(detailResponse.status, 200);
  const detailHtml = await detailResponse.text();
  assert.match(detailHtml, /자작 자동차/);
  assert.match(detailHtml, /주요 프로젝트/);
  assert.match(detailHtml, /링크 확인 필요/);
  assert.match(detailHtml, /https:\/\/www\.instagram\.com\/yonseimecar\//);
  assert.match(detailHtml, /target="_blank"/);

  for (const slug of ["yonsei-drone", "roboin", "space-y"]) {
    const response = await render(`/ko/about/student-activities/${slug}`);
    assert.equal(response.status, 200);
  }

  const englishResponse = await render("/en/about/student-activities/yonsei-drone");
  assert.equal(englishResponse.status, 200);
});

test("searches student activities from the shared data source", async () => {
  const expectedResults = [
    ["드론", "연세드론"],
    ["자작 자동차", "MECar"],
    ["로봇", "로보인"],
    ["인공위성", "SPACE Y"],
  ];

  for (const [query, expected] of expectedResults) {
    const response = await render(`/ko/search?q=${encodeURIComponent(query)}`);
    assert.equal(response.status, 200);
    const html = await response.text();
    assert.match(html, /학생활동·동아리/);
    assert.match(html, new RegExp(expected));
  }
});

test("server-renders faculty recruitment and finds it through integrated search", async () => {
  const koreanResponse = await render("/ko/news/faculty-recruitment");
  assert.equal(koreanResponse.status, 200);
  const koreanHtml = await koreanResponse.text();
  assert.match(koreanHtml, /교수 초빙/);
  assert.match(koreanHtml, /mech@yonsei\.ac\.kr/);
  assert.match(koreanHtml, /yonsei\.ac\.kr\/me-faculty-application/);
  assert.match(koreanHtml, /target="_blank"/);

  const englishResponse = await render("/en/news/faculty-recruitment");
  assert.equal(englishResponse.status, 200);
  const englishHtml = await englishResponse.text();
  assert.match(englishHtml, /Faculty Recruitment/);
  assert.match(englishHtml, /tenure-track faculty/);

  for (const query of ["교수 초빙", "교수 채용", "Faculty Recruitment", "Faculty Application", "tenure-track", "mech@yonsei.ac.kr"]) {
    const response = await render(`/ko/search?q=${encodeURIComponent(query)}`);
    assert.equal(response.status, 200);
    const html = await response.text();
    assert.match(html, /교수 초빙/);
    assert.match(html, /\/ko\/news\/faculty-recruitment/);
  }
});

test("redirects the retired academic information route", async () => {
  const response = await render("/ko/academics");
  assert.equal(response.status, 307);
  assert.equal(response.headers.get("location"), "http://localhost/ko/academics/undergraduate");
});

test("starter preview is removed and social image exists", async () => {
  const layout = await readFile(new URL("../app/layout.tsx", import.meta.url), "utf8");
  assert.doesNotMatch(layout, /codex-preview|_sites-preview|Starter Project/);
  await access(new URL("../public/og.png", import.meta.url));
  await Promise.all([
    "mecar.png",
    "roboin.png",
    "space-y.png",
    "yonsei-drone.png",
  ].map((name) => access(new URL(`../public/images/clubs/${name}`, import.meta.url))));
  await assert.rejects(access(new URL("../app/_sites-preview/SkeletonPreview.tsx", import.meta.url)));
});
