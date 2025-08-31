import { Bell, User, Clock, CheckCircle, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useState } from "react";

export function Header() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Novo ticket criado",
      message: "Ticket #1234 foi criado por João Silva",
      time: "2 min atrás",
      read: false,
      type: "new"
    },
    {
      id: 2,
      title: "Ticket atualizado",
      message: "Status do ticket #1230 alterado para Em Andamento",
      time: "15 min atrás",
      read: false,
      type: "update"
    },
    {
      id: 3,
      title: "Ticket finalizado",
      message: "Ticket #1225 foi finalizado com sucesso",
      time: "1 hora atrás",
      read: true,
      type: "completed"
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

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

  return (
    <header className="h-16 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="flex h-full items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <SidebarTrigger className="h-8 w-8" />
          <div className="flex items-center gap-2">
            <div className="font-semibold text-primary">Sistema HelpDesk</div>
            <div className="text-sm text-muted-foreground">v1.0</div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-4 w-4" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-3 w-3 bg-destructive rounded-full text-xs flex items-center justify-center text-white">
                    {unreadCount}
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-80" align="end" forceMount>
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
                    Nenhuma notificação
                  </div>
                ) : (
                  notifications.map((notification) => (
                    <DropdownMenuItem
                      key={notification.id}
                      className={`flex flex-col items-start p-3 cursor-pointer ${
                        !notification.read ? 'bg-muted/50' : ''
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
                          {notification.type === 'completed' && (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-sm truncate">
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
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    AD
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">Admin User</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    admin@empresa.com
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => window.location.href = '/perfil'}>
                <User className="mr-2 h-4 w-4" />
                <span>Perfil</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => window.location.href = '/configuracoes'}>
                <Settings className="mr-2 h-4 w-4" />
                <span>Configurações</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <span>Sair</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}