
import React from "react";
import { Award, Star, Medal } from "lucide-react";
import { useHealth } from "@/contexts/HealthContext";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface AchievementItemProps {
  title: string;
  description: string;
  date?: string;
  isUnlocked: boolean;
  icon?: React.ReactNode;
}

const AchievementItem: React.FC<AchievementItemProps> = ({
  title,
  description,
  date,
  isUnlocked,
  icon = <Award className="h-4 w-4" />,
}) => {
  return (
    <div
      className={cn(
        "flex items-center gap-3 p-3 rounded-lg border",
        isUnlocked
          ? "bg-green-50 border-green-200"
          : "bg-gray-100 border-gray-200 opacity-60"
      )}
    >
      <div
        className={cn(
          "rounded-full p-2",
          isUnlocked ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-500"
        )}
      >
        {icon}
      </div>
      <div className="flex-1">
        <h4 className="font-medium text-sm">{title}</h4>
        <p className="text-xs text-muted-foreground">{description}</p>
        {isUnlocked && date && (
          <p className="text-xs mt-1 text-green-700">
            Unlocked on {new Date(date).toLocaleDateString()}
          </p>
        )}
      </div>
      {isUnlocked && <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />}
    </div>
  );
};

const AchievementsList: React.FC = () => {
  const { achievements, addictionRecords, sleepRecords, exerciseItems } = useHealth();

  // Get unique types of addictions tracked
  const addictionTypes = [...new Set(addictionRecords.map((r) => r.type))];

  // Check if user has achieved certain milestones
  const hasLoggedExercise = exerciseItems.length > 0;
  const hasLoggedSleep = sleepRecords.length > 0;
  const hasTrackedAddiction = addictionRecords.length > 0;

  // Predefined achievements
  const predefinedAchievements = [
    {
      id: "first_exercise",
      title: "First Workout",
      description: "Log your first exercise session",
      isUnlocked: hasLoggedExercise,
      icon: <Medal className="h-4 w-4" />,
      unlockDate: exerciseItems.length > 0 ? exerciseItems[0].date : undefined,
    },
    {
      id: "first_sleep",
      title: "Sleep Tracker",
      description: "Log your first sleep record",
      isUnlocked: hasLoggedSleep,
      icon: <Medal className="h-4 w-4" />,
      unlockDate: sleepRecords.length > 0 ? sleepRecords[0].date : undefined,
    },
    {
      id: "first_addiction_tracking",
      title: "Recovery Journey",
      description: "Start tracking an addiction",
      isUnlocked: hasTrackedAddiction,
      icon: <Medal className="h-4 w-4" />,
      unlockDate: addictionRecords.length > 0 ? addictionRecords[0].date : undefined,
    },
  ];

  // Add dynamic achievements for each addiction type
  const addictionAchievements = addictionTypes.map((type) => {
    const streakAchievement = achievements.find(
      (a) => a.type === "addiction_streak" && a.name.includes(type)
    );

    return {
      id: `${type}_tracking`,
      title: `${type.charAt(0).toUpperCase() + type.slice(1)} Recovery`,
      description: `Track your ${type} consumption and maintain goals`,
      isUnlocked: Boolean(streakAchievement),
      icon: <Award className="h-4 w-4" />,
      unlockDate: streakAchievement?.date,
    };
  });

  // Combine all achievements
  const allAchievements = [
    ...predefinedAchievements,
    ...addictionAchievements,
    // Map any other achievements from the context
    ...achievements
      .filter(
        (a) => !a.type.includes("addiction_daily") // Filter out daily achievements as they're temporary
      )
      .map((a) => ({
        id: a.id,
        title: a.name.split("_").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" "),
        description: a.description,
        isUnlocked: true,
        unlockDate: a.date,
      })),
  ];

  const unlockedAchievements = allAchievements.filter((a) => a.isUnlocked);
  const lockedAchievements = allAchievements.filter((a) => !a.isUnlocked);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Award className="mr-2 h-5 w-5 text-yellow-500" />
          Achievements & Rewards
        </CardTitle>
        <CardDescription>
          Track your progress and unlock achievements
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <h3 className="font-medium text-sm">
          Unlocked ({unlockedAchievements.length})
        </h3>
        <div className="grid gap-3">
          {unlockedAchievements.length > 0 ? (
            unlockedAchievements.map((achievement) => (
              <AchievementItem
                key={achievement.id}
                title={achievement.title}
                description={achievement.description}
                isUnlocked={true}
                date={achievement.unlockDate}
                icon={achievement.icon}
              />
            ))
          ) : (
            <p className="text-sm text-muted-foreground">
              You haven't unlocked any achievements yet. Keep tracking your health to earn rewards!
            </p>
          )}
        </div>

        {lockedAchievements.length > 0 && (
          <>
            <h3 className="font-medium text-sm pt-4">
              Locked ({lockedAchievements.length})
            </h3>
            <div className="grid gap-3">
              {lockedAchievements.map((achievement) => (
                <AchievementItem
                  key={achievement.id}
                  title={achievement.title}
                  description={achievement.description}
                  isUnlocked={false}
                />
              ))}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default AchievementsList;
