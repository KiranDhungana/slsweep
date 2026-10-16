import type { Metadata } from "next";
import {
  CategoryListing,
  categoryMetadata,
  categoryPageParams,
  parsePageParam,
} from "@/lib/blog-pages";

type Props = { params: Promise<{ category: string; page: string }> };

export const revalidate = 300;

export const generateStaticParams = categoryPageParams;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, page } = await params;
  return categoryMetadata(category, parsePageParam(`/blog/category/${category}/`, page));
}

export default async function BlogCategoryPagedPage({ params }: Props) {
  const { category, page } = await params;
  return <CategoryListing slug={category} page={parsePageParam(`/blog/category/${category}/`, page)} />;
}
