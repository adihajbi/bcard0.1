import { useFormik } from "formik";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../services/userService";
import { toast } from "react-toastify";

export function RegisterPage() {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            first: "", middle: "", last: "", phone: "", email: "", password: "",
            url: "", alt: "", state: "", country: "", city: "", street: "", houseNumber: 0, zip: 0, isBusiness: false
        },
        validationSchema: yup.object({
            first: yup.string().required().min(2),
            last: yup.string().required().min(2),
            phone: yup.string().required().min(9).max(11),
            email: yup.string().email().required(),
            password: yup.string().required().min(8)
                .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*-]).{8,}$/, "Password must contain A-Z, a-z, 0-9 and !@#$%^&*-"),
            country: yup.string().required(),
            city: yup.string().required(),
            street: yup.string().required(),
            houseNumber: yup.number().required().min(1),
            zip: yup.number().required(),
            isBusiness: yup.boolean(),
        }),
        onSubmit: (values) => {
            const user = {
                name: { first: values.first, middle: values.middle, last: values.last },
                phone: values.phone,
                email: values.email,
                password: values.password,
                image: {
                    url: values.url || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
                    alt: values.alt || "Profile image"
                },
                address: { state: values.state, country: values.country, city: values.city, street: values.street, houseNumber: values.houseNumber, zip: values.zip },
                isBusiness: values.isBusiness
            };

            register(user)
                .then(() => {
                    toast.success("Registration successful! Please login.");
                    navigate("/login");
                })
                .catch((err) => {
                    console.log(err);
                    if (err.response?.data) {
                        toast.error(typeof err.response.data === 'string' ? err.response.data : "Registration failed");
                    } else {
                        toast.error("Registration failed");
                    }
                });
        },
    });

    return (
        <div className="container mt-5 mb-5">
            <h2 className="display-4 text-center">REGISTER</h2>
            <form onSubmit={formik.handleSubmit} className="w-75 mx-auto p-4 shadow-sm rounded border">

                <div className="row">
                    <div className="col-md-6 mb-3">
                        <div className="form-floating">
                            <input className="form-control" id="first" placeholder="First Name" {...formik.getFieldProps("first")} />
                            <label htmlFor="first">First Name *</label>
                            {formik.touched.first && formik.errors.first && <small className="text-danger">{formik.errors.first}</small>}
                        </div>
                    </div>
                    <div className="col-md-6 mb-3">
                        <div className="form-floating">
                            <input className="form-control" id="last" placeholder="Last Name" {...formik.getFieldProps("last")} />
                            <label htmlFor="last">Last Name *</label>
                            {formik.touched.last && formik.errors.last && <small className="text-danger">{formik.errors.last}</small>}
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6 mb-3">
                        <div className="form-floating">
                            <input className="form-control" type="email" id="email" placeholder="Email" {...formik.getFieldProps("email")} />
                            <label htmlFor="email">Email *</label>
                            {formik.touched.email && formik.errors.email && <small className="text-danger">{formik.errors.email}</small>}
                        </div>
                    </div>
                    <div className="col-md-6 mb-3">
                        <div className="form-floating">
                            <input className="form-control" type="password" id="password" placeholder="Password" {...formik.getFieldProps("password")} />
                            <label htmlFor="password">Password *</label>
                            {formik.touched.password && formik.errors.password && <small className="text-danger">{formik.errors.password}</small>}
                        </div>
                    </div>
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
                            <input className="form-control" type="url" id="url" placeholder="Image URL" {...formik.getFieldProps("url")} />
                            <label htmlFor="url">Image URL</label>
                        </div>
                    </div>
                </div>

                <div className="mb-3 form-floating">
                    <input className="form-control" id="country" placeholder="Country" {...formik.getFieldProps("country")} />
                    <label htmlFor="country">Country *</label>
                    {formik.touched.country && formik.errors.country && <small className="text-danger">{formik.errors.country}</small>}
                </div>
                <div className="mb-3 form-floating">
                    <input className="form-control" id="city" placeholder="City" {...formik.getFieldProps("city")} />
                    <label htmlFor="city">City *</label>
                    {formik.touched.city && formik.errors.city && <small className="text-danger">{formik.errors.city}</small>}
                </div>
                <div className="mb-3 form-floating">
                    <input className="form-control" id="street" placeholder="Street" {...formik.getFieldProps("street")} />
                    <label htmlFor="street">Street *</label>
                    {formik.touched.street && formik.errors.street && <small className="text-danger">{formik.errors.street}</small>}
                </div>

                <div className="row">
                    <div className="col-md-6 mb-3">
                        <div className="form-floating">
                            <input className="form-control" type="number" id="houseNumber" placeholder="Number" {...formik.getFieldProps("houseNumber")} />
                            <label htmlFor="houseNumber">House Number *</label>
                            {formik.touched.houseNumber && formik.errors.houseNumber && <small className="text-danger">{formik.errors.houseNumber}</small>}
                        </div>
                    </div>
                    <div className="col-md-6 mb-3">
                        <div className="form-floating">
                            <input className="form-control" type="number" id="zip" placeholder="Zip" {...formik.getFieldProps("zip")} />
                            <label htmlFor="zip">Zip *</label>
                        </div>
                    </div>
                </div>

                <div className="form-check mb-3">
                    <input className="form-check-input" type="checkbox" id="isBusiness" {...formik.getFieldProps("isBusiness")} />
                    <label className="form-check-label" htmlFor="isBusiness">Signup as business</label>
                </div>

                <button type="submit" className="btn btn-primary w-100">REGISTER</button>
                <div className="mt-3 text-center">
                    Already have an account? <Link to="/login">Login</Link>
                </div>
            </form>
        </div>
    );
}