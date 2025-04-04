
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, Share2, BookOpen, ShoppingCart, Star } from 'lucide-react';
import { getBookById } from '@/data/books';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

const BookDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isDescExpanded, setIsDescExpanded] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  
  const book = getBookById(id || '');
  
  if (!book) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>書籍が見つかりませんでした。</p>
      </div>
    );
  }
  
  const handlePurchase = () => {
    // 実際は購入フローへ進むが、ここではトーストで表示
    toast({
      title: "カートに追加しました",
      description: `${book.title}をカートに追加しました`,
      duration: 3000,
    });
  };
  
  const handleReadSample = () => {
    // サンプル読書ページへ遷移
    navigate(`/reader/${book.id}?sample=true`);
  };
  
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast({
      title: isFavorite ? "お気に入りから削除しました" : "お気に入りに追加しました",
      description: book.title,
      duration: 2000,
    });
  };
  
  const handleShare = () => {
    // シェア機能
    if (navigator.share) {
      navigator.share({
        title: book.title,
        text: `${book.title} - ${book.author}`,
        url: window.location.href,
      });
    } else {
      toast({
        title: "シェア",
        description: "このデバイスではシェア機能がサポートされていません",
        duration: 2000,
      });
    }
  };
  
  // 金額表示のフォーマット
  const formatPrice = (price: number) => {
    return `¥${price.toLocaleString()}`;
  };
  
  return (
    <div className="pb-20">
      {/* ヘッダー */}
      <header className="bg-white dark:bg-background sticky top-0 z-10 shadow-sm">
        <div className="flex items-center justify-between p-4">
          <button 
            onClick={() => navigate(-1)}
            className="text-muted-foreground"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-medium">書籍の詳細</h1>
          <div className="w-5" /> {/* スペーサー */}
        </div>
      </header>

      <main>
        {/* 書籍情報上部 */}
        <div className="px-4 py-6 flex">
          <div className="w-1/3 aspect-[2/3] shadow-book rounded-md overflow-hidden mr-4">
            <img 
              src={book.coverImage} 
              alt={book.title} 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold">{book.title}</h2>
            <p className="text-muted-foreground mt-1">{book.author}</p>
            
            {/* 評価 */}
            <div className="flex items-center mt-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i}
                    className={cn(
                      "w-4 h-4",
                      i < Math.floor(book.rating) 
                        ? "fill-rakuten-gold text-rakuten-gold" 
                        : "text-muted"
                    )}
                  />
                ))}
              </div>
              <span className="text-sm ml-1">{book.rating}</span>
            </div>
            
            {/* 価格 */}
            <div className="mt-3">
              <p className="text-xl font-bold text-rakuten-crimson">
                {formatPrice(book.price)}
                <span className="text-xs text-muted-foreground ml-1">(税込)</span>
              </p>
            </div>
            
            {/* カテゴリ */}
            <div className="flex flex-wrap gap-1 mt-3">
              {book.categories.map((category, index) => (
                <span 
                  key={index}
                  className="px-2 py-0.5 text-xs bg-muted rounded-full"
                >
                  {category}
                </span>
              ))}
            </div>
          </div>
        </div>
        
        {/* アクションボタン */}
        <div className="px-4 mb-6 flex gap-2">
          <Button 
            onClick={handlePurchase}
            className="flex-1 bg-rakuten-crimson hover:bg-rakuten-dark"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            購入する
          </Button>
          <Button 
            onClick={handleReadSample}
            variant="outline"
            className="flex-1"
          >
            <BookOpen className="w-4 h-4 mr-2" />
            試し読み
          </Button>
        </div>
        
        {/* 説明文 */}
        <div className="px-4 mb-6">
          <h3 className="text-lg font-bold mb-2">内容紹介</h3>
          <div className={cn(
            "text-sm text-muted-foreground relative",
            !isDescExpanded && "max-h-24 overflow-hidden"
          )}>
            <p>{book.description}</p>
            
            {!isDescExpanded && (
              <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-background to-transparent" />
            )}
          </div>
          <button
            onClick={() => setIsDescExpanded(!isDescExpanded)}
            className="text-rakuten-crimson text-sm mt-2"
          >
            {isDescExpanded ? '閉じる' : 'もっと見る'}
          </button>
        </div>
        
        {/* 書籍情報 */}
        <div className="px-4 mb-6">
          <h3 className="text-lg font-bold mb-2">書籍情報</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">発売日</span>
              <span>{book.publishDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">ページ数</span>
              <span>{book.pageCount}ページ</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">ファイルサイズ</span>
              <span>{Math.round(book.pageCount * 0.15)}MB</span>
            </div>
          </div>
        </div>
        
        {/* その他のアクション */}
        <div className="px-4 mb-6 flex justify-around">
          <button 
            onClick={toggleFavorite}
            className="flex flex-col items-center"
          >
            <div className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center mb-1",
              "bg-muted/50"
            )}>
              <Heart className={cn(
                "w-5 h-5",
                isFavorite ? "fill-rakuten-crimson text-rakuten-crimson" : "text-muted-foreground"
              )} />
            </div>
            <span className="text-xs text-muted-foreground">
              お気に入り
            </span>
          </button>
          
          <button 
            onClick={handleShare}
            className="flex flex-col items-center"
          >
            <div className="w-10 h-10 rounded-full flex items-center justify-center mb-1 bg-muted/50">
              <Share2 className="w-5 h-5 text-muted-foreground" />
            </div>
            <span className="text-xs text-muted-foreground">
              シェア
            </span>
          </button>
        </div>
      </main>
    </div>
  );
};

export default BookDetail;
