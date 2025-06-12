
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ThemeSettings } from "./ThemeSettings";
import { MeasurementSettings } from "./MeasurementSettings";
import { Settings, Ruler, Bell } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export function SettingsPanel() {
  const [enableNotifications, setEnableNotifications] = useState(true);
  const [reminderNotifications, setReminderNotifications] = useState(true);
  const [achievementNotifications, setAchievementNotifications] = useState(true);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Settings</h2>
      
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="mb-6 bg-background/50 backdrop-blur-sm">
          <TabsTrigger value="general" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            <span>General</span>
          </TabsTrigger>
          <TabsTrigger value="units" className="flex items-center gap-2">
            <Ruler className="h-4 w-4" />
            <span>Units</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            <span>Notifications</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-6">
          <ThemeSettings />
          
          <Card className="glass-effect animate-fade-in shadow-soft">
            <CardHeader>
              <CardTitle className="text-lg">Privacy</CardTitle>
              <CardDescription>Manage your data privacy settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="privacy-mode">Privacy Mode</Label>
                  <p className="text-sm text-muted-foreground">Hide sensitive data from screen</p>
                </div>
                <Switch id="privacy-mode" />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="data-collection">Allow Anonymous Data Collection</Label>
                  <p className="text-sm text-muted-foreground">Help us improve the app</p>
                </div>
                <Switch id="data-collection" defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="units" className="space-y-6">
          <MeasurementSettings />
        </TabsContent>
        
        <TabsContent value="notifications" className="space-y-6">
          <Card className="glass-effect animate-fade-in shadow-soft">
            <CardHeader>
              <CardTitle className="text-lg">Notifications</CardTitle>
              <CardDescription>Manage your notification preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="enable-notifications">Enable Notifications</Label>
                  <p className="text-sm text-muted-foreground">Master toggle for all notifications</p>
                </div>
                <Switch 
                  id="enable-notifications" 
                  checked={enableNotifications} 
                  onCheckedChange={setEnableNotifications} 
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="reminder-notifications">Daily Reminders</Label>
                  <p className="text-sm text-muted-foreground">Get reminders for logging meals and exercises</p>
                </div>
                <Switch 
                  id="reminder-notifications" 
                  checked={reminderNotifications && enableNotifications} 
                  onCheckedChange={setReminderNotifications} 
                  disabled={!enableNotifications}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="achievement-notifications">Achievement Alerts</Label>
                  <p className="text-sm text-muted-foreground">Get notified when you unlock achievements</p>
                </div>
                <Switch 
                  id="achievement-notifications" 
                  checked={achievementNotifications && enableNotifications} 
                  onCheckedChange={setAchievementNotifications} 
                  disabled={!enableNotifications}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
