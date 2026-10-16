import { redirect } from "next/navigation";

type Props = {
  searchParams: Promise<{ q?: string }>;
};

/**
 * There is no styles index UI. Forward browse/search traffic to Explore,
 * preserving `q` so the guides CTA form can post to `/styles`.
 */
export default async function StylesIndexPage({ searchParams }: Props) {
  const { q } = await searchParams;
  const query = q?.trim();
  if (query) {
    redirect(`/explore?q=${encodeURIComponent(query)}`);
  }
  redirect("/explore");
}
