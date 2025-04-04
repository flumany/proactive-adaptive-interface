
import React, { useState } from 'react';
import { myBooks, categories } from '@/data/books';
import BookCard from '@/components/BookCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LayoutGrid, List, Filter, Check } from 'lucide-react';
import { useKobo } from '@/contexts/KoboContext';
import { cn } from '@/lib/utils';

const Library: React.FC = () => {
  const { viewMode, setViewMode } = useKobo();
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  // フィルター適用済みの本のリスト
  const filteredBooks = activeFilter 
    ? myBooks.filter(book => book.categories.some(cat => 
        cat.toLowerCase().includes(activeFilter.toLowerCase())
      )) 
    : myBooks;

  const toggleViewMode = () => {
    setViewMode(viewMode === 'grid' ? 'list' : 'grid');
  };

  return (
    <div className="pb-20">
      {/* ヘッダー */}
      <header className="bg-white dark:bg-background sticky top-0 z-10 shadow-sm">
        <div className="p-4">
          <h1 className="text-xl font-bold">マイライブラリ</h1>
        </div>
        
        {/* ツールバー */}
        <div className="flex items-center justify-between px-4 pb-2">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="bg-muted/50">
              <TabsTrigger value="all" className="flex-1">すべて</TabsTrigger>
              <TabsTrigger value="reading" className="flex-1">読書中</TabsTrigger>
              <TabsTrigger value="completed" className="flex-1">完読</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <div className="flex ml-2 space-x-1">
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className={cn(
                "p-2 rounded-md",
                activeFilter ? "text-rakuten-crimson bg-muted" : "text-muted-foreground"
              )}
            >
              <Filter className="w-5 h-5" />
            </button>
            <button 
              onClick={toggleViewMode}
              className="p-2 rounded-md text-muted-foreground"
            >
              {viewMode === 'grid' ? (
                <List className="w-5 h-5" />
              ) : (
                <LayoutGrid className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </header>

      <main className="px-4">
        {/* フィルターパネル */}
        {showFilters && (
          <div className="my-2 p-3 bg-card rounded-lg shadow-sm border animate-fade-in">
            <h3 className="text-sm font-medium mb-2">ジャンルでフィルター</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setActiveFilter(activeFilter === category.id ? null : category.id)}
                  className={cn(
                    "px-3 py-1 text-xs rounded-full flex items-center",
                    activeFilter === category.id 
                      ? "bg-rakuten-crimson text-white" 
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  {activeFilter === category.id && (
                    <Check className="w-3 h-3 mr-1" />
                  )}
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 本の一覧 */}
        <TabsContent value="all" className="mt-2">
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-3 gap-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {filteredBooks.map(book => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col">
              {filteredBooks.map(book => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          )}
          
          {filteredBooks.length === 0 && (
            <div className="py-16 text-center text-muted-foreground">
              <p>該当する本が見つかりませんでした</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="reading" className="mt-2">
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-3 gap-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {filteredBooks
                .filter(book => book.progress !== undefined && book.progress < 100)
                .map(book => (
                  <BookCard key={book.id} book={book} />
                ))
              }
            </div>
          ) : (
            <div className="flex flex-col">
              {filteredBooks
                .filter(book => book.progress !== undefined && book.progress < 100)
                .map(book => (
                  <BookCard key={book.id} book={book} />
                ))
              }
            </div>
          )}
          
          {filteredBooks.filter(book => book.progress !== undefined && book.progress < 100).length === 0 && (
            <div className="py-16 text-center text-muted-foreground">
              <p>読書中の本がありません</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="completed" className="mt-2">
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-3 gap-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {filteredBooks
                .filter(book => book.progress === 100)
                .map(book => (
                  <BookCard key={book.id} book={book} />
                ))
              }
            </div>
          ) : (
            <div className="flex flex-col">
              {filteredBooks
                .filter(book => book.progress === 100)
                .map(book => (
                  <BookCard key={book.id} book={book} />
                ))
              }
            </div>
          )}
          
          {filteredBooks.filter(book => book.progress === 100).length === 0 && (
            <div className="py-16 text-center text-muted-foreground">
              <p>完読した本がありません</p>
            </div>
          )}
        </TabsContent>
      </main>
    </div>
  );
};

export default Library;
