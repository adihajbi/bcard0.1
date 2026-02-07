import { useEffect, useState } from "react";
import { Card as CardInterface } from "../interfaces/Card";
import Card from "../components/Card";
import { getMyCards } from "../services/cardsService";
import { toast } from "react-toastify";

export function MyCardsPage() {
    const [cards, setCards] = useState<CardInterface[]>([]);

    useEffect(() => {
        getMyCards()
            .then((res) => setCards(res.data))
            .catch((err) => {
                console.log(err);
                toast.error("Failed to fetch your cards");
            });
    }, []);

    return (
        <div className="container mt-4">
            <h1 className="display-4 mb-4">My Cards</h1>
            <p className="lead mb-5">Here you can view, edit and delete your cards</p>

            {cards.length === 0 ? (
                <div className="alert alert-info">
                    You haven't created any cards yet. <a href="/create-card">Create one now!</a>
                </div>
            ) : (
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                    {cards.map((card) => (
                        <div className="col" key={card._id}>
                            <Card card={card} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}