
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Settings, Bookmark, Menu, ChevronLeft, ChevronRight 
} from 'lucide-react';
import { getBookById } from '@/data/books';
import { useKobo } from '@/contexts/KoboContext';
import ReadingSettings from '@/components/ReadingSettings';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

const Reader: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { 
    readingMode, 
    fontSize, 
    fontFamily 
  } = useKobo();
  
  const [showControls, setShowControls] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [bookmarkPage, setBookmarkPage] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const book = getBookById(id || '');
  
  // サンプルコンテンツ（実際はAPIから取得）
  const chapterContent = [
    {
      title: "第1章",
      content: "それは、長い長い物語の始まりだった。主人公が初めて冒険に出る日、空は青く晴れ渡っていた。誰もが平和な日常を過ごす中、彼だけは心の奥に秘めた想いがあった。未知の世界への好奇心と、失われた過去を取り戻したいという願い。\n\n「今日こそは、この村を出る」\n\n彼はそう決意し、小さなリュックに必要最低限の荷物をつめた。家族に別れを告げる勇気はなかったが、いつか必ず成功して戻ってくると心に誓った。"
    },
    {
      title: "第2章",
      content: "村を出て三日目、彼は初めての困難に直面した。食料は底をつき、方向感覚も曖昧になってきた。地図には載っていない深い森の中で、彼は一人きりだった。\n\n「ここで諦めるわけにはいかない」\n\n夜になると、森はさらに不気味さを増した。見たこともない生き物の気配が周囲から感じられる。そんな時、遠くにぼんやりと明かりが見えた。人里か、それとも別の何かか。彼は慎重に明かりに近づいていった。"
    },
    {
      title: "第3章",
      content: "明かりの正体は小さな茅葺きの家だった。そこに住んでいたのは、噂に聞いていた森の賢者だった。白髪の老人は彼を温かく迎え入れ、食事と寝床を提供してくれた。\n\n「若者よ、君の旅の目的は何かね？」\n\n老人の問いに、彼は自分の物語を打ち明けた。失われた家族の遺産、伝説の宝、そして自分のアイデンティティを探す旅。\n\n「なるほど。君の探しているものは、実は君の中にあるのかもしれんよ」\n\n老人の言葉は謎めいていたが、彼はなぜかその言葉に救われる思いがした。"
    }
  ];
  
  const totalPages = 10; // 実際は動的に計算
  
  // 進捗を保存
  useEffect(() => {
    if (book && book.isOwned) {
      const progress = Math.round((currentPage / totalPages) * 100);
      // 実際のアプリでは進捗をサーバーに保存
      console.log(`Reading progress: ${progress}%`);
    }
  }, [book, currentPage]);
  
  // ページを切り替えたときのアニメーション
  const changePage = (direction: 'next' | 'prev') => {
    if (isAnimating) return;
    
    if (direction === 'next' && currentPage < totalPages) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentPage(currentPage + 1);
        setIsAnimating(false);
      }, 300);
    } else if (direction === 'prev' && currentPage > 1) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentPage(currentPage - 1);
        setIsAnimating(false);
      }, 300);
    }
  };
  
  // 画面タップでコントロール表示・非表示切り替え
  const toggleControls = () => {
    setShowControls(!showControls);
  };
  
  // ブックマーク設定
  const toggleBookmark = () => {
    if (bookmarkPage === currentPage) {
      setBookmarkPage(null);
      toast({
        title: "ブックマークを削除しました",
        duration: 2000,
      });
    } else {
      setBookmarkPage(currentPage);
      toast({
        title: "ブックマークを追加しました",
        description: `${currentPage}ページ目`,
        duration: 2000,
      });
    }
  };
  
  if (!book) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>書籍が見つかりませんでした。</p>
      </div>
    );
  }
  
  // 現在のチャプター取得（簡略化）
  const currentChapter = chapterContent[Math.min(currentPage - 1, chapterContent.length - 1)];
  
  return (
    <div 
      className={cn(
        "h-screen flex flex-col",
        `reading-mode-${readingMode}`
      )}
    >
      {/* 上部コントロール */}
      <div 
        className={cn(
          "transition-opacity duration-300 flex justify-between items-center p-4",
          showControls ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      >
        <button 
          onClick={() => navigate(-1)}
          className={cn(
            "text-current",
            readingMode === 'night' ? "text-white" : "text-black"
          )}
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex items-center space-x-4">
          <button onClick={toggleBookmark}>
            <Bookmark 
              className={cn(
                "w-5 h-5",
                bookmarkPage === currentPage ? "fill-rakuten-crimson text-rakuten-crimson" : "text-current"
              )} 
            />
          </button>
          <button onClick={() => setShowSettings(true)}>
            <Settings className="w-5 h-5 text-current" />
          </button>
          <button>
            <Menu className="w-5 h-5 text-current" />
          </button>
        </div>
      </div>
      
      {/* 本文 */}
      <div 
        className="flex-1 overflow-y-auto px-5 py-2"
        onClick={toggleControls}
      >
        <div className={cn(
          "max-w-prose mx-auto",
          `reading-text ${readingMode === 'night' ? 'reading-text-night' : ''}`,
          isAnimating ? "opacity-0 transition-opacity duration-300" : "opacity-100 transition-opacity duration-300",
          fontFamily === 'serif' ? "font-serif" : "font-sans"
        )}
        style={{ fontSize: `${fontSize}px` }}>
          <h2 className="text-xl font-bold mb-4">{currentChapter.title}</h2>
          {currentChapter.content.split('\n\n').map((paragraph, idx) => (
            <p key={idx} className="mb-4">{paragraph}</p>
          ))}
        </div>
      </div>
      
      {/* 下部コントロール */}
      <div 
        className={cn(
          "transition-opacity duration-300 p-4 flex justify-between items-center",
          showControls ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      >
        <button 
          onClick={() => changePage('prev')}
          disabled={currentPage <= 1}
          className={cn(
            "p-2 rounded-full",
            currentPage <= 1 ? "opacity-30" : "opacity-100"
          )}
        >
          <ChevronLeft className="w-6 h-6 text-current" />
        </button>
        
        <div className="text-sm">
          <span className="font-medium">{currentPage}</span>
          <span> / </span>
          <span>{totalPages}</span>
        </div>
        
        <button 
          onClick={() => changePage('next')}
          disabled={currentPage >= totalPages}
          className={cn(
            "p-2 rounded-full",
            currentPage >= totalPages ? "opacity-30" : "opacity-100"
          )}
        >
          <ChevronRight className="w-6 h-6 text-current" />
        </button>
      </div>
      
      {/* 設定パネル */}
      <ReadingSettings 
        isOpen={showSettings} 
        onClose={() => setShowSettings(false)} 
      />
    </div>
  );
};

export default Reader;
