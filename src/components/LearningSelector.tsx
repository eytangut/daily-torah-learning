import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

const learningOptions = [
  { id: 'shnaim-mikra', name: 'Shnaim Mikra' },
];

const LearningSelector: React.FC = () => {
  const [selectedPrograms, setSelectedPrograms] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedPrograms = localStorage.getItem('enrolledPrograms');
    if (storedPrograms) {
      setSelectedPrograms(JSON.parse(storedPrograms).map((p: any) => p.id));
    }
  }, []);

  const handleSelectChange = (id: string) => {
    setSelectedPrograms(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const handleSubmit = () => {
    const enrolledPrograms = selectedPrograms.map(id => ({
      id,
      name: learningOptions.find(o => o.id === id)?.name || '',
      streak: 0
    }));
    localStorage.setItem('enrolledPrograms', JSON.stringify(enrolledPrograms));
    navigate('/');
  };

  return (
    <div className="container mx-auto p-4 max-w-md">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Choose Your Daily Learning</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {learningOptions.map((option) => (
              <div key={option.id} className="flex items-center space-x-2">
                <Checkbox
                  id={option.id}
                  checked={selectedPrograms.includes(option.id)}
                  onCheckedChange={() => handleSelectChange(option.id)}
                />
                <label htmlFor={option.id} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  {option.name}
                </label>
              </div>
            ))}
            <Button onClick={handleSubmit} className="w-full mt-4">
              Save Selection
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LearningSelector;


