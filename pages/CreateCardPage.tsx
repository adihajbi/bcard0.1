import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { createCard } from "../services/cardsService";
import { toast } from "react-toastify";

export function CreateCardPage() {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            title: "",
            subtitle: "",
            description: "",
            phone: "",
            email: "",
            web: "",
            url: "",
            alt: "",
            state: "",
            country: "",
            city: "",
            street: "",
            houseNumber: "",
            zip: "",
        },
        validationSchema: yup.object({
            title: yup.string().min(2).max(256).required("Title is required"),
            subtitle: yup.string().min(2).max(256).required("Subtitle is required"),
            description: yup.string().min(2).max(1024).required("Description is required"),
            phone: yup.string().min(9).max(11).required("Phone is required"),
            email: yup.string().email("Invalid email").min(5).required("Email is required"),
            web: yup.string().min(14).url("Invalid URL (must start with http)"), 
            url: yup.string().min(14).url("Invalid URL").required("Image URL is required"),
            alt: yup.string().min(2).max(256).required("Image Alt is required"),
            state: yup.string(),
            country: yup.string().min(2).required("Country is required"),
            city: yup.string().min(2).required("City is required"),
            street: yup.string().min(2).required("Street is required"),
            houseNumber: yup.number().required().min(1),
            zip: yup.number().required(),
        }),
        onSubmit: (values) => {
            const card = {
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
                    houseNumber: Number(values.houseNumber),
                    zip: Number(values.zip),
                },
            };

            createCard(card)
                .then(() => {
                    toast.success("Card created successfully!");
                    navigate("/my-cards"); 
                })
                .catch((err) => {
                    console.log(err);
                    toast.error("Failed to create card. Try again.");
                });
        },
    });

    return (
        <div className="container mt-4 mb-5">
            <h2 className="display-4 text-center mb-4">Add New Business Card</h2>
            <form onSubmit={formik.handleSubmit} className="w-75 mx-auto p-4 shadow-sm border rounded">

                <div className="form-floating mb-3">
                    <input className="form-control" type="text" id="title" placeholder="Title" {...formik.getFieldProps("title")} />
                    <label htmlFor="title">Title *</label>
                    {formik.touched.title && formik.errors.title && <small className="text-danger">{formik.errors.title}</small>}
                </div>

                <div className="form-floating mb-3">
                    <input className="form-control" type="text" id="subtitle" placeholder="Subtitle" {...formik.getFieldProps("subtitle")} />
                    <label htmlFor="subtitle">Subtitle *</label>
                    {formik.touched.subtitle && formik.errors.subtitle && <small className="text-danger">{formik.errors.subtitle}</small>}
                </div>

                <div className="form-floating mb-3">
                    <input className="form-control" type="text" id="description" placeholder="Description" {...formik.getFieldProps("description")} />
                    <label htmlFor="description">Description *</label>
                    {formik.touched.description && formik.errors.description && <small className="text-danger">{formik.errors.description}</small>}
                </div>

                <div className="row">
                    <div className="col-md-6 mb-3">
                        <div className="form-floating">
                            <input className="form-control" type="tel" id="phone" placeholder="Phone" {...formik.getFieldProps("phone")} />
                            <label htmlFor="phone">Phone *</label>
                            {formik.touched.phone && formik.errors.phone && <small className="text-danger">{formik.errors.phone}</small>}
                        </div>
                    </div>
                    <div className="col-md-6 mb-3">
                        <div className="form-floating">
                            <input className="form-control" type="email" id="email" placeholder="Email" {...formik.getFieldProps("email")} />
                            <label htmlFor="email">Email *</label>
                            {formik.touched.email && formik.errors.email && <small className="text-danger">{formik.errors.email}</small>}
                        </div>
                    </div>
                </div>

                <div className="form-floating mb-3">
                    <input className="form-control" type="url" id="web" placeholder="Website URL" {...formik.getFieldProps("web")} />
                    <label htmlFor="web">Website URL</label>
                    {formik.touched.web && formik.errors.web && <small className="text-danger">{formik.errors.web}</small>}
                </div>

                <h5 className="mt-3">Image</h5>
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <div className="form-floating">
                            <input className="form-control" type="url" id="url" placeholder="Image URL" {...formik.getFieldProps("url")} />
                            <label htmlFor="url">Image URL *</label>
                            {formik.touched.url && formik.errors.url && <small className="text-danger">{formik.errors.url}</small>}
                        </div>
                    </div>
                    <div className="col-md-6 mb-3">
                        <div className="form-floating">
                            <input className="form-control" type="text" id="alt" placeholder="Image Alt" {...formik.getFieldProps("alt")} />
                            <label htmlFor="alt">Image Alt *</label>
                            {formik.touched.alt && formik.errors.alt && <small className="text-danger">{formik.errors.alt}</small>}
                        </div>
                    </div>
                </div>

                <h5 className="mt-3">Address</h5>
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <input className="form-control" type="text" placeholder="State" {...formik.getFieldProps("state")} />
                    </div>
                    <div className="col-md-6 mb-3">
                        <input className="form-control" type="text" placeholder="Country *" {...formik.getFieldProps("country")} />
                        {formik.touched.country && formik.errors.country && <small className="text-danger">{formik.errors.country}</small>}
                    </div>
                    <div className="col-md-6 mb-3">
                        <input className="form-control" type="text" placeholder="City *" {...formik.getFieldProps("city")} />
                        {formik.touched.city && formik.errors.city && <small className="text-danger">{formik.errors.city}</small>}
                    </div>
                    <div className="col-md-6 mb-3">
                        <input className="form-control" type="text" placeholder="Street *" {...formik.getFieldProps("street")} />
                        {formik.touched.street && formik.errors.street && <small className="text-danger">{formik.errors.street}</small>}
                    </div>
                    <div className="col-md-6 mb-3">
                        <input className="form-control" type="number" placeholder="House Number *" {...formik.getFieldProps("houseNumber")} />
                        {formik.touched.houseNumber && formik.errors.houseNumber && <small className="text-danger">{formik.errors.houseNumber}</small>}
                    </div>
                    <div className="col-md-6 mb-3">
                        <input className="form-control" type="number" placeholder="Zip *" {...formik.getFieldProps("zip")} />
                        {formik.touched.zip && formik.errors.zip && <small className="text-danger">{formik.errors.zip}</small>}
                    </div>
                </div>

                <div className="d-flex justify-content-between mt-4">
                    <button
                        type="button"
                        onClick={() => navigate("/my-cards")}
                        className="btn btn-secondary"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="btn btn-primary px-5"
                        disabled={!formik.isValid || !formik.dirty}
                    >
                        Create Card
                    </button>
                </div>
            </form>
        </div>
    );
}