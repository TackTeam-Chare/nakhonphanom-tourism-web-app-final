"use client"
import { useState } from 'react';
import Header from '@/components/Dashboard/Header/Header';
import Sidebar from '@/components/Dashboard/Sidebar/Sidebar';

export default function DashboardLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen">
      <Sidebar isOpen={isSidebarOpen} onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      <div className="flex flex-col flex-grow">
        <Header onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        <main className="flex-grow p-4">{children}</main>
      </div>
    </div>
  );
}
