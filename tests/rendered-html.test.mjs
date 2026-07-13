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

test("starter preview is removed and social image exists", async () => {
  const layout = await readFile(new URL("../app/layout.tsx", import.meta.url), "utf8");
  assert.doesNotMatch(layout, /codex-preview|_sites-preview|Starter Project/);
  await access(new URL("../public/og.png", import.meta.url));
  await assert.rejects(access(new URL("../app/_sites-preview/SkeletonPreview.tsx", import.meta.url)));
});
