import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Bell, User, Settings, LogOut, Home, HelpCircle, AlertCircle, Clock, CheckCircle } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const routeNames: Record<string, string> = {
  '/': 'Dashboard',
  '/novo-ticket': 'Novo Ticket',
  '/meus-tickets': 'Meus Tickets',
  '/todos-chamados': 'Todos Chamados',
  '/relatorios': 'Relatórios',
  '/faq': 'FAQ',
  '/usuarios': 'Usuários',
  '/perfil': 'Perfil',
  '/configuracoes': 'Configurações'
};

export function Header() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Novo ticket criado",
      message: "Ticket #1234 foi criado por João Silva",
      time: "2 min atrás",
      read: false,
      type: "new",
      priority: "high"
    },
    {
      id: 2,
      title: "Ticket atualizado",
      message: "Status do ticket #1230 alterado para Em Andamento",
      time: "15 min atrás",
      read: false,
      type: "update",
      priority: "medium"
    },
    {
      id: 3,
      title: "Ticket crítico aguardando",
      message: "Ticket #1235 de prioridade crítica aguarda atendimento há 1 hora",
      time: "1 hora atrás",
      read: false,
      type: "critical",
      priority: "critical"
    },
    {
      id: 4,
      title: "Ticket finalizado",
      message: "Ticket #1225 foi finalizado com sucesso",
      time: "2 horas atrás",
      read: true,
      type: "completed",
      priority: "low"
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;
  const criticalNotifications = notifications.filter(n => n.priority === 'critical' && !n.read);
  const currentRouteName = routeNames[location.pathname] || 'Página não encontrada';

  const getBreadcrumbs = () => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const breadcrumbs = [{ name: 'Dashboard', path: '/' }];
    
    if (pathSegments.length > 0 && location.pathname !== '/') {
      breadcrumbs.push({ name: currentRouteName, path: location.pathname });
    }
    
    return breadcrumbs;
  };

  const markAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const handleLogout = () => {
    // Limpar dados de sessão
    localStorage.clear();
    sessionStorage.clear();
    
    // Mostrar mensagem de confirmação
    toast({
      title: "Logout realizado com sucesso",
      description: "Você foi desconectado do sistema com segurança.",
    });
    
    // Redirecionar para a tela de login
    navigate('/login');
  };

  return (
    <TooltipProvider>
      <header className="h-14 md:h-16 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="flex h-full items-center justify-between px-3 md:px-6">
          <div className="flex items-center gap-2 md:gap-4 min-w-0">
            <SidebarTrigger className="h-8 w-8 flex-shrink-0" />
            <div className="flex items-center gap-2 min-w-0">
              <div className="font-semibold text-primary text-sm md:text-base truncate">Sistema HelpDesk</div>
              <div className="text-xs md:text-sm text-muted-foreground hidden sm:block">v1.0</div>
            </div>
            
            {/* Breadcrumb Navigation - Heurística 1: Visibilidade do status do sistema */}
            <Breadcrumb className="hidden lg:flex ml-4">
              <BreadcrumbList>
                {getBreadcrumbs().map((crumb, index) => (
                  <div key={crumb.path} className="flex items-center">
                    {index > 0 && <BreadcrumbSeparator />}
                    <BreadcrumbItem>
                      {index === getBreadcrumbs().length - 1 ? (
                        <BreadcrumbPage>{crumb.name}</BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink 
                          onClick={() => navigate(crumb.path)}
                          className="cursor-pointer hover:text-primary"
                        >
                          {crumb.name}
                        </BreadcrumbLink>
                      )}
                    </BreadcrumbItem>
                  </div>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            {/* Help Button - Heurística 10: Ajuda e documentação */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => navigate('/faq')}
                  className="hidden sm:flex h-8 w-8 md:h-10 md:w-10"
                >
                  <HelpCircle className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Ajuda e FAQ</p>
              </TooltipContent>
            </Tooltip>

            {/* Critical Alert Indicator */}
            {criticalNotifications.length > 0 && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-destructive animate-pulse h-8 w-8 md:h-10 md:w-10">
                    <AlertCircle className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{criticalNotifications.length} ticket(s) crítico(s) aguardando</p>
                </TooltipContent>
              </Tooltip>
            )}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative h-8 w-8 md:h-10 md:w-10">
                      <Bell className="h-4 w-4" />
                      {unreadCount > 0 && (
                        <Badge 
                          variant="destructive" 
                          className="absolute -top-1 -right-1 h-3 w-3 p-0 text-xs flex items-center justify-center animate-pulse"
                        >
                          {unreadCount}
                        </Badge>
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Notificações ({unreadCount} não lidas)</p>
                  </TooltipContent>
                </Tooltip>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-72 md:w-80 bg-popover backdrop-blur z-50 border shadow-lg" align="end" forceMount>
                <DropdownMenuLabel className="flex items-center justify-between">
                  <span>Notificações</span>
                  {unreadCount > 0 && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-auto p-0 text-xs text-muted-foreground hover:text-foreground"
                      onClick={markAllAsRead}
                    >
                      Marcar todas como lidas
                    </Button>
                  )}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="max-h-80 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="px-3 py-6 text-center text-sm text-muted-foreground">
                      <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      Nenhuma notificação
                    </div>
                  ) : (
                    notifications.map((notification) => (
                      <DropdownMenuItem
                        key={notification.id}
                        className={`flex flex-col items-start p-3 cursor-pointer transition-colors ${
                          !notification.read ? 'bg-muted/50' : ''
                        } ${
                          notification.priority === 'critical' ? 'border-l-2 border-destructive' : ''
                        }`}
                        onClick={() => markAsRead(notification.id)}
                      >
                        <div className="flex items-start gap-3 w-full">
                          <div className="mt-1">
                            {notification.type === 'new' && (
                              <div className="h-2 w-2 bg-blue-500 rounded-full" />
                            )}
                            {notification.type === 'update' && (
                              <Clock className="h-4 w-4 text-orange-500" />
                            )}
                            {notification.type === 'critical' && (
                              <AlertCircle className="h-4 w-4 text-destructive" />
                            )}
                            {notification.type === 'completed' && (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <p className={`text-sm truncate ${
                                notification.priority === 'critical' ? 'font-semibold text-destructive' : 'font-medium'
                              }`}>
                                {notification.title}
                              </p>
                              {!notification.read && (
                                <div className="h-2 w-2 bg-primary rounded-full flex-shrink-0" />
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                              {notification.message}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {notification.time}
                            </p>
                          </div>
                        </div>
                      </DropdownMenuItem>
                    ))
                  )}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          AD
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Menu do usuário</p>
                  </TooltipContent>
                </Tooltip>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-popover backdrop-blur z-50 border shadow-lg" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">Admin User</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      admin@empresa.com
                    </p>
                    <Badge variant="secondary" className="w-fit text-xs mt-1">
                      Administrador
                    </Badge>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onClick={() => navigate('/perfil')}
                  className="cursor-pointer"
                >
                  <User className="mr-2 h-4 w-4" />
                  <span>Perfil</span>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => navigate('/configuracoes')}
                  className="cursor-pointer"
                >
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Configurações</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onClick={handleLogout}
                  className="cursor-pointer text-destructive focus:text-destructive"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sair</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
    </TooltipProvider>
  );
}