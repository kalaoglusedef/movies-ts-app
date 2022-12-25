import React, { useState } from "react";
import * as yup from "yup";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { Link, MessageCircle } from "react-feather";
import "./index.css";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "reactstrap";
import Movie from "../../models/Movie";
import { addComment } from "../../helpers/localStorage";


interface AddCommentModalProps {
  movie: Movie;
}

interface FormData {
  comment:string;
}

const schema = yup.object().shape({
  comment: yup.string().required("The comment field is required."),
});
const AddCommentModal: React.FC<AddCommentModalProps> = ({
  movie
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ mode: "onChange", resolver: yupResolver(schema) });

  function onSubmit(data:FormData) {
    addComment(movie, data.comment);
    
    window.location.reload()
  }



  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button className="commentButton" onClick={handleShow}>
        <MessageCircle size={20} color="#00bcd4" />
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Comment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className=" mb-2">
              <Form.Label>Comment</Form.Label>
              <Controller
                name="comment"
                defaultValue=""
                control={control}
                render={({ field }) => {
                  return (
                    <Input
                      {...field}
                      type="textarea"
                      rows={3}
                      id=""
                      placeholder="Add comment"
                      autoFocus
                      invalid={errors.comment && true}
                    />
                  );
                }}
              />

              <Form.Control.Feedback type="invalid">
                {errors.comment?.message}
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
            Add comment
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddCommentModal;
