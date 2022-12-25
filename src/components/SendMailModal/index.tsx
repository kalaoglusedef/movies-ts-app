import { FC, useRef, useState } from "react";
import * as yup from "yup";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-feather";
import "./index.css";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "reactstrap";
import emailjs from "@emailjs/browser";
import Movie from "../../models/Movie";
interface FormData {
  email: string;
}

interface ISendMailModalProps {
  movie: Movie;
}

const schema = yup.object().shape({
  email: yup
    .string()
    .email("E-mail must be a valid email.")
    .required("The e-mail field is required."),
});
const SendMailModal: FC<ISendMailModalProps> = ({ movie }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ mode: "onChange", resolver: yupResolver(schema) });
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const form = useRef<any>();
  function onSubmit(data: FormData) {
    emailjs
      .send(
        "service_ym4rwif",
        "template_uqz9nkj",
        {
          url: window.location.href,
          email: data.email,
        },
        "Z-ILR4-QCMPDYXTaG"
      )
      .then(
        (result) => {
          console.log(result.text);
          setShow(false);
        },
        (error) => {
          console.log(error.text);
        }
      );
  }

  return (
    <>
      <Button className="shareButton" onClick={handleShow}>
        <Link size={20} color="#bd050e" />
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Send Mail</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form ref={form} onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className=" mb-2">
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
                      defaultValue=""
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
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            style={{ backgroundColor: "#bd050e", border: "none" }}
            onClick={handleSubmit(onSubmit)}
          >
            Send
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SendMailModal;
