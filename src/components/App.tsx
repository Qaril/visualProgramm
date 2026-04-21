import { useEffect, useState } from 'react';
import { BookCard } from './BookCard';
import type { BookWithCover, mybookCard } from '../types/bookCard';
import './App.css';

function App() {
    const [books, setBooks] = useState<BookWithCover[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                const res = await fetch('https://openlibrary.org/search.json?q=russia&language=rus&limit=20');
                const data = await res.json();

                const formattedBooks: mybookCard[] = data.docs
                    .filter((b: any) => b.cover_i)
                    .map((b: any) => ({
                        id: b.cover_i,
                        title: b.title,
                        authors: b.author_name || ['Автор неизвестен'],
                        isbn: b.isbn ? b.isbn[0] : ''
                    }));

                setBooks(formattedBooks.map(b => ({ ...b, coverBlob: null })));

                for (const book of formattedBooks) {
                    try {
                        const coverUrl = `https://covers.openlibrary.org/b/id/${book.id}-L.jpg`;
                        const imgRes = await fetch(coverUrl);
                        const blob = await imgRes.blob();

                        setBooks(prev => prev.map(item =>
                            item.id === book.id ? { ...item, coverBlob: blob } : item
                        ));
                    } catch (err) {
                        console.error(err);
                    }
                }

            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    return (
        <div className="app-wrapper">
            <h1 className="main-title">ЭТО МОЯ БИБЛИОТЕКА</h1>

            {loading ? (
                <div className="loading-container">
                    <p className="loading">Загрузка данных...</p>
                </div>
            ) : (
                <div className="book-grid">
                    {books.map((book) => (
                        <BookCard
                            key={book.id}
                            title={book.title}
                            authors={book.authors}
                            coverImage={book.coverBlob}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export { App };