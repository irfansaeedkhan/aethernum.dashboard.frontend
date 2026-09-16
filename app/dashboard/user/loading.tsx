export default function UserDashboardLoading() {
  return (
    <div className="flex min-h-[45vh] flex-col gap-4" aria-label="Loading dashboard">
      <div className="h-8 w-48 animate-pulse rounded bg-light" />
      <div className="h-32 w-full animate-pulse rounded-xl bg-light" />
      <div className="grid gap-4 md:grid-cols-2">
        <div className="h-48 animate-pulse rounded-xl bg-light" />
        <div className="h-48 animate-pulse rounded-xl bg-light" />
      </div>
    </div>
  );
}