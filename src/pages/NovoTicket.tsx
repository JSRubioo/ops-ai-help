import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, Send, User, Building } from "lucide-react";

const categories = [
  { value: "hardware", label: "Hardware", description: "Problemas com equipamentos físicos" },
  { value: "software", label: "Software", description: "Problemas com sistemas e aplicações" },
  { value: "perifericos", label: "Periféricos", description: "Mouse, teclado, impressora, etc." },
  { value: "acessos", label: "Acessos", description: "Problemas de login e permissões" }
];

const priorities = [
  { 
    value: "critica", 
    label: "Crítica", 
    description: "Afeta todo o setor", 
    color: "bg-priority-critical text-white",
    bgColor: "bg-priority-critical-bg"
  },
  { 
    value: "alta", 
    label: "Alta", 
    description: "Afeta usuário e parte do setor", 
    color: "bg-priority-high text-white",
    bgColor: "bg-priority-high-bg"
  },
  { 
    value: "media", 
    label: "Média", 
    description: "Impede a realização do serviço", 
    color: "bg-priority-medium text-white",
    bgColor: "bg-priority-medium-bg"
  },
  { 
    value: "baixa", 
    label: "Baixa", 
    description: "Dificuldade para realizar o serviço", 
    color: "bg-priority-low text-white",
    bgColor: "bg-priority-low-bg"
  }
];

const mockSuggestions = [
  "Verifique se o cabo de alimentação está conectado corretamente",
  "Reinicie o equipamento e tente novamente", 
  "Verifique se há atualizações pendentes do sistema",
  "Confirme se o usuário possui as permissões necessárias"
];

export default function NovoTicket() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    priority: "",
    description: "",
    user: "Admin User", // Usuário simulado
    department: "Tecnologia da Informação" // Departamento simulado
  });
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleDescriptionChange = (value: string) => {
    setFormData({ ...formData, description: value });
    
    // Simulate AI suggestions based on description
    if (value.length > 20) {
      setSuggestions(mockSuggestions);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const generateProtocol = () => {
    const now = new Date();
    const year = now.getFullYear();
    const number = Math.floor(Math.random() * 9999) + 1;
    return `HD-${year}-${number.toString().padStart(4, '0')}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.category || !formData.priority || !formData.description) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos obrigatórios",
        variant: "destructive",
      });
      return;
    }

    const protocol = generateProtocol();
    
    toast({
      title: "Ticket criado com sucesso!",
      description: `Protocolo: ${protocol}. Você receberá atualizações por email.`,
    });

    // Reset form
    setFormData({
      title: "",
      category: "",
      priority: "",
      description: "",
      user: "Admin User",
      department: "Tecnologia da Informação"
    });
    setShowSuggestions(false);
  };

  const selectedPriority = priorities.find(p => p.value === formData.priority);

  return (
    <div className="max-w-6xl mx-auto space-y-4 md:space-y-6">
      <div className="text-center mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-primary mb-2">Abrir Novo Ticket</h1>
        <p className="text-sm md:text-base text-muted-foreground px-4">
          Descreva o problema que você está enfrentando e nossa equipe irá ajudá-lo
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 md:gap-6">
        <div className="xl:col-span-2">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-lg md:text-xl">Informações do Ticket</CardTitle>
              <CardDescription className="text-sm">
                Preencha os detalhes do problema que você está enfrentando
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 md:space-y-6">
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="user">Usuário</Label>
                    <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{formData.user}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department">Setor</Label>
                    <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                      <Building className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{formData.department}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="title">Título do Problema *</Label>
                  <Input
                    id="title"
                    placeholder="Ex: Impressora não está funcionando"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Categoria *</Label>
                    <Select 
                      value={formData.category} 
                      onValueChange={(value) => setFormData({ ...formData, category: value })}
                    >
                      <SelectTrigger className="text-sm">
                        <SelectValue placeholder="Selecione a categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.value} value={category.value}>
                            <div>
                              <div className="font-medium text-sm">{category.label}</div>
                              <div className="text-xs text-muted-foreground">{category.description}</div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Prioridade *</Label>
                    <Select 
                      value={formData.priority} 
                      onValueChange={(value) => setFormData({ ...formData, priority: value })}
                    >
                      <SelectTrigger className="text-sm">
                        <SelectValue placeholder="Selecione a prioridade" />
                      </SelectTrigger>
                      <SelectContent>
                        {priorities.map((priority) => (
                          <SelectItem key={priority.value} value={priority.value}>
                            <div className="flex items-center gap-2">
                              <Badge className={`${priority.color} text-xs`}>
                                {priority.label}
                              </Badge>
                              <span className="text-xs text-muted-foreground hidden sm:inline">
                                {priority.description}
                              </span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {selectedPriority && (
                  <div className={`p-4 rounded-lg ${selectedPriority.bgColor}`}>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className={selectedPriority.color}>
                        {selectedPriority.label}
                      </Badge>
                    </div>
                    <p className="text-sm">{selectedPriority.description}</p>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="description">Descrição do Problema *</Label>
                  <Textarea
                    id="description"
                    placeholder="Descreva detalhadamente o problema que você está enfrentando..."
                    value={formData.description}
                    onChange={(e) => handleDescriptionChange(e.target.value)}
                    rows={6}
                    required
                  />
                </div>

                <Button type="submit" size="lg" className="w-full text-sm md:text-base">
                  <Send className="mr-2 h-4 w-4" />
                  Abrir Ticket
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {showSuggestions && (
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Lightbulb className="h-5 w-5 text-warning" />
                  Sugestões IA
                </CardTitle>
                <CardDescription>
                  Possíveis soluções baseadas na sua descrição
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {suggestions.map((suggestion, index) => (
                    <div 
                      key={index}
                      className="p-3 bg-muted/50 rounded-lg border-l-4 border-primary text-sm"
                    >
                      {suggestion}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Dicas para um bom ticket</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <p>Seja específico sobre o problema</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <p>Inclua mensagens de erro se houver</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <p>Mencione quando o problema começou</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <p>Descreva o que você estava fazendo</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}