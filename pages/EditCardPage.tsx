import { useFormik } from "formik";
import * as yup from "yup";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCard, editCard } from "../services/cardsService";
import { toast } from "react-toastify";

export function EditCardPage() {
    const navigate = useNavigate();
    const { id } = useParams(); 
    const [initialValues, setInitialValues] = useState(null);

    useEffect(() => {
        if (!id) return;

        getCard(id)
            .then((res) => {
                const card = res.data;
                const formValues = {
                    title: card.title,
                    subtitle: card.subtitle,
                    description: card.description,
                    phone: card.phone,
                    email: card.email,
                    web: card.web,
                    url: card.image.url,
                    alt: card.image.alt,
                    state: card.address.state,
                    country: card.address.country,
                    city: card.address.city,
                    street: card.address.street,
                    houseNumber: card.address.houseNumber,
                    zip: card.address.zip,
                };
                setInitialValues(formValues as any);
            })
            .catch((err) => {
                toast.error("Failed to load card data");
                navigate("/my-cards");
            });
    }, [id, navigate]);

    const formik = useFormik({
        initialValues: initialValues || {
            title: "", subtitle: "", description: "", phone: "", email: "", web: "",
            url: "", alt: "", state: "", country: "", city: "", street: "", houseNumber: 0, zip: 0,
        },
        enableReinitialize: true, 
        validationSchema: yup.object({
            title: yup.string().min(2).max(256).required(),
            subtitle: yup.string().min(2).max(256).required(),
            description: yup.string().min(2).max(1024).required(),
            phone: yup.string().min(9).max(11).required(),
            email: yup.string().email().min(5).required(),
            web: yup.string().min(14).url(),
            url: yup.string().min(14).url(),
            alt: yup.string().min(2).max(256),
            state: yup.string(),
            country: yup.string().required(),
            city: yup.string().required(),
            street: yup.string().required(),
            houseNumber: yup.number().required().min(1),
            zip: yup.number().required(),
        }),
        onSubmit: (values) => {
            const body = {
                title: values.title,
                subtitle: values.subtitle,
                description: values.description,
                phone: values.phone,
                email: values.email,
                web: values.web,
                image: { url: values.url, alt: values.alt },
                address: {
                    state: values.state,
                    country: values.country,
                    city: values.city,
                    street: values.street,
                    houseNumber: values.houseNumber,
                    zip: values.zip,
                },
            };

            if (id) {
                editCard(id, body)
                    .then(() => {
                        toast.success("Card updated successfully!");
                        navigate("/my-cards");
                    })
                    .catch((err) => toast.error("Failed to update card"));
            }
        },
    });

    if (!initialValues) return <div className="text-center mt-5">Loading...</div>;

    return (
        <div className="container mt-5 mb-5">
            <h2 className="display-4 text-center mb-4">Edit Card</h2>
            <form onSubmit={formik.handleSubmit} className="p-4 shadow rounded border">

                <div className="row mb-3">
                    <div className="col-md-6">
                        <div className="form-floating">
                            <input className="form-control" id="title" placeholder="Title" {...formik.getFieldProps("title")} />
                            <label htmlFor="title">Title</label>
                            {formik.touched.title && formik.errors.title && <p className="text-danger small">{formik.errors.title}</p>}
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-floating">
                            <input className="form-control" id="subtitle" placeholder="Subtitle" {...formik.getFieldProps("subtitle")} />
                            <label htmlFor="subtitle">Subtitle</label>
                        </div>
                    </div>
                </div>

                <div className="form-floating mb-3">
                    <input className="form-control" id="description" placeholder="Description" {...formik.getFieldProps("description")} />
                    <label htmlFor="description">Description</label>
                </div>

                <div className="row mb-3">
                    <div className="col-md-6">
                        <div className="form-floating">
                            <input className="form-control" id="phone" placeholder="Phone" {...formik.getFieldProps("phone")} />
                            <label htmlFor="phone">Phone</label>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-floating">
                            <input className="form-control" id="email" type="email" placeholder="Email" {...formik.getFieldProps("email")} />
                            <label htmlFor="email">Email</label>
                        </div>
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-md-6">
                        <div className="form-floating">
                            <input className="form-control" id="web" placeholder="Web URL" {...formik.getFieldProps("web")} />
                            <label htmlFor="web">Website URL</label>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-floating">
                            <input className="form-control" id="url" placeholder="Image URL" {...formik.getFieldProps("url")} />
                            <label htmlFor="url">Image URL</label>
                        </div>
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-md-6">
                        <div className="form-floating">
                            <input className="form-control" id="country" placeholder="Country" {...formik.getFieldProps("country")} />
                            <label htmlFor="country">Country</label>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-floating">
                            <input className="form-control" id="city" placeholder="City" {...formik.getFieldProps("city")} />
                            <label htmlFor="city">City</label>
                        </div>
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-md-6">
                        <div className="form-floating">
                            <input className="form-control" id="street" placeholder="Street" {...formik.getFieldProps("street")} />
                            <label htmlFor="street">Street</label>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="form-floating">
                            <input className="form-control" type="number" id="houseNumber" placeholder="Number" {...formik.getFieldProps("houseNumber")} />
                            <label htmlFor="houseNumber">Number</label>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="form-floating">
                            <input className="form-control" type="number" id="zip" placeholder="Zip" {...formik.getFieldProps("zip")} />
                            <label htmlFor="zip">Zip</label>
                        </div>
                    </div>
                </div>

                <div className="d-flex gap-2">
                    <button type="button" className="btn btn-secondary w-50" onClick={() => navigate("/my-cards")}>Cancel</button>
                    <button type="submit" className="btn btn-success w-50" disabled={!formik.isValid}>Update Card</button>
                </div>
            </form>
        </div>
    );
}