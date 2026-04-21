import React, { useEffect, useState } from 'react';


interface BookCardProps {
    title: string;
    authors: string[];
    coverImage: Blob | null;
}

const BookCard: React.FC<BookCardProps> = (props) => {
    const [imageUrl, setImageUrl] = useState<string>('');

    useEffect(() => {
        if (props.coverImage) {
            const objectUrl = URL.createObjectURL(props.coverImage);
            setImageUrl(objectUrl);

            return () => URL.revokeObjectURL(objectUrl);
        }
    }, [props.coverImage]);

    return (
        <div className="book-card">
            <div className="book-cover">
                {imageUrl ? (
                    <img src={imageUrl} alt={props.title} />
                ) : (
                    <div className="placeholder">Загрузка...</div>
                )}
            </div>
            {}
            <h3 className="book-title">{props.title}</h3>
            {}
            <p className="book-authors">{props.authors?.join(', ')}</p>
        </div>
    );
};

export { BookCard };