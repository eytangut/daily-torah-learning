import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Program {
  id: string;
  name: string;
  streak: number;
}

const Dashboard: React.FC = () => {
  const [enrolledPrograms, setEnrolledPrograms] = useState<Program[]>([]);

  useEffect(() => {
    const storedPrograms = localStorage.getItem('enrolledPrograms');
    if (storedPrograms) {
      setEnrolledPrograms(JSON.parse(storedPrograms));
    }
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Learning Dashboard</h1>
      <Link to="/select-program">
        <Button className="mb-4">Select Programs</Button>
      </Link>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {enrolledPrograms.map((program) => (
          <Card key={program.id}>
            <CardHeader>
              <CardTitle>{program.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Current Streak: {program.streak} days</p>
              <Link to={`/${program.id}`}>
                <Button className="mt-2">Continue Learning</Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;


