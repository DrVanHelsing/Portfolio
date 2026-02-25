import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface DiagramItem {
  id?: string;
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
}

export interface DiagramColumn {
  id?: string;
  title: string;
  items: DiagramItem[];
}

interface ArchitectureDiagramProps {
  columns: DiagramColumn[];
  className?: string;
}

/**
 * ArchitectureDiagram
 *
 * A small, reusable React component that reproduces the 3-column "system architecture"
 * style used in the BusinessPlan page. It is intentionally lightweight and Tailwind-based
 * so you can drop it into other React projects that use Tailwind or similar utility classes.
 */
const ArchitectureDiagram: React.FC<ArchitectureDiagramProps> = ({ columns, className }) => {
  return (
    <div className={cn("relative bg-gradient-to-br from-muted/30 to-background border border-muted rounded-2xl p-8", className)}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {columns.map((col, idx) => (
          <div key={col.id ?? idx} className="space-y-6">
            <h3 className="text-lg font-semibold text-center mb-4 text-foreground">{col.title}</h3>

            {col.items.map((item, i) => (
              <Card key={item.id ?? i} className="glass border-muted/20">
                <CardContent className="flex items-center gap-3 p-4">
                  {item.icon ? (
                    <div className="w-10 h-10 flex items-center justify-center text-foreground/90">{item.icon}</div>
                  ) : (
                    <div className="w-10 h-10 bg-muted/10 rounded flex items-center justify-center" />
                  )}

                  <div>
                    <div className="font-semibold">{item.title}</div>
                    {item.subtitle && <div className="text-xs text-foreground/70">{item.subtitle}</div>}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArchitectureDiagram;
