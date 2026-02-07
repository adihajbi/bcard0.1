import { useEffect, useState } from "react";
import { Card as CardInterface } from "../interfaces/Card";
import Card from "../components/Card";
import { getCards } from "../services/cardsService";
import { useSearch } from "../SearchContext";

export function CardsPage() {
    const [cards, setCards] = useState<CardInterface[]>([]);
    const { search } = useSearch();

    useEffect(() => {
        getCards()
            .then((res) => setCards(res.data))
            .catch((err) => console.log(err));
    }, []);

    const filteredCards = cards.filter(card =>
        card.title.toLowerCase().includes(search.toLowerCase()) ||
        card.subtitle.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="container mt-4">
            <h1 className="display-4 mb-4">Cards Page</h1>
            <p className="lead mb-5">Here you can find business cards from all categories</p>

            {filteredCards.length === 0 ? (
                <div className="alert alert-warning">No cards found matching "{search}"</div>
            ) : (
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                    {filteredCards.map((card) => (
                        <div className="col" key={card._id}>
                            <Card card={card} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}