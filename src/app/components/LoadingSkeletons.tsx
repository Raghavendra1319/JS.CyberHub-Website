export function CardSkeleton() {
  return (
    <div className="bg-card rounded-2xl p-6 shadow-sm animate-pulse">
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 bg-muted rounded-xl" />
        <div className="h-4 w-16 bg-muted rounded" />
      </div>
      <div className="h-8 w-24 bg-muted rounded mb-1" />
      <div className="h-4 w-32 bg-muted rounded" />
    </div>
  );
}

export function TableRowSkeleton() {
  return (
    <tr className="animate-pulse">
      <td className="px-6 py-4">
        <div className="h-4 bg-muted rounded w-32" />
      </td>
      <td className="px-6 py-4">
        <div className="h-4 bg-muted rounded w-40" />
      </td>
      <td className="px-6 py-4">
        <div className="h-4 bg-muted rounded w-24" />
      </td>
      <td className="px-6 py-4">
        <div className="h-4 bg-muted rounded w-20" />
      </td>
      <td className="px-6 py-4">
        <div className="h-6 bg-muted rounded-full w-16" />
      </td>
    </tr>
  );
}

export function ListItemSkeleton() {
  return (
    <div className="flex items-center gap-4 p-4 animate-pulse">
      <div className="w-12 h-12 bg-muted rounded-full" />
      <div className="flex-1">
        <div className="h-4 bg-muted rounded w-48 mb-2" />
        <div className="h-3 bg-muted rounded w-32" />
      </div>
      <div className="h-8 bg-muted rounded w-20" />
    </div>
  );
}

export function ProfileSkeleton() {
  return (
    <div className="bg-card rounded-2xl p-6 shadow-sm animate-pulse">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-20 h-20 bg-muted rounded-full" />
        <div className="flex-1">
          <div className="h-6 bg-muted rounded w-40 mb-2" />
          <div className="h-4 bg-muted rounded w-32" />
        </div>
      </div>
      <div className="space-y-4">
        <div>
          <div className="h-4 bg-muted rounded w-24 mb-2" />
          <div className="h-10 bg-muted rounded w-full" />
        </div>
        <div>
          <div className="h-4 bg-muted rounded w-24 mb-2" />
          <div className="h-10 bg-muted rounded w-full" />
        </div>
      </div>
    </div>
  );
}

export function ChartSkeleton() {
  return (
    <div className="bg-card rounded-2xl p-6 shadow-sm animate-pulse">
      <div className="h-6 bg-muted rounded w-48 mb-6" />
      <div className="h-64 bg-muted rounded" />
    </div>
  );
}

export function ServiceCardSkeleton() {
  return (
    <div className="bg-card rounded-2xl p-6 shadow-sm animate-pulse">
      <div className="flex items-start gap-4 mb-4">
        <div className="w-16 h-16 bg-muted rounded-xl" />
        <div className="flex-1">
          <div className="h-6 bg-muted rounded w-48 mb-2" />
          <div className="h-4 bg-muted rounded w-32" />
        </div>
      </div>
      <div className="space-y-2 mb-4">
        <div className="h-4 bg-muted rounded w-full" />
        <div className="h-4 bg-muted rounded w-5/6" />
      </div>
      <div className="flex items-center justify-between">
        <div className="h-8 bg-muted rounded w-24" />
        <div className="h-10 bg-muted rounded w-32" />
      </div>
    </div>
  );
}

export function BookingCardSkeleton() {
  return (
    <div className="bg-card rounded-2xl p-6 shadow-sm animate-pulse">
      <div className="flex items-start gap-4 mb-4">
        <div className="w-12 h-12 bg-muted rounded-full" />
        <div className="flex-1">
          <div className="h-5 bg-muted rounded w-40 mb-2" />
          <div className="h-4 bg-muted rounded w-24" />
        </div>
        <div className="h-6 bg-muted rounded-full w-20" />
      </div>
      <div className="p-4 bg-muted/20 rounded-lg">
        <div className="h-5 bg-muted rounded w-56 mb-3" />
        <div className="grid grid-cols-3 gap-4">
          <div className="h-4 bg-muted rounded" />
          <div className="h-4 bg-muted rounded" />
          <div className="h-4 bg-muted rounded" />
        </div>
      </div>
    </div>
  );
}

export function MessageSkeleton() {
  return (
    <div className="flex items-start gap-3 p-4 animate-pulse">
      <div className="w-12 h-12 bg-muted rounded-full" />
      <div className="flex-1">
        <div className="flex items-center justify-between mb-2">
          <div className="h-4 bg-muted rounded w-32" />
          <div className="h-3 bg-muted rounded w-16" />
        </div>
        <div className="h-4 bg-muted rounded w-full" />
      </div>
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div>
      <div className="mb-8">
        <div className="h-8 bg-muted rounded w-64 mb-2 animate-pulse" />
        <div className="h-4 bg-muted rounded w-96 animate-pulse" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[1, 2, 3, 4].map((i) => (
          <CardSkeleton key={i} />
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        {[1, 2].map((i) => (
          <ChartSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
