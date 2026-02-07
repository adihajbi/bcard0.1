import { useFormik } from "formik";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/userService";
import { toast } from "react-toastify";

export function LoginPage() {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: yup.object({
            email: yup.string().email("Invalid email address").required("Email is required"),
            password: yup.string().required("Password is required"),
        }),
        onSubmit: (values) => {
            login(values)
                .then((res) => {
                    localStorage.setItem("token", res.data);

                    toast.success("Login successful!");

                    navigate("/");

                    window.location.reload();
                })
                .catch((err) => {
                    console.log(err);
                    toast.error("Login failed. Please check your email and password.");
                });
        },
    });

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-4">
                    <div className="card shadow-lg border-0 rounded-lg mt-5">
                        <div className="card-header bg-primary text-white text-center">
                            <h3 className="font-weight-light my-2">Login</h3>
                        </div>
                        <div className="card-body">
                            <form onSubmit={formik.handleSubmit}>
                                <div className="form-floating mb-3">
                                    <input
                                        className="form-control"
                                        id="email"
                                        type="email"
                                        placeholder="name@example.com"
                                        {...formik.getFieldProps("email")}
                                    />
                                    <label htmlFor="email">Email address</label>
                                    {formik.touched.email && formik.errors.email && (
                                        <div className="text-danger small">{formik.errors.email}</div>
                                    )}
                                </div>
                                <div className="form-floating mb-3">
                                    <input
                                        className="form-control"
                                        id="password"
                                        type="password"
                                        placeholder="Password"
                                        {...formik.getFieldProps("password")}
                                    />
                                    <label htmlFor="password">Password</label>
                                    {formik.touched.password && formik.errors.password && (
                                        <div className="text-danger small">{formik.errors.password}</div>
                                    )}
                                </div>
                                <div className="d-grid gap-2 mt-4">
                                    <button
                                        type="submit"
                                        className="btn btn-primary btn-lg"
                                        disabled={!formik.isValid || !formik.dirty}
                                    >
                                        Login
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div className="card-footer text-center py-3">
                            <div className="small">
                                <Link to="/register">Need an account? Sign up!</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}