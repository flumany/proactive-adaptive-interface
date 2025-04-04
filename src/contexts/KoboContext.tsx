
import React, { createContext, useState, useContext, useEffect } from 'react';

export type ReadingMode = 'day' | 'night' | 'sepia' | 'paper';
export type ViewMode = 'grid' | 'list';

interface KoboContextType {
  readingMode: ReadingMode;
  setReadingMode: (mode: ReadingMode) => void;
  fontSize: number;
  setFontSize: (size: number) => void;
  fontFamily: 'sans' | 'serif';
  setFontFamily: (family: 'sans' | 'serif') => void;
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  isDarkMode: boolean;
  setIsDarkMode: (isDark: boolean) => void;
  currentTime: Date;
}

const KoboContext = createContext<KoboContextType | undefined>(undefined);

export const useKobo = () => {
  const context = useContext(KoboContext);
  if (!context) {
    throw new Error('useKobo must be used within a KoboProvider');
  }
  return context;
};

export const KoboProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // デフォルト設定
  const [readingMode, setReadingMode] = useState<ReadingMode>('day');
  const [fontSize, setFontSize] = useState(16);
  const [fontFamily, setFontFamily] = useState<'sans' | 'serif'>('sans');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // 時間に応じて自動的に読書モードを切り替える
  useEffect(() => {
    // 1分ごとに現在時刻を更新
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);
      
      // 20:00～6:00の間は自動的にナイトモードに切り替える（ユーザーが手動で変更していない場合）
      const hour = now.getHours();
      if ((hour >= 20 || hour < 6) && readingMode === 'day') {
        setReadingMode('night');
        setIsDarkMode(true);
      } else if (hour >= 6 && hour < 20 && readingMode === 'night') {
        setReadingMode('day');
        setIsDarkMode(false);
      }
    }, 60000);

    return () => clearInterval(timer);
  }, [readingMode]);

  // ローカルストレージから設定を読み込む
  useEffect(() => {
    const savedReadingMode = localStorage.getItem('kobo-reading-mode');
    const savedFontSize = localStorage.getItem('kobo-font-size');
    const savedFontFamily = localStorage.getItem('kobo-font-family');
    const savedViewMode = localStorage.getItem('kobo-view-mode');
    const savedDarkMode = localStorage.getItem('kobo-dark-mode');

    if (savedReadingMode) setReadingMode(savedReadingMode as ReadingMode);
    if (savedFontSize) setFontSize(Number(savedFontSize));
    if (savedFontFamily) setFontFamily(savedFontFamily as 'sans' | 'serif');
    if (savedViewMode) setViewMode(savedViewMode as ViewMode);
    if (savedDarkMode) setIsDarkMode(savedDarkMode === 'true');
  }, []);

  // 設定変更時にローカルストレージに保存
  useEffect(() => {
    localStorage.setItem('kobo-reading-mode', readingMode);
    localStorage.setItem('kobo-font-size', fontSize.toString());
    localStorage.setItem('kobo-font-family', fontFamily);
    localStorage.setItem('kobo-view-mode', viewMode);
    localStorage.setItem('kobo-dark-mode', isDarkMode.toString());
    
    // ダークモードをdocumentに適用
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [readingMode, fontSize, fontFamily, viewMode, isDarkMode]);

  const value = {
    readingMode,
    setReadingMode,
    fontSize,
    setFontSize,
    fontFamily,
    setFontFamily,
    viewMode,
    setViewMode,
    isDarkMode,
    setIsDarkMode,
    currentTime
  };

  return <KoboContext.Provider value={value}>{children}</KoboContext.Provider>;
};
