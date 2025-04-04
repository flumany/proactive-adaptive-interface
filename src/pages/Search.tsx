
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search as SearchIcon, X, ArrowLeft, Bookmark, TrendingUp } from 'lucide-react';
import { Input } from '@/components/ui/input';
import BookCard from '@/components/BookCard';
import { popularBooks, newReleases, recommendations, categories } from '@/data/books';
import { cn } from '@/lib/utils';

const Search: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [searchResults, setSearchResults] = useState<typeof popularBooks>([]);
  const [isSearching, setIsSearching] = useState(false);
  
  // 検索履歴をローカルストレージから読み込む
  useEffect(() => {
    const savedHistory = localStorage.getItem('kobo-search-history');
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory));
    }
  }, []);
  
  // 検索実行
  const handleSearch = (query: string = searchQuery) => {
    setIsSearching(true);
    setSearchQuery(query);
    
    if (query.trim() === '') {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }
    
    // 検索履歴に追加（重複なし、最大10件）
    if (!searchHistory.includes(query) && query.trim() !== '') {
      const newHistory = [query, ...searchHistory].slice(0, 10);
      setSearchHistory(newHistory);
      localStorage.setItem('kobo-search-history', JSON.stringify(newHistory));
    }
    
    // 検索処理（実際はAPIリクエストになるがモックデータで代用）
    setTimeout(() => {
      const results = [...popularBooks, ...newReleases, ...recommendations].filter(book => 
        book.title.toLowerCase().includes(query.toLowerCase()) || 
        book.author.toLowerCase().includes(query.toLowerCase()) ||
        book.categories.some(cat => cat.toLowerCase().includes(query.toLowerCase()))
      );
      setSearchResults(results);
      setIsSearching(false);
    }, 500); // 検索の遅延をシミュレート
  };
  
  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
  };
  
  const clearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem('kobo-search-history');
  };
  
  return (
    <div className="pb-20">
      {/* 検索ヘッダー */}
      <header className="bg-white dark:bg-background sticky top-0 z-10 shadow-sm p-4">
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => navigate(-1)}
            className="text-muted-foreground"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="タイトル、著者、キーワード"
              className="pl-9 pr-8"
            />
            {searchQuery && (
              <button 
                onClick={clearSearch} 
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="px-4">
        {isSearching ? (
          // 検索中ローディング
          <div className="py-8 flex flex-col items-center">
            <div className="w-8 h-8 border-2 border-rakuten-crimson border-t-transparent rounded-full animate-spin mb-2" />
            <p className="text-sm text-muted-foreground">検索中...</p>
          </div>
        ) : searchResults.length > 0 ? (
          // 検索結果
          <div className="mt-4">
            <h2 className="text-lg font-bold mb-3">検索結果: {searchResults.length}件</h2>
            <div className="grid grid-cols-3 gap-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {searchResults.map(book => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          </div>
        ) : (
          // 検索前の初期表示
          <>
            {/* 検索履歴 */}
            {searchHistory.length > 0 && (
              <div className="mt-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium">最近の検索</h3>
                  <button 
                    onClick={clearHistory}
                    className="text-xs text-rakuten-crimson"
                  >
                    履歴を削除
                  </button>
                </div>
                <div className="space-y-2">
                  {searchHistory.map((query, index) => (
                    <div 
                      key={index}
                      onClick={() => handleSearch(query)}
                      className="flex items-center p-2 hover:bg-muted rounded-md cursor-pointer"
                    >
                      <SearchIcon className="w-4 h-4 text-muted-foreground mr-2" />
                      <span>{query}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* 人気のカテゴリ */}
            <div className="mt-6">
              <h3 className="text-sm font-medium mb-2">人気のカテゴリ</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => handleSearch(category.name)}
                    className="flex items-center px-3 py-2 bg-muted rounded-lg text-sm hover:bg-muted/80"
                  >
                    <Bookmark className="w-4 h-4 mr-2 text-rakuten-crimson" />
                    <span>{category.name}</span>
                  </button>
                ))}
              </div>
            </div>
            
            {/* トレンド */}
            <div className="mt-6">
              <h3 className="text-sm font-medium mb-2">トレンド</h3>
              <div className="space-y-2">
                {["2023年本屋大賞", "鬼滅の刃", "推し、燃ゆ", "Python入門", "ハリーポッター"].map((trend, index) => (
                  <div 
                    key={index}
                    onClick={() => handleSearch(trend)}
                    className="flex items-center p-2 hover:bg-muted rounded-md cursor-pointer"
                  >
                    <TrendingUp className="w-4 h-4 text-muted-foreground mr-2" />
                    <span>{trend}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Search;
