export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center text-center px-4">
      <h1 className="text-2xl font-semibold mb-4">You're in the right place.</h1>
      <p className="text-muted-foreground max-w-md">
        Follow the guide at{" "}
        <a
          href="https://dev.dotcms.com/learn"
          className="text-primary underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          dev.dotcms.com/learn
        </a>{" "}
        to build this project step by step.
      </p>
    </main>
  );
}
