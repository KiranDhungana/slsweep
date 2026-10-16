/**
 * Placeholder for copy the site owner still needs to write.
 * Visible during `npm run dev` only — production builds render nothing, so
 * unfinished notes never reach visitors or search engines.
 */
export default function Todo({ children }: { children: React.ReactNode }) {
  if (process.env.NODE_ENV === "production") return null;
  return (
    <div className="my-6 rounded-lg border-2 border-dashed border-amber-400 bg-amber-50 px-4 py-3 text-sm text-amber-900">
      <strong>TODO (content):</strong> {children}
    </div>
  );
}
