import React from 'react';

interface VerticalProgressIndicatorProps {
  currentSection: 'text1' | 'text2' | 'commentary';
  sectionProgress: number;
}

const VerticalProgressIndicator: React.FC<VerticalProgressIndicatorProps> = ({
  currentSection,
  sectionProgress
}) => {
  // Calculate which sections are complete
  const isText1Complete = currentSection !== 'text1' || sectionProgress === 100;
  const isText2Complete = currentSection === 'commentary' || (currentSection === 'text2' && sectionProgress === 100);
  const isCommentaryComplete = currentSection === 'commentary' && sectionProgress === 100;

  return (
    <div className="fixed left-4 top-1/2 -translate-y-1/2 flex flex-col h-64 items-center">
      <div className="relative h-full w-2 bg-gray-200 rounded-full">
        {/* Text 1 Section */}
        <div
          className={`absolute top-0 h-1/3 w-full rounded-t-full transition-all duration-300 ${isText1Complete ? 'bg-primary' : currentSection === 'text1' ? 'bg-primary' : 'bg-gray-200'
            }`}
          style={currentSection === 'text1' ? { height: `${(sectionProgress / 100) * (100 / 3)}%` } : undefined}
        />

        {/* Text 2 Section */}
        <div
          className={`absolute top-1/3 h-1/3 w-full transition-all duration-300 ${isText2Complete ? 'bg-primary' : currentSection === 'text2' ? 'bg-primary' : 'bg-gray-200'
            }`}
          style={currentSection === 'text2' ? { height: `${(sectionProgress / 100) * (100 / 3)}%` } : undefined}
        />

        {/* Commentary Section */}
        <div
          className={`absolute top-2/3 h-1/3 w-full rounded-b-full transition-all duration-300 ${isCommentaryComplete ? 'bg-primary' : currentSection === 'commentary' ? 'bg-primary' : 'bg-gray-200'
            }`}
          style={currentSection === 'commentary' ? { height: `${(sectionProgress / 100) * (100 / 3)}%` } : undefined}
        />
      </div>

      {/* Section Indicators */}
      <div className="absolute left-4 h-full flex flex-col justify-between text-sm">
        <span className={isText1Complete ? 'text-primary font-bold' : 'text-gray-500'}>פעם ראשונה</span>
        <span className={isText2Complete ? 'text-primary font-bold' : 'text-gray-500'}>פעם שניה</span>
        <span className={isCommentaryComplete ? 'text-primary font-bold' : 'text-gray-500'}>תרגום</span>
      </div>
    </div>
  );
};

export default VerticalProgressIndicator;
