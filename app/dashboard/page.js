import Dashboard from "@/components/Dashboard";
import Login from "@/components/Login";
import Main from "@/components/Main";
import { useAuth } from "@/context/AuthContext";

export const metadata = {
    title: "DayTracker.dashboard",

  };
export default function dashboardPage(){

    return (
        <Main>
            <Dashboard/>
        </Main>
    )
}