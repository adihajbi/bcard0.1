import { Link } from "react-router-dom";
import { Card as CardInterface } from "../interfaces/Card";
import { getUser } from "../services/userService";
import { setLike } from "../services/cardsService";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

interface Props {
    card: CardInterface;
    onDelete?: (id: string) => void;
}

export default function Card({ card, onDelete }: Props) {
    const [userId, setUserId] = useState<string | null>(null);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const [isLiked, setIsLiked] = useState<boolean>(false);

    useEffect(() => {
        const user: any = getUser();
        if (user) {
            setUserId(user._id);
            setIsAdmin(user.isAdmin);
            if (card.likes && card.likes.includes(user._id)) {
                setIsLiked(true);
            }
        }
    }, [card.likes]);

    const handleLike = async () => {
        if (!userId) {
            toast.error("You must be logged in to like a card");
            return;
        }
        try {
            await setLike(card._id as string);
            setIsLiked(!isLiked);
        } catch (err) {
            toast.error("Failed to update like");
        }
    };

    return (
        <div className="card h-100 shadow-sm">
            <img
                src={card.image.url}
                className="card-img-top"
                alt={card.image.alt}
                style={{ height: "180px", objectFit: "cover" }}
            />

            <div className="card-body d-flex flex-column">
                <h5 className="card-title">{card.title}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{card.subtitle}</h6>
                <hr />
                <p className="card-text text-truncate">{card.description}</p>

                <p className="card-text small">
                    <strong>Phone:</strong> {card.phone}<br />
                    <strong>Address:</strong> {card.address.city}, {card.address.street} {card.address.houseNumber}
                </p>
                <p className="card-text small mb-4"><strong>Card Number:</strong> {card.bizNumber}</p>

                <div className="d-flex justify-content-between align-items-center mt-auto">
                    <div>
                        {userId && (
                            <button className="btn btn-link p-0 me-3 text-dark" onClick={handleLike}>
                                <i className={`bi ${isLiked ? "bi-heart-fill text-danger" : "bi-heart"}`}></i>
                            </button>
                        )}
                        <a href={`tel:${card.phone}`} className="btn btn-link p-0 text-dark">
                            <i className="bi bi-telephone-fill"></i>
                        </a>
                    </div>

                    {(userId === card.user_id || isAdmin) && (
                        <div>
                            <Link
                                to={`/edit/${card._id}`}
                                className="btn btn-link p-0 me-3 text-warning"
                            >
                                <i className="bi bi-pencil-fill"></i>
                            </Link>

                            <button
                                className="btn btn-link p-0 text-danger"
                                onClick={() => onDelete && onDelete(card._id as string)}
                            >
                                <i className="bi bi-trash-fill"></i>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}