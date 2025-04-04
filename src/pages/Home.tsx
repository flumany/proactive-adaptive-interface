
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Search, Bell, BookOpen } from 'lucide-react';
import BooksSection from '@/components/BooksSection';
import { popularBooks, newReleases, recommendations, myBooks } from '@/data/books';
import { useKobo } from '@/contexts/KoboContext';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { currentTime } = useKobo();
  const [greeting, setGreeting] = useState('');
  const [continuedReading, setContinuedReading] = useState(false);

  // 時間帯に応じた挨拶を設定
  useEffect(() => {
    const hour = currentTime.getHours();
    
    if (hour >= 5 && hour < 12) {
      setGreeting('おはようございます');
    } else if (hour >= 12 && hour < 18) {
      setGreeting('こんにちは');
    } else {
      setGreeting('こんばんは');
    }

    // 前回の続きから読書を再開できることを通知
    if (myBooks.length > 0 && myBooks.some(book => book.progress && book.progress < 100)) {
      setTimeout(() => {
        setContinuedReading(true);
        toast({
          title: "読書を続ける",
          description: `「${myBooks[0].title}」の続きから読めます`,
          duration: 5000,
        });
      }, 1500);
    }
  }, [currentTime, toast]);

  const handleContinueReading = () => {
    // 進行中の本があれば、最初の一冊の読書ページに遷移
    const inProgressBook = myBooks.find(book => book.progress && book.progress < 100);
    if (inProgressBook) {
      navigate(`/reader/${inProgressBook.id}`);
    }
  };

  return (
    <div className="pb-20">
      {/* ヘッダー */}
      <header className="bg-white dark:bg-background sticky top-0 z-10 shadow-sm">
        <div className="flex justify-between items-center p-4">
          <div className="flex items-center">
            <span className="font-bold text-lg text-rakuten-crimson">楽天Kobo</span>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => navigate('/search')}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-muted"
            >
              <Search className="w-5 h-5" />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-muted">
              <Bell className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <main className="px-4">
        {/* 挨拶 */}
        <div className="my-6">
          <h1 className="text-2xl font-bold mb-1">{greeting}、読者さん</h1>
          <p className="text-muted-foreground text-sm">今日も素敵な本と出会いましょう</p>
        </div>

        {/* 前回の続きから読むカード */}
        {continuedReading && (
          <div className="bg-gradient-to-r from-rakuten-crimson to-rakuten-dark text-white rounded-lg p-4 mb-6 shadow-md">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium mb-1">前回の続きから</h3>
                <p className="text-sm text-white/80">{myBooks[0].title}</p>
                <p className="text-xs mt-1 text-white/70">
                  進捗: {myBooks[0].progress}%
                </p>
              </div>
              <button
                onClick={handleContinueReading}
                className="bg-white text-rakuten-crimson px-4 py-2 rounded-full text-sm font-medium flex items-center shadow-sm hover:bg-opacity-90"
              >
                <BookOpen className="w-4 h-4 mr-1" />
                続きを読む
              </button>
            </div>
          </div>
        )}

        {/* マイライブラリ */}
        {myBooks.length > 0 && (
          <BooksSection
            title="マイライブラリ"
            books={myBooks}
            viewAllPath="/library"
          />
        )}

        {/* 新着 */}
        <BooksSection
          title="新着"
          books={newReleases}
          viewAllPath="/new-releases"
        />

        {/* 人気の本 */}
        <BooksSection
          title="人気の本"
          books={popularBooks}
          viewAllPath="/popular"
        />

        {/* あなたへのおすすめ */}
        <BooksSection
          title="あなたへのおすすめ"
          books={recommendations}
          viewAllPath="/recommendations"
        />
      </main>
    </div>
  );
};

export default Home;
