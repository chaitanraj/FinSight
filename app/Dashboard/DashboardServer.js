import { redirect } from "next/navigation";
import DashboardClient from "./page"
import { getUserFromSession } from "@/lib/auth";
import { getExpenses } from "@/lib/expenses";

export default async function DashboardPage() {
   console.log("SERVER USER:", user);
   throw new Error("SERVER USER: " + JSON.stringify(user));
  const user = await getUserFromSession();
 

  if (!user) redirect("/Login");

  const expenses = await getExpenses(Number(user.id));

  return (
    <DashboardClient user={user} expenses={expenses} />
  );
}
