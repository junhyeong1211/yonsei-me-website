import {
  courses,
  faculty,
  labs,
  notices,
  researchAreas,
} from "../data/content";

export const getFacultyBySlug = (slug: string) =>
  faculty.find((item) => item.slug === slug);

export const getResearchAreaBySlug = (slug: string) =>
  researchAreas.find((item) => item.slug === slug);

export const getLabBySlug = (slug: string) =>
  labs.find((item) => item.slug === slug);

export const getCourseBySlug = (slug: string) =>
  courses.find((item) => item.slug === slug);

export const getNoticeBySlug = (slug: string) =>
  notices.find((item) => item.slug === slug);

export const getFacultyForArea = (areaId: string) =>
  faculty.filter((item) => item.researchAreaIds.includes(areaId));

export const getLabsForArea = (areaId: string) =>
  labs.filter((item) => item.researchAreaIds.includes(areaId));

export const getCoursesForArea = (areaId: string) =>
  courses.filter((item) => item.researchAreaIds.includes(areaId));
