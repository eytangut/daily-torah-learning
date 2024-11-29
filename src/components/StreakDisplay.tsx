import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Trophy, Star, Gift, Target, Crown } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";

interface StreakDisplayProps {
  programId: string;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  threshold: number;
  icon: React.ReactNode;
  color: string;
}

const achievements: Achievement[] = [
  {
    id: 'first',
    title: 'התחלה טובה',
    description: '3 ימים ראשונים!',
    threshold: 3,
    icon: <Target className="h-6 w-6" />,
    color: 'text-green-500'
  },
  {
    id: 'week',
    title: 'שבוע ראשון',
    description: 'השלמת שבוע של לימוד רצוף!',
    threshold: 7,
    icon: <Flame className="h-6 w-6" />,
    color: 'text-orange-500'
  },
  {
    id: 'month',
    title: 'חודש מושלם',
    description: 'חודש של התמדה!',
    threshold: 30,
    icon: <Star className="h-6 w-6" />,
    color: 'text-yellow-500'
  },
  {
    id: 'quarter',
    title: 'רבע שנה',
    description: 'התמדת ברבע שנה של לימוד!',
    threshold: 90,
    icon: <Trophy className="h-6 w-6" />,
    color: 'text-purple-500'
  },
  {
    id: 'year',
    title: 'שנה תמימה',
    description: 'שנה שלמה של לימוד יומי!',
    threshold: 365,
    icon: <Crown className="h-6 w-6" />,
    color: 'text-blue-500'
  }
];

const StreakDisplay: React.FC<StreakDisplayProps> = ({ programId }) => {
  const [streak, setStreak] = useState(0);
  const [showAchievement, setShowAchievement] = useState<Achievement | null>(null);
  const [isStreakUpdated, setIsStreakUpdated] = useState(false);
  const [nextMilestone, setNextMilestone] = useState<Achievement | null>(null);

  useEffect(() => {
    const storedPrograms = localStorage.getItem('enrolledPrograms');
    if (storedPrograms) {
      const programs = JSON.parse(storedPrograms);
      const program = programs.find((p: any) => p.id === programId);
      if (program) {
        setStreak(program.streak);

        // Find next milestone
        const next = achievements.find(a => a.threshold > program.streak);
        setNextMilestone(next || null);

        // Check for new achievement
        const newAchievement = achievements.find(
          a => a.threshold === program.streak
        );
        if (newAchievement) {
          setShowAchievement(newAchievement);
          setIsStreakUpdated(true);

          // Store achievement
          const storedAchievements = JSON.parse(localStorage.getItem(`achievements_${programId}`) || '[]');
          if (!storedAchievements.includes(newAchievement.id)) {
            localStorage.setItem(
              `achievements_${programId}`,
              JSON.stringify([...storedAchievements, newAchievement.id])
            );
          }
        }
      }
    }
  }, [programId]);

  // Get progress to next milestone
  const getProgressToNext = () => {
    if (!nextMilestone) return 100;
    const prevThreshold = achievements.find(a => a.threshold < nextMilestone.threshold)?.threshold || 0;
    const progress = ((streak - prevThreshold) / (nextMilestone.threshold - prevThreshold)) * 100;
    return Math.min(100, Math.max(0, progress));
  };


  return (
    <div className="mt-4 space-y-4">
      <motion.div
        className="relative p-6 bg-gradient-to-r from-orange-100 to-yellow-100 rounded-lg shadow-lg"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Main Streak Counter */}
        <motion.div
          className="flex justify-center items-center"
          animate={{ scale: isStreakUpdated ? [1, 1.2, 1] : 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            animate={{ rotate: isStreakUpdated ? [0, -10, 10, -10, 0] : 0 }}
            transition={{ duration: 0.5 }}
          >
            <Flame className="h-12 w-12 text-orange-500" />
          </motion.div>
          <motion.div className="ml-4 text-center">
            <motion.span
              className="text-4xl font-bold"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              key={streak} // Force re-render on streak change
            >
              {streak}
            </motion.span>
            <div className="text-sm text-gray-600">ימים רצופים</div>
          </motion.div>
        </motion.div>

        {/* Progress to Next Achievement */}
        {nextMilestone && (
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-1">
              <span>Next: {nextMilestone.title}</span>
              <span>{streak}/{nextMilestone.threshold}</span>
            </div>
            <Progress value={getProgressToNext()} className="h-2" />
          </div>
        )}

        {/* Achievement Icons */}
        <motion.div
          className="flex justify-center gap-3 mt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {achievements.map((achievement) => (
            <motion.div
              key={achievement.id}
              className={`relative group ${achievement.threshold <= streak ? achievement.color : 'text-gray-300'
                }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {achievement.icon}
              <motion.div
                className="absolute bottom-full mb-2 hidden group-hover:block bg-black text-white text-xs rounded p-2 whitespace-nowrap"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {achievement.title} ({achievement.threshold} ימים)
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Achievement Alert */}
      <AnimatePresence>
        {showAchievement && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
          >
            <Alert className="bg-gradient-to-r from-primary/20 to-primary/10 border-none">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
              >
                <AlertTitle className="text-lg font-bold flex items-center gap-2">
                  <Gift className="h-6 w-6 text-primary" />
                  הישג חדש: {showAchievement.title}
                </AlertTitle>
                <AlertDescription>
                  {showAchievement.description}
                </AlertDescription>
              </motion.div>
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StreakDisplay;
