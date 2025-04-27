
import React, { ReactNode } from "react";
import { Link } from "react-router-dom";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="bg-primary text-primary-foreground shadow-md">
        <div className="container mx-auto py-4 px-4 flex justify-between items-center">
          <div className="flex items-center">
            <img src="/logo.png" alt="SalesPilot Logo" className="h-8 w-8 mr-2" />
            <Link to="/" className="text-xl font-bold">
              SalesPilot
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>

      <footer className="bg-muted py-4">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2025 SalesPilot. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
