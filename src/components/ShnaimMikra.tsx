import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getWeeklyParasha } from '../services/SefariaService';
import VerticalProgressIndicator from './VerticalProgressIndicator';
import StreakDisplay from './StreakDisplay';
import { useNavigate } from 'react-router-dom';
import useScrollControl from '../hooks/useScrollControl';

const ShnaimMikra: React.FC = () => {
  const [mainText, setMainText] = useState<string[]>([]);
  const [commentary, setCommentary] = useState<string[]>([]);
  const [currentSection, setCurrentSection] = useState<'text1' | 'text2' | 'commentary'>('text1');
  const [scrollPercentage] = useScrollControl();
  const contentRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getWeeklyParasha();
        setMainText(data.mainText);
        setCommentary(data.commentaryTexts);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleNext = () => {
    if (currentSection === 'text1') setCurrentSection('text2');
    else if (currentSection === 'text2') setCurrentSection('commentary');
    // Reset scroll position
      scrollToTop()
      console.log("scrolled")

  };

  const handlePrev = () => {
    if (currentSection === 'commentary') setCurrentSection('text2');
    else if (currentSection === 'text2') setCurrentSection('text1');
    // Reset scroll position
    scrollToTop()
    console.log("scrolled")

  };

  const handleComplete = () => {
    const enrolledPrograms = JSON.parse(localStorage.getItem('enrolledPrograms') || '[]');
    const updatedPrograms = enrolledPrograms.map((program: any) => {
      if (program.id === 'shnaim-mikra') {
        return { ...program, streak: program.streak + 1 };
      }
      return program;
    });
    localStorage.setItem('enrolledPrograms', JSON.stringify(updatedPrograms));

    // Navigate back to dashboard after completion
    navigate('/');
  };

  const renderContent = () => {
    const content = currentSection === 'commentary' ? commentary : mainText;
    return (
      <div className="space-y-2 text-right" dir="rtl">
        {content.map((line, index) => (
          <p key={index} dangerouslySetInnerHTML={{ __html: line }} />
        ))}
      </div>
    );
  };

  return (
    <div className="container mx-auto p-4 max-w-md relative">

      <VerticalProgressIndicator
        currentSection={currentSection}
        sectionProgress={scrollPercentage as number}
      />
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">שניים מקרא</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div ref={contentRef} className="h-max overflow-y-auto">
              {renderContent()}
            </div>
            <div className="flex justify-between mt-4">
              <Button onClick={handlePrev} disabled={currentSection === 'text1'}>
                <ChevronLeft className="mr-2 h-4 w-4" /> Previous
              </Button>
              {currentSection === 'commentary' ? (
                <Button onClick={handleComplete} className="bg-green-600 hover:bg-green-700">
                  Complete Today's Learning
                </Button>
              ) : (
                <Button
                  onClick={handleNext}
                  disabled={scrollPercentage as number < 100}
                >
                  Next <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
          <StreakDisplay programId="shnaim-mikra" />
        </CardContent>
      </Card>
    </div>
  );
};

export default ShnaimMikra;
