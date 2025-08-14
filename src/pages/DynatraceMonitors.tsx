import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useMonitorStorage } from "@/hooks/useMonitorStorage";
import { BarChart3 } from "lucide-react";

interface LinkItem { label: string; url: string }
interface LocationState { 
  serviceName?: string; 
  links?: LinkItem[];
  monitorData?: any;
}

const DynatraceMonitors: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { serviceName = "", links = [], monitorData } = (state as LocationState) || {};
  const { toast } = useToast();
  const { saveMonitor } = useMonitorStorage();

  useEffect(() => {
    if (!serviceName || links.length === 0) {
      toast({ title: "Acesso restrito", description: "Crie o monitor Dynatrace primeiro." });
      navigate("/criar-monitor", { replace: true });
    } else if (monitorData) {
      // Save monitor to session storage
      saveMonitor(monitorData);
    }
  }, [serviceName, links, navigate, toast, monitorData]);

  const items = [
    { title: "Dynatrace", subtitle: serviceName || "seu-serviço", url: links[0]?.url },
  ].filter(i => !!i.url);

  return (
    <>
      <Helmet>
        <title>Monitores Dynatrace — Libs de Monitoração</title>
        <meta name="description" content="Parabéns! Monitores Dynatrace criados com sucesso para seu serviço." />
        <link rel="canonical" href={typeof window !== "undefined" ? window.location.href : "/monitores/dynatrace"} />
      </Helmet>

      <div className="min-h-screen bg-muted/30 py-10">
        <main className="container">
          <section className="mx-auto max-w-2xl">
            <Card className="shadow-lg">
              <CardHeader className="text-center">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <BarChart3 className="w-8 h-8 text-primary" />
                  <h1 className="text-3xl font-semibold tracking-tight">Libs de Monitoração</h1>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="rounded-md border border-success/20 bg-success/10 p-5 text-center">
                  <p className="text-lg font-semibold text-success-foreground">Parabéns! 🎉</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Monitor criado com sucesso para o serviço: <span className="font-medium text-foreground">{serviceName || "seu-serviço"}</span>
                  </p>
                </div>

                <div className="space-y-3">
                  <p className="font-medium">Links dos monitores:</p>
                  <div className="space-y-3">
                    {items.map((it) => (
                      <div key={it.title} className="flex items-center justify-between rounded-md border bg-card p-4 shadow-sm">
                        <div>
                          <p className="font-medium">{it.title}</p>
                          <p className="text-sm text-muted-foreground">{it.subtitle}</p>
                        </div>
                        <a href={it.url} target="_blank" rel="noopener noreferrer">
                          <Button variant="outline" size="sm">Ver monitor</Button>
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="justify-center">
                <div className="flex gap-4 w-full max-w-md">
                  <Button className="flex-1" onClick={() => navigate("/criar-monitor")}>Criar novo monitor</Button>
                  <Button className="flex-1" onClick={() => navigate("/dashboard")}>Dashboard monitores</Button>
                </div>
              </CardFooter>
            </Card>
          </section>
        </main>
      </div>
    </>
  );
};

export default DynatraceMonitors;
