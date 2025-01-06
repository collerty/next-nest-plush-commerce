import {RecentTransactionsChart} from "@/components/dashboard/recent-transactions-chart";
import {RecentSales} from "@/components/dashboard/recent-sales";
import {DashboardCards} from "@/components/dashboard/dashboard-cards";

export default function DashboardPage() {
  return (
      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <DashboardCards/>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <RecentTransactionsChart/>
          <RecentSales/>
        </div>
      </div>
  )
}

