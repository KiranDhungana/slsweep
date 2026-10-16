import type { Metadata } from "next";
import { BlogIndex, blogIndexMetadata, blogIndexPageParams, parsePageParam } from "@/lib/blog-pages";

type Props = { params: Promise<{ page: string }> };

export const revalidate = 300;

export const generateStaticParams = blogIndexPageParams;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return blogIndexMetadata(parsePageParam("/blog/", (await params).page));
}

export default async function BlogIndexPagedPage({ params }: Props) {
  return <BlogIndex page={parsePageParam("/blog/", (await params).page)} />;
}
