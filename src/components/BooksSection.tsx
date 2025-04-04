
import React from 'react';
import { Book } from '../data/books';
import BookCard from './BookCard';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useKobo } from '@/contexts/KoboContext';

interface BooksSectionProps {
  title: string;
  books: Book[];
  showViewAll?: boolean;
  viewAllPath?: string;
  className?: string;
}

const BooksSection: React.FC<BooksSectionProps> = ({
  title,
  books,
  showViewAll = true,
  viewAllPath = '/',
  className = '',
}) => {
  const { viewMode } = useKobo();

  return (
    <section className={`mb-8 ${className}`}>
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-bold">{title}</h2>
        {showViewAll && (
          <Link
            to={viewAllPath}
            className="text-rakuten-crimson text-sm flex items-center"
          >
            すべて見る
            <ChevronRight className="w-4 h-4" />
          </Link>
        )}
      </div>

      {viewMode === 'grid' ? (
        <div className="grid grid-cols-3 gap-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </section>
  );
};

export default BooksSection;
