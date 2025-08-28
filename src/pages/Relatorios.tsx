import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Download, 
  FileText, 
  Calendar,
  TrendingUp,
  Users,
  AlertCircle,
  CheckCircle,
  Clock,
  BarChart3
} from "lucide-react";

// Mock data for reports
const mockReports = [
  {
    period: "Janeiro 2024",
    totalTickets: 127,
    resolved: 104,
    pending: 23,
    avgResolutionTime: "2.5 horas",
    departments: {
      "TI": 45,
      "Financeiro": 32,
      "RH": 28,
      "Operações": 22
    },
    priorities: {
      "Crítica": 8,
      "Alta": 35,
      "Média": 52,
      "Baixa": 32
    }
  }
];

const departmentColors = [
  "bg-blue-50 text-blue-700 border-blue-200",
  "bg-green-50 text-green-700 border-green-200", 
  "bg-purple-50 text-purple-700 border-purple-200",
  "bg-orange-50 text-orange-700 border-orange-200"
];

const priorityColorsSoft = {
  "Crítica": "bg-red-50 text-red-700 border-red-200",
  "Alta": "bg-orange-50 text-orange-700 border-orange-200",
  "Média": "bg-amber-50 text-amber-700 border-amber-200",
  "Baixa": "bg-green-50 text-green-700 border-green-200"
};

export default function Relatorios() {
  const [selectedPeriod, setSelectedPeriod] = useState("mensal");
  const [selectedDepartment, setSelectedDepartment] = useState("todos");

  const report = mockReports[0];

  const handleExportReport = () => {
    // Mock export functionality
    console.log("Exportando relatório...");
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Relatórios</h1>
          <p className="text-slate-600">
            Análise detalhada dos tickets de suporte por período e setor
          </p>
        </div>
        
        <div className="flex gap-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="semanal">Semanal</SelectItem>
              <SelectItem value="mensal">Mensal</SelectItem>
              <SelectItem value="trimestral">Trimestral</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos Setores</SelectItem>
              <SelectItem value="ti">TI</SelectItem>
              <SelectItem value="financeiro">Financeiro</SelectItem>
              <SelectItem value="rh">RH</SelectItem>
              <SelectItem value="operacoes">Operações</SelectItem>
            </SelectContent>
          </Select>
          
          <Button onClick={handleExportReport} className="bg-slate-900 hover:bg-slate-800">
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-700">Total de Tickets</CardTitle>
            <FileText className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{report.totalTickets}</div>
            <p className="text-xs text-slate-500 flex items-center mt-1">
              <TrendingUp className="inline h-3 w-3 mr-1 text-green-600" />
              +12% vs mês anterior
            </p>
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-700">Resolvidos</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-700">{report.resolved}</div>
            <p className="text-xs text-slate-500">
              {Math.round((report.resolved / report.totalTickets) * 100)}% de resolução
            </p>
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-700">Pendentes</CardTitle>
            <Clock className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-700">{report.pending}</div>
            <p className="text-xs text-slate-500">
              Aguardando atendimento
            </p>
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-700">Tempo Médio</CardTitle>
            <BarChart3 className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{report.avgResolutionTime}</div>
            <p className="text-xs text-slate-500">
              Resolução por ticket
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Department Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-slate-900">Tickets por Setor</CardTitle>
            <CardDescription className="text-slate-600">
              Distribuição de tickets por departamento
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(report.departments).map(([dept, count], index) => (
              <div key={dept} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-slate-400"></div>
                  <span className="font-medium text-slate-700">{dept}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={departmentColors[index]}>
                    {count} tickets
                  </Badge>
                  <span className="text-sm text-slate-500">
                    {Math.round((count / report.totalTickets) * 100)}%
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-slate-900">Tickets por Prioridade</CardTitle>
            <CardDescription className="text-slate-600">
              Distribuição por nível de criticidade
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(report.priorities).map(([priority, count]) => (
              <div key={priority} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <AlertCircle className="w-4 h-4 text-slate-500" />
                  <span className="font-medium text-slate-700">{priority}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={priorityColorsSoft[priority as keyof typeof priorityColorsSoft]}>
                    {count} tickets
                  </Badge>
                  <span className="text-sm text-slate-500">
                    {Math.round((count / report.totalTickets) * 100)}%
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Export Options */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-slate-900">Opções de Exportação</CardTitle>
          <CardDescription className="text-slate-600">
            Exporte relatórios detalhados em diferentes formatos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button 
              variant="outline" 
              className="flex items-center gap-2 h-12 border-slate-200 hover:bg-slate-50"
              onClick={handleExportReport}
            >
              <FileText className="h-4 w-4" />
              <div className="text-left">
                <div className="font-medium text-slate-900">Relatório PDF</div>
                <div className="text-xs text-slate-500">Resumo executivo</div>
              </div>
            </Button>
            
            <Button 
              variant="outline" 
              className="flex items-center gap-2 h-12 border-slate-200 hover:bg-slate-50"
              onClick={handleExportReport}
            >
              <Download className="h-4 w-4" />
              <div className="text-left">
                <div className="font-medium text-slate-900">Planilha Excel</div>
                <div className="text-xs text-slate-500">Dados detalhados</div>
              </div>
            </Button>
            
            <Button 
              variant="outline" 
              className="flex items-center gap-2 h-12 border-slate-200 hover:bg-slate-50"
              onClick={handleExportReport}
            >
              <Calendar className="h-4 w-4" />
              <div className="text-left">
                <div className="font-medium text-slate-900">Relatório Mensal</div>
                <div className="text-xs text-slate-500">Análise completa</div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}