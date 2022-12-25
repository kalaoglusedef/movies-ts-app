import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Card } from "react-bootstrap";
import { ArrowLeft } from "react-feather";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import {
  CardBody,
  CardText,
  CardTitle,
  FormFeedback,
  Input,
  Label,
  Form,
} from "reactstrap";
import * as yup from "yup";

interface FormData {
  email: string;
}

const schema = yup.object().shape({
  email: yup
    .string()
    .email("It should be of e-mail type.")
    .required("The e-mail field is required."),
});

function ForgotPassword() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  function onSubmit(data: any) {}
  return (
    <div className="signInContainer px-2">
      <div className="cardContainer my-2">
        <Card
          style={{ backgroundColor: "rgb(31 31 31 / 90%)" }}
          className="mb-0"
        >
          <CardBody>
            <Link
              style={{ textDecoration: "none" }}
              className="text-danger"
              to="/signIn"
            >
              <ArrowLeft size={14} />
              <small className="">Login</small>
            </Link>
            <CardTitle tag="h4" className="mb-2 mt-4 text-light">
            Forgot your password?🕵🏻‍♀️
            </CardTitle>
            <CardText className="text-light mb-0">
            Please enter your e-mail address.
            </CardText>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-2">
                <Label className="form-label" for="email">
                  E-mail
                </Label>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => {
                    return (
                      <Input
                        {...field}
                        type="email"
                        id="email"
                        placeholder="john@example.com"
                        autoFocus
                        invalid={errors.email && true}
                      />
                    );
                  }}
                />
                {errors.email && (
                  <FormFeedback>
                    {errors.email.message?.toString()}
                  </FormFeedback>
                )}
              </div>

              <Button variant="danger" type="submit" className="mt-2 mb-2">
                Send
              </Button>
            </Form>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

export default ForgotPassword;
