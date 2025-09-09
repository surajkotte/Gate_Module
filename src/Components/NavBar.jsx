import { useState } from "react";
import { FileText, Plus, BarChart3, Settings, Weight } from "lucide-react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const ExpenseNavBar = () => {
  const [activeTab, setActiveTab] = useState("expenses");

  return (
    <div className="w-[90%] rounded-3xl bg-card border border-border shadow-xl backdrop-blur-md p-4 flex items-center justify-between mt-4 mx-auto">
      <div className="flex items-center gap-1">
        <div className="bg-primary p-2 rounded-lg mr-3 bg-blue-500">
          <FileText className="h-6 w-6 text-primary-foreground" />
        </div>
        <span className="text-xl font-semibold text-foreground tracking-wide">
          Expense Portal
        </span>
      </div>

      <div className="flex items-center gap-4">
        <Link to="/entry">
          <button
            onClick={() => setActiveTab("expenses")}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === "expenses"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted"
            }`}
          >
            <Plus className="inline h-4 w-4 mr-2" />
            New Entry
          </button>
        </Link>

        <Link to="/new">
          <button
            onClick={() => setActiveTab("new")}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === "new"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted"
            }`}
          >
            <FileText className="inline h-4 w-4 mr-2" />
            Saved drafts
          </button>
        </Link>

        <Link to="/weigh">
          <button
            onClick={() => setActiveTab("weight")}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === "weight"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted"
            }`}
          >
            <Weight className="inline h-4 w-4 mr-2" />
            Weighbridge
          </button>
        </Link>

        <Link to="/analytics">
          <button
            onClick={() => setActiveTab("analytics")}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === "analytics"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted"
            }`}
          >
            <BarChart3 className="inline h-4 w-4 mr-2" />
            Analytics
          </button>
        </Link>

        <Link to="/settings">
          <button
            onClick={() => setActiveTab("settings")}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === "settings"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted"
            }`}
          >
            <Settings className="inline h-4 w-4 mr-2" />
            Settings
          </button>
        </Link>
      </div>

      <div className="flex">
        <Avatar>
          <AvatarFallback className="bg-secondary text-secondary-foreground">
            U
          </AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};

export default ExpenseNavBar;
