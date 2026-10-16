import type { Metadata } from "next";
import { CategoryListing, categoryMetadata, categoryParams } from "@/lib/blog-pages";

type Props = { params: Promise<{ category: string }> };

export const revalidate = 300;

export const generateStaticParams = categoryParams;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return categoryMetadata((await params).category, 1);
}

export default async function BlogCategoryPage({ params }: Props) {
  return <CategoryListing slug={(await params).category} page={1} />;
}
