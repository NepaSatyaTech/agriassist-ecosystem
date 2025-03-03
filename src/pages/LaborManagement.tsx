
import React, { useState } from 'react';
import Navbar from '@/components/navbar';
import Footer from '@/components/Footer';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import LaborersList from '@/components/labor/LaborersList';
import LaborerForm from '@/components/labor/LaborerForm';
import LaborRecords from '@/components/labor/LaborRecords';
import RecordForm from '@/components/labor/RecordForm';
import Reports from '@/components/labor/Reports';
import UserManagement from '@/components/labor/UserManagement';
import { UserPlus, ClipboardList, FileText, Users } from 'lucide-react';

const LaborManagement = () => {
  // State for tracking active view in each tab
  const [activeView, setActiveView] = useState({
    laborers: 'list', // 'list' or 'add'
    records: 'list',  // 'list' or 'add'
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Farm Labor Management</h1>
            
            <Tabs defaultValue="laborers" className="w-full">
              <TabsList className="grid grid-cols-4 mb-8">
                <TabsTrigger value="laborers" className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>Laborers</span>
                </TabsTrigger>
                <TabsTrigger value="records" className="flex items-center gap-2">
                  <ClipboardList className="h-4 w-4" />
                  <span>Labor Records</span>
                </TabsTrigger>
                <TabsTrigger value="reports" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  <span>Reports</span>
                </TabsTrigger>
                <TabsTrigger value="users" className="flex items-center gap-2">
                  <UserPlus className="h-4 w-4" />
                  <span>User Management</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="laborers">
                <Card>
                  <CardHeader>
                    <CardTitle>Laborers Management</CardTitle>
                    <CardDescription>
                      Add, edit, and manage laborers who work on your farm.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {activeView.laborers === 'list' ? (
                      <LaborersList 
                        onAddNew={() => setActiveView({...activeView, laborers: 'add'})}
                      />
                    ) : (
                      <LaborerForm 
                        onCancel={() => setActiveView({...activeView, laborers: 'list'})}
                      />
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="records">
                <Card>
                  <CardHeader>
                    <CardTitle>Labor Records</CardTitle>
                    <CardDescription>
                      Track labor hours, wages, and tasks by season and month.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {activeView.records === 'list' ? (
                      <LaborRecords 
                        onAddNew={() => setActiveView({...activeView, records: 'add'})}
                      />
                    ) : (
                      <RecordForm 
                        onCancel={() => setActiveView({...activeView, records: 'list'})}
                      />
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="reports">
                <Card>
                  <CardHeader>
                    <CardTitle>Reports & Analytics</CardTitle>
                    <CardDescription>
                      Generate reports and analyze labor data across seasons and months.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Reports />
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="users">
                <Card>
                  <CardHeader>
                    <CardTitle>User Management</CardTitle>
                    <CardDescription>
                      Manage user accounts and permissions.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <UserManagement />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default LaborManagement;
