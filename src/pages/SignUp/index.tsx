import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { Form, Button, Card } from "react-bootstrap";
import { yupResolver } from "@hookform/resolvers/yup";
import { CardBody, CardTitle, Input } from "reactstrap";
import { Link } from "react-router-dom";
import { useState } from "react";

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
}

const schema = yup.object().shape({
  email: yup
    .string()
    .email("It must be in e-mail format!")
    .required("Email field is required!"),
  password: yup
    .string()
    .required("Password field is required!")

    .min(8, "Password must be at least 8 characters!"),
  confirmPassword: yup
    .string()
    .required("Password repetition is required!")
    .oneOf([yup.ref("password"), null], "The password you entered must be the same!"),
});

function SignUp() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ mode: "onChange", resolver: yupResolver(schema) });

  const [submitting, setSubmitting] = useState(false);

  function onSubmit(data: FormData) {
    setSubmitting(true);
    setSubmitting(false);
  }

  return (
    <div className="signInContainer px-2">
      <div className="cardContainer my-2">
        <Card
          style={{ backgroundColor: "rgb(31 31 31 / 90%)" }}
          className="mb-0"
        >
          <CardBody>
            <CardTitle tag="h4" className="mb-5 mt-4 text-light">
            Create Account 👤
            </CardTitle>

            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group className=" text-light mb-2">
                <Form.Label>E-mail</Form.Label>
                <Controller
                  name="email"
                  defaultValue=""
                  control={control}
                  render={({ field }) => {
                    return (
                      <Input
                        {...field}
                        innerRef={register("email").ref}
                        type="email"
                        defaultValue="kalaoglusedef@gmail.com"
                        id="login-email"
                        placeholder="john@example.com"
                        autoFocus
                        invalid={errors.email && true}
                      />
                    );
                  }}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email?.message}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-2 text-light ">
                <Form.Label>Password</Form.Label>
                <Controller
                  name="password"
                  defaultValue=""
                  control={control}
                  render={({ field }) => {
                    return (
                      <Input
                        {...field}
                        type="password"
                        innerRef={register("password").ref}
                        id="password"
                        placeholder="Password"
                        autoFocus
                        invalid={errors.password && true}
                      />
                    );
                  }}
                />

                <Form.Control.Feedback type="invalid">
                  {errors.password?.message}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group  className="text-light ">
                <Form.Label>Confirm</Form.Label>
                <Controller
                  name="confirmPassword"
                  defaultValue=""
                  control={control}
                  render={({ field }) => {
                    return (
                      <Input
                        {...field}
                        type="password"
                        innerRef={register("confirmPassword").ref}
                        id="confirmPassword"
                        placeholder="Confirm"
                        autoFocus
                        invalid={errors.confirmPassword && true}
                      />
                    );
                  }}
                />

                <Form.Control.Feedback type="invalid">
                  {errors.confirmPassword?.message}
                </Form.Control.Feedback>
              </Form.Group>
              <Button
                variant="danger"
                className=" mt-4 text-light"
                type="submit"
              >
                Sign up
              </Button>
              <div className="mt-4 notMemberLink">
                <Form.Label className="text-muted ">
                Do you have an account?
                </Form.Label>
                <Link
                  style={{ textDecoration: "none" }}
                  className="text-warning"
                  to="/signIn"
                >
                  <span>Login</span>
                </Link>
              </div>
            </Form>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

export default SignUp;
