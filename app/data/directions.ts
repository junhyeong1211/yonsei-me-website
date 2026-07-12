import type { LocaleText } from "./content";

export type SubwayExit = {
  number: string;
  description: LocaleText;
};

export type BusRouteGroup = {
  type: LocaleText;
  colorKey: "green" | "blue" | "red";
  routes: string[];
};

export type DepartmentDirections = {
  address: string;
  postalCode: string;
  phone: string;
  email: string;
  mapQuery: string;
  externalMapUrl: string;
  subway: {
    line: LocaleText;
    station: LocaleText;
    exits: SubwayExit[];
  };
  busRoutes: BusRouteGroup[];
};

const mapQuery = "서울특별시 서대문구 연세로 50 연세대학교 공과대학 기계공학부";

export const departmentDirections: DepartmentDirections = {
  address: "서울특별시 서대문구 연세로 50 연세대학교",
  postalCode: "03722",
  phone: "02-2123-2810",
  email: "nmh@yonsei.ac.kr",
  mapQuery,
  externalMapUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`,
  subway: {
    line: { ko: "2호선", en: "Line 2" },
    station: { ko: "신촌역", en: "Sinchon Station" },
    exits: [
      {
        number: "2",
        description: { ko: "연세대학교·세브란스병원 방향", en: "Toward Yonsei University and Severance Hospital" },
      },
      {
        number: "3",
        description: { ko: "연세대학교·한국사이버대학교 방향", en: "Toward Yonsei University and Cyber University of Korea" },
      },
    ],
  },
  busRoutes: [
    {
      type: { ko: "지선", en: "Branch" },
      colorKey: "green",
      routes: ["6711", "6712", "6714", "7014", "7015", "7017", "7020", "7613", "7712", "7720", "7725", "7726", "7727", "7728", "7736", "서대문03", "서대문04", "서대문05"],
    },
    {
      type: { ko: "간선", en: "Trunk" },
      colorKey: "blue",
      routes: ["163", "170", "171", "172", "270", "272", "370", "470", "472", "601", "606", "700", "750", "751"],
    },
    {
      type: { ko: "광역", en: "Express" },
      colorKey: "red",
      routes: ["9600", "9601", "9602", "9702", "9704", "9706", "9708", "9713"],
    },
  ],
};
