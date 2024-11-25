'use client';

import { ReactNode, useEffect, useState } from 'react';
import Image from 'next/image';
import {
  ChevronRight,
  Menu,
  X,
  LogOut,
  UserRound,
} from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import { Button } from '@/ui/controls/button';
import { ScrollArea } from '@/ui/controls/scroll-area';
import { useRouter } from 'next/navigation';
import { utils } from '@utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/ui/controls/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/ui/controls/dropdown-menu';
import { Label } from '@/ui/controls/label';
import { useAuthorization } from '@/lib/hooks/use-authorization';
import InstallPWAButton from '@/ui/controls/install-pwa-button';


export default function MainLayout({ children, rootPath, menuItems }: { children: ReactNode, rootPath: string, menuItems:any[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [openSubmenus, setOpenSubmenus] = useState<string[]>([]);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [selectedSubItem, setSelectedSubItem] = useState<string | null>(null);
  const [loggedUser, setLoggedUser] = useState<any>();
  
  const router = useRouter();
  const { data: session, status } = useSession();
  const hasAuthorization = useAuthorization();


  useEffect(() => {
    if (status === 'authenticated' && session?.user) {
      loadLoggedUser(session.user);
    } else if (status === 'unauthenticated') {
      router.push('/');
    }
  }, [status, session]);

  useEffect(() => {
    if(status !== "authenticated"){
      window.location.reload();
    }
  },[]);

  const toggleSubmenu = (key: string) => {
    setOpenSubmenus((prev) =>
      prev.includes(key) ? prev.filter((item) => item !== key) : [...prev, key],
    );
  };

  const loadLoggedUser = (user: any) => {
    setLoggedUser(user);
  };


  const handleItemClick = (item: any) => {
    const { key, path } = item;
    setSelectedItem(key);
    setSelectedSubItem(null);
    toggleSubmenu(key);

    if (path) {
      router.push(`/${rootPath}${path}`);
      setIsOpen(false);
    }
  };

  const handleSubItemClick = (key: string, subItem: any) => {
    const { path, label } = subItem;
    setSelectedSubItem(label);
    setSelectedItem(key);

    if (path) {
      router.push(`/${rootPath}${path}`);
      setIsOpen(false);
    }
  };

  const handleSignOut = async () => {
    
    try {
      await signOut({ redirect: false })
      router.push('/')
    } catch (error) {
      console.error('Error to try close session:', error)
    }
  }

  return (
    <div className="h-screen flex bg-[hsl(var(--muted)/.4)]">
      {/* Sidebar */}
      <aside
        className={`
        fixed left-0 top-0 z-40 h-screen w-64 bg-[#017269] shadow-lg transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:relative lg:translate-x-0
      `}
      >
        <div className="flex h-40 flex-col items-center justify-end pb-4">
          <div className="relative h-32 w-56">
            <Image
              src="/images/fixsy.png"
              alt="Coffee Logo"
              fill
              className="object-contain"
            />
          </div>
        </div>

        <ScrollArea className="h-[calc(100vh-10rem)]">
          <nav className="p-4">
            {menuItems.map((item,index) =>
            {
              const isAuthorized = hasAuthorization(item.securityName);

              if(!isAuthorized){
                return <div key={`empty-div-lyt-${item.securityName}-${index}`}/>
              }
            return (
              
              <div key={item.key} className="mb-2">
                <Button
                  variant="ghost"
                  className={`w-full justify-between text-white hover:bg-white hover:text-[#017269] ${
                    selectedItem === item.key ? 'bg-white/20' : ''
                  }`}
                  onClick={() => handleItemClick(item)}
                >
                  <span className="flex w-full items-center justify-between">
                    <span className="flex items-center">
                      {item.icon}
                      <span className="ml-2">{item.label}</span>{' '}
                      {/* Espaciado entre el icono y el texto */}
                    </span>
                    {utils.arrayHasItems(item.subItems) && (
                      <ChevronRight
                        className={`h-4 w-4 transition-transform duration-200 ${
                          openSubmenus.includes(item.key) ? 'rotate-90' : ''
                        }`}
                      />
                    )}
                  </span>
                </Button>
                {openSubmenus.includes(item.key) && (
                  <div className="mt-1 pl-4">
                    {item.subItems.map((subItem:any) => (
                      <Button
                        key={subItem.label}
                        variant="ghost"
                        className={`w-full justify-start text-white hover:bg-white hover:text-[#017269] ${
                          selectedSubItem === subItem.label &&
                          selectedItem === item.key
                            ? 'bg-white/20'
                            : ''
                        }`}
                        onClick={() => handleSubItemClick(item.key, subItem)}
                      >
                        <span className="flex items-center">
                          {subItem.icon}
                          <span className="ml-2">{subItem.label}</span>{' '}
                          {/* Espaciado entre el icono y el texto */}
                        </span>
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            )
          }
            )}
          </nav>
        </ScrollArea>
      </aside>

      {/* Top Bar */}

      <div className="flex flex-1 flex-col overflow-hidden bg-[hsl(var(--muted)/.4)]">
        <div>
          <header className="z-30 flex h-[3.5rem] items-center justify-between border-b-[1px] bg-white p-4 text-white">
            <div className="flex items-center">
              <Button
                variant="outline"
                size="icon"
                className={`item fixed left-4 top-2 z-40 border-[#017269] ${
                  isOpen
                    ? 'border-white bg-[#017269] text-white hover:bg-[#017269] hover:text-slate-300'
                    : 'bg-white text-[#017269] hover:bg-white hover:text-[#017269]'
                } lg:hidden`}
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? (
                  <X className="h-3 w-3" />
                ) : (
                  <Menu className="h-3 w-3" />
                )}
              </Button>
              <h1 className="text-xl font-bold">Fixsy</h1>
            </div>
            <div className="flex items-center space-x-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="relative h-8 w-8 rounded-full"
                  >
                    <Avatar className="h-8 w-8 border-[#017269] text-primary">
                      <AvatarImage className="border-[#017269]" alt="@username" />
                      <AvatarFallback className="border-[#017269] text-primary">
                        <UserRound/>
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-52" align="end" forceMount>
                  <DropdownMenuItem  className='text-primary text-center text-black justify-center'>
                   <Label className='text-center'>{loggedUser?.userName}</Label>
                  </DropdownMenuItem>
                  <DropdownMenuItem className='text-primary'>
                        <InstallPWAButton />
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleSignOut} className='text-primary'>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign up</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>
        </div>

        <div>
          <main className="flex-1 overflow-auto p-2 text-[#017269] lg:p-4">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
