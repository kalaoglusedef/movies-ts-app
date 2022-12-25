import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { Form, Button, Card } from "react-bootstrap";
import { yupResolver } from "@hookform/resolvers/yup";
import { CardBody, CardTitle, Input } from "reactstrap";
import "./index.css";
import { Link } from "react-router-dom";

interface FormData {
  email: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup.string().email().required("The e-mail field is required."),
  password: yup
    .string()
    .required("Password field is required.")
    .min(8, "Password must be a minimum of 8 characters."),
});

function SignIn() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ mode: "onChange", resolver: yupResolver(schema) });

  function onSubmit(data: FormData) {
    console.log(data);
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
              Welcome! ✨
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
              <Form.Group className=" text-light ">
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
                <Link
                  className="forgotPassword mt-2 text-muted"
                  to="/forgotPassword"
                >
                  <small>I forgot my password</small>
                </Link>
              </Form.Group>
              {/* TODO: */}
              <Link to="/">
                <Button
                  variant="danger"
                  className=" mb-2 mt-4 text-light"
                  type="submit"
                >
                  Login
                </Button>
              </Link>

              <div className="mt-4 notMemberLink">
                <Form.Label className="text-muted ">
                  Don't have an account?
                </Form.Label>
                <Link
                  style={{ textDecoration: "none" }}
                  className="text-warning"
                  to="/signUp"
                >
                  <span>Sign up</span>
                </Link>
              </div>
            </Form>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

export default SignIn;
