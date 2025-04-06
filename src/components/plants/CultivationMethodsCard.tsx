
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface CultivationMethodsCardProps {
  methods: string[];
}

const CultivationMethodsCard = ({ methods }: CultivationMethodsCardProps) => {
  return (
    <Card className="border-garden-light bg-white shadow">
      <CardHeader className="bg-garden-primary text-white pb-3 pt-4">
        <CardTitle className="text-lg font-medium">Methods of Cultivation</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <ul className="list-disc pl-5 space-y-2 text-gray-700">
          {methods.map((method, index) => (
            <li key={index}>{method}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default CultivationMethodsCard;
