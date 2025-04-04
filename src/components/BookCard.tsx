
import React from 'react';
import { Book } from '../data/books';
import { useNavigate } from 'react-router-dom';
import { Heart, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useKobo } from '@/contexts/KoboContext';

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

  // グリッドビューとリストビューに応じたレイアウト
  if (viewMode === 'list') {
    return (
      <div 
        className="book-card flex-row h-24 my-2 cursor-pointer" 
        onClick={handleClick}
      >
        <div className="book-cover h-full w-16">
          <img src={book.coverImage} alt={book.title} className="object-cover h-full" />
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
          <div className="flex justify-between items-center">
            {!book.isOwned ? (
              <p className="book-price">¥{book.price.toLocaleString()}</p>
            ) : (
              <div className="flex items-center text-muted-foreground text-xs">
                <BookOpen className="w-3 h-3 mr-1" />
                <span>{book.progress === 100 ? '完読' : `${book.progress}%`}</span>
              </div>
            )}
            {book.isOwned && showProgress && book.progress !== undefined && (
              <div className="w-16 h-1 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-rakuten-red" 
                  style={{ width: `${book.progress}%` }}
                />
              </div>
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
      <div className="book-cover relative">
        <img src={book.coverImage} alt={book.title} />
        
        {/* お気に入りアイコン */}
        {book.isFavorite && (
          <div className="absolute top-1 right-1">
            <Heart className="w-4 h-4 fill-rakuten-red text-rakuten-red" />
          </div>
        )}
        
        {/* 進行状況インジケーター */}
        {book.isOwned && showProgress && book.progress !== undefined && (
          <div className="absolute bottom-0 left-0 right-0 reading-progress-bar">
            <div 
              className="reading-progress-fill" 
              style={{ '--reading-progress': `${book.progress}%` } as React.CSSProperties} 
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
