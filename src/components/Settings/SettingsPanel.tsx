
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ThemeSettings } from "./ThemeSettings";
import { MeasurementSettings } from "./MeasurementSettings";
import { Settings, Ruler, Bell, Eye, Shield } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { motion } from "framer-motion";

export function SettingsPanel() {
  const [enableNotifications, setEnableNotifications] = useState(true);
  const [reminderNotifications, setReminderNotifications] = useState(true);
  const [achievementNotifications, setAchievementNotifications] = useState(true);
  const [privacyMode, setPrivacyMode] = useState(false);
  const [allowDataCollection, setAllowDataCollection] = useState(true);

  const tabVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <motion.h2 
        className="text-2xl font-semibold mb-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Settings
      </motion.h2>
      
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="mb-6 bg-background/70 backdrop-blur-xl glass-effect rounded-full p-1 overflow-hidden">
          <TabsTrigger value="general" className="flex items-center gap-2 rounded-full">
            <Settings className="h-4 w-4" />
            <span>General</span>
          </TabsTrigger>
          <TabsTrigger value="units" className="flex items-center gap-2 rounded-full">
            <Ruler className="h-4 w-4" />
            <span>Units</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2 rounded-full">
            <Bell className="h-4 w-4" />
            <span>Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="privacy" className="flex items-center gap-2 rounded-full">
            <Shield className="h-4 w-4" />
            <span>Privacy</span>
          </TabsTrigger>
        </TabsList>
        
        <motion.div
          variants={tabVariants}
          initial="hidden"
          animate="visible"
        >
          <TabsContent value="general" className="space-y-6">
            <ThemeSettings />
            
            <Card className="glass-effect shadow-soft">
              <CardHeader>
                <CardTitle className="text-lg">App Preferences</CardTitle>
                <CardDescription>Customize your app experience</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="show-tips">Show Tips and Hints</Label>
                    <p className="text-sm text-muted-foreground">Display helpful tips throughout the app</p>
                  </div>
                  <Switch id="show-tips" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="animations">Enable Animations</Label>
                    <p className="text-sm text-muted-foreground">Use animations for a smoother experience</p>
                  </div>
                  <Switch id="animations" defaultChecked />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="units" className="space-y-6">
            <MeasurementSettings />
          </TabsContent>
          
          <TabsContent value="notifications" className="space-y-6">
            <Card className="glass-effect shadow-soft">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Bell className="h-5 w-5 text-health-primary" />
                  Notifications
                </CardTitle>
                <CardDescription>Manage your notification preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 rounded-lg bg-background/50 hover:bg-background/70 transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="enable-notifications" className="text-base font-medium">Enable Notifications</Label>
                      <p className="text-sm text-muted-foreground">Master toggle for all notifications</p>
                    </div>
                    <Switch 
                      id="enable-notifications" 
                      checked={enableNotifications} 
                      onCheckedChange={setEnableNotifications} 
                    />
                  </div>
                </div>
                
                <div className={`p-4 rounded-lg transition-colors ${enableNotifications ? 'bg-background/50 hover:bg-background/70' : 'bg-background/20 opacity-60'}`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="reminder-notifications" className="text-base font-medium">Daily Reminders</Label>
                      <p className="text-sm text-muted-foreground">Get reminders for logging meals and exercises</p>
                    </div>
                    <Switch 
                      id="reminder-notifications" 
                      checked={reminderNotifications && enableNotifications} 
                      onCheckedChange={setReminderNotifications} 
                      disabled={!enableNotifications}
                    />
                  </div>
                </div>
                
                <div className={`p-4 rounded-lg transition-colors ${enableNotifications ? 'bg-background/50 hover:bg-background/70' : 'bg-background/20 opacity-60'}`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="achievement-notifications" className="text-base font-medium">Achievement Alerts</Label>
                      <p className="text-sm text-muted-foreground">Get notified when you unlock achievements</p>
                    </div>
                    <Switch 
                      id="achievement-notifications" 
                      checked={achievementNotifications && enableNotifications} 
                      onCheckedChange={setAchievementNotifications} 
                      disabled={!enableNotifications}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="privacy" className="space-y-6">
            <Card className="glass-effect shadow-soft">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Eye className="h-5 w-5 text-health-primary" />
                  Privacy Settings
                </CardTitle>
                <CardDescription>Manage your data privacy settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 rounded-lg bg-background/50 hover:bg-background/70 transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="privacy-mode" className="text-base font-medium">Privacy Mode</Label>
                      <p className="text-sm text-muted-foreground">Hide sensitive data from screen</p>
                    </div>
                    <Switch 
                      id="privacy-mode"
                      checked={privacyMode}
                      onCheckedChange={setPrivacyMode}
                    />
                  </div>
                </div>
                
                <div className="p-4 rounded-lg bg-background/50 hover:bg-background/70 transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="data-collection" className="text-base font-medium">Allow Anonymous Data Collection</Label>
                      <p className="text-sm text-muted-foreground">Help us improve the app with anonymous usage data</p>
                    </div>
                    <Switch 
                      id="data-collection" 
                      checked={allowDataCollection}
                      onCheckedChange={setAllowDataCollection}
                    />
                  </div>
                </div>
                
                <div className="p-4 rounded-lg bg-background/50 hover:bg-background/70 transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="data-export" className="text-base font-medium">Export Your Data</Label>
                      <p className="text-sm text-muted-foreground">Download all your personal data</p>
                    </div>
                    <button className="bg-primary/10 text-primary px-3 py-1 rounded-md hover:bg-primary/20 transition-colors">
                      Export
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </motion.div>
      </Tabs>
    </div>
  );
}
