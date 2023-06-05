import { useState } from "react";
import React from "react";
import {
  CardContent,
  CardActions,
  IconButton,
  TextField,
  Button,
  Box,
  Typography,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { StyledCard, StyledTitle, StyledDescription } from "./Board.styled";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { deleteUserBoard, updateUserBoard } from "../../api/boardApiService";
import { toast } from "react-toastify";
import { Formik } from "formik";
import moment from "moment/moment";
import { useNavigate } from "react-router-dom";
import useTokenStore from "../../store/userStore";
const Board = ({
  title,
  description,
  _boardId,
  userId,
  createdAt,
  ...props
}) => {
  const { token } = useTokenStore();
  const [isTitleEditing, setIsTitleEditing] = useState(false);
  const [isDescEditing, setisDescEditing] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const deleteBoardMutation = useMutation(deleteUserBoard, {
    onSuccess: () => {
      queryClient.invalidateQueries(["boards"]);
      toast.success("Deleted Sucessfully");
    },
    onError: () => toast.error("Error"),
  });

  const updateBoardMutation = useMutation(updateUserBoard, {
    onSuccess: () => {
      queryClient.invalidateQueries(["boards"]);
      toast.success("Updated succesfully Sucessfully");
    },
    onError: () => toast.error("Error"),
  });

  const handleDelete = () => {
    deleteBoardMutation.mutate({ userId, _boardId, token });
  };

  const handleFieldChange = (values) => {
    values._boardId = _boardId;
    updateBoardMutation.mutate(values);
    if (isTitleEditing) setIsTitleEditing(false);
    if (isDescEditing) setisDescEditing(false);
  };

  return (
    <StyledCard
      sx={{
        flex: "1 1 30em 30em",
      }}
    >
      <CardContent>
        <Formik
          initialValues={{ title, description }}
          onSubmit={handleFieldChange}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit}>
              <StyledTitle>
                {isTitleEditing ? (
                  <TextField
                    value={values.title}
                    name="title"
                    label="title"
                    onChange={handleChange}
                    error={Boolean(touched.title) && Boolean(errors.title)}
                    onBlur={handleBlur}
                    onDoubleClick={() => setIsTitleEditing((pre) => !pre)}
                    sx={{
                      width: "100%",
                      margin: "1.2rem 0",
                    }}
                  />
                ) : (
                  <StyledTitle
                    onDoubleClick={() => setIsTitleEditing((pre) => !pre)}
                  >
                    {title}
                  </StyledTitle>
                )}
              </StyledTitle>
              <StyledDescription>
                {isDescEditing ? (
                  <TextField
                    value={values.description}
                    label="description"
                    name="description"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onDoubleClick={() => setisDescEditing((pre) => !pre)}
                    sx={{
                      width: "100%",
                    }}
                  />
                ) : (
                  <StyledDescription
                    onDoubleClick={() => setisDescEditing((pre) => !pre)}
                  >
                    {description}
                  </StyledDescription>
                )}
              </StyledDescription>
              <CardActions>
                {isTitleEditing || isDescEditing ? (
                  <Button variant="contained" type="submit">
                    Save
                  </Button>
                ) : (
                  ""
                )}
              </CardActions>
            </form>
          )}
        </Formik>
      </CardContent>
      <CardActions>
        <IconButton
          aria-label="edit"
          onClick={() => {
            setIsTitleEditing((pre) => !pre);
            setisDescEditing((pre) => !pre);
          }}
        >
          <Edit />
        </IconButton>
        <IconButton aria-label="delete" onClick={handleDelete}>
          <Delete />
        </IconButton>
        <Typography>{moment(createdAt).fromNow()}</Typography>
        <Button onClick={() => navigate(`/board/${_boardId}/task-containers`)}>
          Tasks-{props.taskContainers.length}
        </Button>
      </CardActions>
    </StyledCard>
  );
};

export default Board;
