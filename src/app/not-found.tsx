import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found">
      <h1>404</h1>
      <p>Something&apos;s missing.</p>
      <p>
        Sorry, we can&apos;t find that page. You&apos;ll find lots to explore on
        the home page.
      </p>
      <Link href="/">Return Home</Link>
    </main>
  );
}
