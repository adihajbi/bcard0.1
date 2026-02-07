import { useEffect, useState } from "react";
import { Card as CardInterface } from "../interfaces/Card";
import Card from "../components/Card";
import { getCards } from "../services/cardsService";
import { getUser } from "../services/userService";
import { toast } from "react-toastify";

export function FavoriteCardsPage() {
    const [cards, setCards] = useState<CardInterface[]>([]);

    useEffect(() => {
        const user: any = getUser();

        if (!user) {
            toast.error("Please login to view favorite cards");
            return;
        }

        getCards()
            .then((res) => {
                const favCards = res.data.filter((card: CardInterface) =>
                    card.likes?.includes(user._id)
                );
                setCards(favCards);
            })
            .catch((err) => {
                toast.error("Failed to load cards");
            });
    }, []);

    return (
        <div className="container mt-4">
            <h1 className="display-4 mb-4">Favorite Cards</h1>
            <p className="lead mb-5">Here are all the cards you liked</p>

            {cards.length === 0 ? (
                <div className="alert alert-info">
                    You haven't liked any cards yet. Go to the <a href="/">Home Page</a> and click the heart icon!
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