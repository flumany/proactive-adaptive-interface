
import React from 'react';
import { Book } from '../data/books';
import { useNavigate } from 'react-router-dom';
import { Heart, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useKobo } from '@/contexts/KoboContext';
import { Progress } from '@/components/ui/progress';

interface BookCardProps {
  book: Book;
  showProgress?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const BookCard: React.FC<BookCardProps> = ({ book, showProgress = true, size = 'md' }) => {
  const navigate = useNavigate();
  const { viewMode } = useKobo();
  
  const handleClick = () => {
    if (book.isOwned) {
      navigate(`/reader/${book.id}`);
    } else {
      navigate(`/book/${book.id}`);
    }
  };

  // サイズに応じたクラス
  const sizeClasses = {
    sm: 'w-24',
    md: 'w-32',
    lg: 'w-40'
  };

  // 書籍カバーの背景色をIDから生成 (一貫性のある色を得るため)
  const getColorFromId = (id: string) => {
    const colors = [
      'bg-rakuten-crimson/90', // 楽天レッド
      'bg-rakuten-dark/90',    // ダークレッド
      'bg-rakuten-gold/90',    // ゴールド
      'bg-blue-500/90',        // ブルー
      'bg-green-600/90',       // グリーン
      'bg-purple-500/90',      // パープル
      'bg-teal-500/90',        // ティール
      'bg-orange-500/90',      // オレンジ
      'bg-gray-600/90',        // グレー
    ];
    
    // 本のIDから一貫した色を選択
    const colorIndex = book.id.charCodeAt(book.id.length - 1) % colors.length;
    return colors[colorIndex];
  };

  // グリッドビューとリストビューに応じたレイアウト
  if (viewMode === 'list') {
    return (
      <div 
        className="book-card flex-row h-24 my-2 cursor-pointer" 
        onClick={handleClick}
      >
        <div className="book-cover h-full w-16 relative">
          <div className={`absolute inset-0 ${getColorFromId(book.id)} flex items-center justify-center text-white text-xl font-bold`}>
            {book.title.charAt(0)}
          </div>
          {book.isFavorite && (
            <div className="absolute top-1 right-1">
              <Heart className="w-4 h-4 fill-rakuten-red text-rakuten-red" />
            </div>
          )}
        </div>
        <div className="book-info flex-1 flex flex-col justify-between py-1">
          <div>
            <h3 className="book-title">{book.title}</h3>
            <p className="book-author">{book.author}</p>
          </div>
          <div className="flex flex-col gap-1">
            {!book.isOwned ? (
              <p className="book-price">¥{book.price.toLocaleString()}</p>
            ) : (
              <div className="flex items-center text-muted-foreground text-xs">
                <BookOpen className="w-3 h-3 mr-1" />
                <span>{book.progress === 100 ? '完読' : `${book.progress}%`}</span>
              </div>
            )}
            {book.isOwned && showProgress && book.progress !== undefined && (
              <Progress 
                value={book.progress} 
                className="h-1 w-full bg-muted" 
                indicatorClassName="bg-rakuten-crimson" 
              />
            )}
          </div>
        </div>
      </div>
    );
  }

  // グリッドビュー（デフォルト）
  return (
    <div 
      className={cn("book-card cursor-pointer my-2", sizeClasses[size])}
      onClick={handleClick}
    >
      <div className="book-cover relative aspect-[2/3] overflow-hidden">
        <div className={`absolute inset-0 ${getColorFromId(book.id)} flex items-center justify-center text-white font-bold`}>
          {book.title.charAt(0)}
        </div>
        
        {/* お気に入りアイコン */}
        {book.isFavorite && (
          <div className="absolute top-1 right-1">
            <Heart className="w-4 h-4 fill-rakuten-red text-rakuten-red" />
          </div>
        )}
        
        {/* 進行状況インジケーター */}
        {book.isOwned && showProgress && book.progress !== undefined && (
          <div className="absolute bottom-0 left-0 right-0 px-1 pb-1">
            <Progress 
              value={book.progress} 
              className="h-1 w-full bg-white/30" 
              indicatorClassName="bg-rakuten-crimson" 
            />
          </div>
        )}
      </div>
      <div className="book-info">
        <h3 className="book-title">{book.title}</h3>
        <p className="book-author">{book.author}</p>
        {!book.isOwned ? (
          <p className="book-price">¥{book.price.toLocaleString()}</p>
        ) : (
          book.progress === 100 && (
            <div className="flex items-center text-xs text-muted-foreground">
              <BookOpen className="w-3 h-3 mr-1" />
              <span>完読</span>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default BookCard;
