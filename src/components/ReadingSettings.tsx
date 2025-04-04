
import React, { useState } from 'react';
import { useKobo } from '@/contexts/KoboContext';
import { X, Sun, Moon, Type, Minus, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ReadingSettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

const ReadingSettings: React.FC<ReadingSettingsProps> = ({ isOpen, onClose }) => {
  const { 
    readingMode, 
    setReadingMode, 
    fontSize, 
    setFontSize,
    fontFamily,
    setFontFamily
  } = useKobo();
  
  // モードオプション
  const modes = [
    { id: 'day', label: '白', icon: Sun },
    { id: 'night', label: '黒', icon: Moon },
    { id: 'sepia', label: 'セピア', icon: null },
    { id: 'paper', label: '紙', icon: null },
  ];
  
  // フォントサイズの調整（最小12px、最大24px）
  const decreaseFontSize = () => {
    if (fontSize > 12) {
      setFontSize(fontSize - 1);
    }
  };
  
  const increaseFontSize = () => {
    if (fontSize < 24) {
      setFontSize(fontSize + 1);
    }
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-end justify-center">
      <div className="w-full max-w-md bg-background rounded-t-lg p-4 animate-slide-up shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">読書設定</h3>
          <button 
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* 読書モード選択 */}
        <div className="mb-6">
          <h4 className="text-sm font-medium mb-2">表示モード</h4>
          <div className="flex justify-between">
            {modes.map(mode => (
              <button 
                key={mode.id}
                onClick={() => setReadingMode(mode.id as any)}
                className={cn(
                  "flex flex-col items-center justify-center w-16 h-16 rounded-lg",
                  readingMode === mode.id ? 'ring-2 ring-rakuten-crimson' : 'ring-1 ring-muted',
                  `reading-mode-${mode.id}`
                )}
              >
                {mode.icon && <mode.icon className="w-5 h-5 mb-1" />}
                <span className={cn(
                  "text-xs font-medium",
                  mode.id === 'night' ? 'text-white' : 'text-black'
                )}>
                  {mode.label}
                </span>
              </button>
            ))}
          </div>
        </div>
        
        {/* フォントサイズ調整 */}
        <div className="mb-6">
          <h4 className="text-sm font-medium mb-2">文字サイズ</h4>
          <div className="flex items-center justify-between">
            <button 
              onClick={decreaseFontSize}
              className="w-10 h-10 rounded-full border border-muted flex items-center justify-center hover:bg-muted"
              disabled={fontSize <= 12}
            >
              <Minus className="w-4 h-4" />
            </button>
            
            <div className="flex-1 mx-4 text-center">
              <p style={{ fontSize: `${fontSize}px` }}>文字サンプル</p>
              <p className="text-xs text-muted-foreground mt-1">{fontSize}px</p>
            </div>
            
            <button 
              onClick={increaseFontSize}
              className="w-10 h-10 rounded-full border border-muted flex items-center justify-center hover:bg-muted"
              disabled={fontSize >= 24}
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        {/* フォント選択 */}
        <div className="mb-4">
          <h4 className="text-sm font-medium mb-2">フォント</h4>
          <div className="flex space-x-4">
            <button 
              onClick={() => setFontFamily('sans')}
              className={cn(
                "flex-1 py-2 px-4 rounded-lg border",
                fontFamily === 'sans' 
                  ? 'border-rakuten-crimson text-rakuten-crimson' 
                  : 'border-muted text-muted-foreground'
              )}
            >
              <span className="font-sans">ゴシック体</span>
            </button>
            
            <button 
              onClick={() => setFontFamily('serif')}
              className={cn(
                "flex-1 py-2 px-4 rounded-lg border",
                fontFamily === 'serif' 
                  ? 'border-rakuten-crimson text-rakuten-crimson' 
                  : 'border-muted text-muted-foreground'
              )}
            >
              <span className="font-serif">明朝体</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadingSettings;
