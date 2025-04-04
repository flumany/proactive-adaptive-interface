
import React from 'react';
import { 
  User, BookOpen, CreditCard, Settings, Moon, Sun, 
  HelpCircle, LogOut, ChevronRight, Bell
} from 'lucide-react';
import { useKobo } from '@/contexts/KoboContext';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';

const Account: React.FC = () => {
  const { isDarkMode, setIsDarkMode } = useKobo();
  const { toast } = useToast();
  
  const handleLogout = () => {
    toast({
      title: "ログアウト",
      description: "ログアウトしました",
      duration: 2000,
    });
  };
  
  const menuItems = [
    {
      icon: BookOpen,
      label: '読書設定',
      onClick: () => {},
    },
    {
      icon: CreditCard,
      label: '支払い方法',
      onClick: () => {},
    },
    {
      icon: Bell,
      label: '通知設定',
      onClick: () => {},
    },
    {
      icon: HelpCircle,
      label: 'ヘルプとサポート',
      onClick: () => {},
    }
  ];
  
  return (
    <div className="pb-20">
      {/* ヘッダー */}
      <header className="bg-white dark:bg-background sticky top-0 z-10 shadow-sm">
        <div className="p-4">
          <h1 className="text-xl font-bold">アカウント</h1>
        </div>
      </header>

      <main className="px-4">
        {/* ユーザープロフィール */}
        <div className="mt-4 flex items-center p-4 bg-card rounded-lg shadow-sm">
          <div className="w-14 h-14 bg-rakuten-crimson rounded-full flex items-center justify-center text-white mr-4">
            <User className="w-7 h-7" />
          </div>
          <div>
            <h2 className="font-bold">ユーザー名</h2>
            <p className="text-sm text-muted-foreground">user@example.com</p>
          </div>
          <ChevronRight className="ml-auto text-muted-foreground" />
        </div>
        
        {/* メニュー項目 */}
        <div className="mt-6 bg-card rounded-lg shadow-sm overflow-hidden">
          {menuItems.map((item, index) => (
            <div 
              key={index}
              onClick={item.onClick}
              className="flex items-center p-4 border-b last:border-0 border-border cursor-pointer hover:bg-muted/30"
            >
              <item.icon className="w-5 h-5 mr-3 text-muted-foreground" />
              <span>{item.label}</span>
              <ChevronRight className="ml-auto text-muted-foreground" />
            </div>
          ))}
        </div>
        
        {/* 表示設定 */}
        <div className="mt-6 bg-card rounded-lg shadow-sm overflow-hidden">
          <div className="p-4 border-b border-border">
            <h3 className="font-medium">表示設定</h3>
          </div>
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center">
              {isDarkMode ? (
                <Moon className="w-5 h-5 mr-3 text-muted-foreground" />
              ) : (
                <Sun className="w-5 h-5 mr-3 text-muted-foreground" />
              )}
              <span>ダークモード</span>
            </div>
            <Switch 
              checked={isDarkMode}
              onCheckedChange={setIsDarkMode}
            />
          </div>
        </div>
        
        {/* アプリ情報 */}
        <div className="mt-6 bg-card rounded-lg shadow-sm p-4">
          <h3 className="font-medium mb-2">アプリ情報</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">バージョン</span>
              <span>2.5.1</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">最終更新日</span>
              <span>2023年4月1日</span>
            </div>
          </div>
        </div>
        
        {/* ログアウト */}
        <button 
          onClick={handleLogout}
          className="mt-6 w-full py-3 text-rakuten-crimson font-medium bg-card rounded-lg shadow-sm flex items-center justify-center"
        >
          <LogOut className="w-5 h-5 mr-2" />
          ログアウト
        </button>
        
        {/* フッター */}
        <div className="mt-8 mb-4 text-center">
          <p className="text-xs text-muted-foreground">© Rakuten Group, Inc.</p>
        </div>
      </main>
    </div>
  );
};

export default Account;
