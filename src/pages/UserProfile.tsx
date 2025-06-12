import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SettingsPanel } from '@/components/Settings/SettingsPanel';
import { User, Settings, FileText } from 'lucide-react';

const UserProfile = () => {
  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <h1 className="text-3xl font-bold mb-8">Your Profile</h1>
      
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="mb-8 bg-background/50 backdrop-blur-sm w-full flex justify-center md:justify-start">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span>Profile</span>
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span>History</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile">
          <div className="glass-effect rounded-xl p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center gap-4">
                <div className="h-20 w-20 rounded-full bg-gradient-to-r from-health-primary to-health-secondary flex items-center justify-center text-white text-2xl font-bold">JD</div>
                <div>
                  <h3 className="text-lg font-medium">John Doe</h3>
                  <p className="text-muted-foreground">john.doe@example.com</p>
                </div>
              </div>
              <div className="space-y-2">
                <div>
                  <p className="text-sm text-muted-foreground">Member since</p>
                  <p>January 15, 2023</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Last activity</p>
                  <p>Today at 2:34 PM</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-effect rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4">Health Goals</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  <span>Lose 5kg by December</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                  <span>Run 5km without stopping</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                  <span>Improve sleep quality</span>
                </li>
              </ul>
            </div>
            
            <div className="glass-effect rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4">Connected Devices</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                      <span className="text-sm">FW</span>
                    </div>
                    <div>
                      <p className="font-medium">Fitbit Watch</p>
                      <p className="text-sm text-muted-foreground">Last synced: Today</p>
                    </div>
                  </div>
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                      <span className="text-sm">SS</span>
                    </div>
                    <div>
                      <p className="font-medium">Smart Scale</p>
                      <p className="text-sm text-muted-foreground">Last synced: Yesterday</p>
                    </div>
                  </div>
                  <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="settings">
          <SettingsPanel />
        </TabsContent>
        
        <TabsContent value="history">
          <div className="glass-effect rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-6">Activity History</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-3 rounded-lg bg-background/50 hover:bg-background/80 transition-colors">
                <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-500">
                  <span className="text-sm">E</span>
                </div>
                <div className="flex-1">
                  <p className="font-medium">Logged exercise session</p>
                  <p className="text-sm text-muted-foreground">30 min running • 250 calories</p>
                </div>
                <div className="text-sm text-muted-foreground">Today</div>
              </div>
              
              <div className="flex items-center gap-4 p-3 rounded-lg bg-background/50 hover:bg-background/80 transition-colors">
                <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-500">
                  <span className="text-sm">F</span>
                </div>
                <div className="flex-1">
                  <p className="font-medium">Added meal to food diary</p>
                  <p className="text-sm text-muted-foreground">Lunch • 480 calories</p>
                </div>
                <div className="text-sm text-muted-foreground">Yesterday</div>
              </div>
              
              <div className="flex items-center gap-4 p-3 rounded-lg bg-background/50 hover:bg-background/80 transition-colors">
                <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-500">
                  <span className="text-sm">W</span>
                </div>
                <div className="flex-1">
                  <p className="font-medium">Updated weight measurement</p>
                  <p className="text-sm text-muted-foreground">72.5 kg • -0.5 kg change</p>
                </div>
                <div className="text-sm text-muted-foreground">3 days ago</div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserProfile;
