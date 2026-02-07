import { useEffect, useState } from "react";
import { getAllUsers, deleteUser, getUser } from "../services/userService";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";

export function SandboxPage() {
    const [users, setUsers] = useState<any[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const currentUser: any = getUser();
        if (currentUser && currentUser.isAdmin) {
            getAllUsers()
                .then((res) => {
                    setUsers(res.data);
                    setIsLoaded(true);
                })
                .catch((err) => {
                    console.log(err);
                    setIsLoaded(true);
                });
        } else {
            setIsLoaded(true);
        }
    }, []);

    const currentUser: any = getUser();
    if (!currentUser || !currentUser.isAdmin) {
        return <Navigate to="/" />;
    }

    if (!isLoaded) return <div className="container mt-5">Loading...</div>;

    const handleDeleteUser = (id: string) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            deleteUser(id)
                .then(() => {
                    toast.success("User deleted successfully");
                    setUsers(users.filter(user => user._id !== id));
                })
                .catch(() => toast.error("Failed to delete user"));
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="display-4 mb-4">Admin Sandbox</h1>
            <table className="table table-hover shadow-sm border">
                <thead className="table-dark">
                    <tr>
                        <th>No.</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Type</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={user._id}>
                            <td>{index + 1}</td>
                            <td>{user.name.first} {user.name.last}</td>
                            <td>{user.email}</td>
                            <td>
                                {user.isAdmin ? "Admin" : user.isBusiness ? "Business" : "Regular"}
                            </td>
                            <td>
                                {!user.isAdmin && (
                                    <button className="btn btn-danger btn-sm" onClick={() => handleDeleteUser(user._id)}>
                                        Delete
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}