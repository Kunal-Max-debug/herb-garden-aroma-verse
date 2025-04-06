
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface MedicinalUsesCardProps {
  uses: string[];
}

const MedicinalUsesCard = ({ uses }: MedicinalUsesCardProps) => {
  return (
    <Card className="border-garden-light bg-white shadow">
      <CardHeader className="bg-garden-primary text-white pb-3 pt-4">
        <CardTitle className="text-lg font-medium">Medicinal Uses</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <Accordion type="single" collapsible className="w-full">
          {uses.map((use, index) => {
            // Split the use into title and description
            const [title, ...description] = use.split(': ');
            
            return (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-garden-dark hover:text-garden-primary py-3">
                  {title}
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 py-2">
                  {description.join(': ') || 'Detailed information about this medicinal use.'}
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default MedicinalUsesCard;
