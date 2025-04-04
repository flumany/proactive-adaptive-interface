
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Search, Library, User, LayoutGrid, List } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useKobo } from '@/contexts/KoboContext';

const BottomNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { viewMode, setViewMode } = useKobo();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // ナビゲーションアイテム
  const navItems = [
    { path: '/', icon: Home, label: 'ホーム' },
    { path: '/search', icon: Search, label: '検索' },
    { path: '/library', icon: Library, label: 'ライブラリ' },
    { path: '/account', icon: User, label: 'アカウント' }
  ];

  const toggleViewMode = (e: React.MouseEvent) => {
    e.stopPropagation();
    setViewMode(viewMode === 'grid' ? 'list' : 'grid');
  };

  // 読書画面ではナビゲーションバーを表示しない
  if (location.pathname.startsWith('/reader/')) {
    return null;
  }

  return (
    <div className="bottom-nav">
      {navItems.map((item, index) => (
        <div
          key={index}
          className="nav-item"
          onClick={() => navigate(item.path)}
        >
          <item.icon
            className={cn(
              'nav-icon w-6 h-6',
              isActive(item.path) ? 'active' : ''
            )}
          />
          <span className={cn(
            'nav-label',
            isActive(item.path) ? 'text-rakuten-crimson' : 'text-muted-foreground'
          )}>
            {item.label}
          </span>
        </div>
      ))}
      
      {/* 表示モード切替ボタン（ライブラリページのみ） */}
      {isActive('/library') && (
        <div 
          className="nav-item" 
          onClick={toggleViewMode}
        >
          {viewMode === 'grid' ? (
            <List className="nav-icon w-6 h-6" />
          ) : (
            <LayoutGrid className="nav-icon w-6 h-6" />
          )}
          <span className="nav-label text-muted-foreground">
            {viewMode === 'grid' ? 'リスト' : 'グリッド'}
          </span>
        </div>
      )}
    </div>
  );
};

export default BottomNav;
