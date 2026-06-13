"use client";

export default function Error(_props: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return <main className="page" />;
}
