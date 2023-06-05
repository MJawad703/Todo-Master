import { Box, Typography, TextField, Button, Card } from "@mui/material";
import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllBoardTaskContainers,
  createBoardTaskContainer,
} from "../../api/taskContainerApiService";
import { DarkModeSwitch } from "react-toggle-dark-mode";

import { createTask } from "../../api/tasksApiService";

import { Formik } from "formik";

const TaskContainer = () => {
  const { boardId } = useParams();
  const queryClient = useQueryClient();

  const { data, isLoading, error, isError } = useQuery({
    queryFn: () => getAllBoardTaskContainers({ _boardId: boardId }),
    queryKey: [boardId, "task-containers"],
    refetchOnWindowFocus: false,
  });

  const createTaskContainerMutation = useMutation(createBoardTaskContainer, {
    onSuccess: () => {
      queryClient.invalidateQueries([boardId, "task-containers"]);
    },
  });

  const createTaskMutation = useMutation(createTask, {
    onSuccess: () =>
      queryClient.invalidateQueries([boardId, "task-containers"]),
  });

  const handleFormSubmit = (values, onSubmitProps) => {
    values._boardId = boardId;
    createTaskContainerMutation.mutate(values);
    onSubmitProps.resetForm();
  };

  const handleTaskSubmit = ({ values, onSubmitProps, _taskContainerId }) => {
    createTaskMutation.mutate({
      title: values.title,
      description: values.description,
      _taskContainerId,
    });

    onSubmitProps.resetForm();
  };

  return (
    <Box mt={10}>
      TaskContainers of this Board{boardId}{" "}
      <Formik
        initialValues={{
          title: "",
          description: "",
        }}
        onSubmit={handleFormSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          resetForm,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display={"flex"}
              justifyContent="space-evenly"
              alignItems={"center"}
              gap={2}
              mt={3}
            >
              <TextField
                label="title"
                name="title"
                value={values.title}
                onChange={handleChange}
                error={Boolean(touched.title) && Boolean(errors.title)}
                helperText={touched.title && errors.title}
                onBlur={handleBlur}
                sx={{
                  flexGrow: 1,
                }}
              />

              <TextField
                label="description"
                name="description"
                value={values.description}
                onChange={handleChange}
                sx={{
                  flexGrow: 1,
                }}
              />
              <Button
                type="submit"
                color="primary"
                variant="contained"
                sx={{
                  flexGrow: 1,
                  alignSelf: "stretch",
                }}
              >
                Submit
              </Button>
            </Box>
          </form>
        )}
      </Formik>
      <Box
        display={"flex"}
        sx={{
          flexWrap: "wrap",
          gap: "20px",
        }}
      >
        {data?.taskContainers?.map((taskContainer) => (
          <Card
            key={taskContainer.id}
            sx={{
              flex: "1 1 10em 10em",
            }}
          >
            <Typography variant="h3">{taskContainer.title}</Typography>
            <Typography variant="paragraph">
              {taskContainer.description}
            </Typography>
            <Box>{JSON.stringify(taskContainer.tasks.length)}</Box>
            <Formik
              initialValues={{
                title: "",
                description: "",
              }}
              onSubmit={(values, onSubmitProps) =>
                handleTaskSubmit({
                  values,
                  onSubmitProps,
                  _taskContainerId: taskContainer.id,
                })
              }
            >
              {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
                resetForm,
              }) => (
                <form onSubmit={handleSubmit}>
                  <Box display="flex" flexDirection={"column"} p={5}>
                    <TextField
                      label="title"
                      name="title"
                      value={values.title}
                      onChange={handleChange}
                      error={Boolean(touched.title) && Boolean(errors.title)}
                      helperText={touched.title && errors.title}
                      onBlur={handleBlur}
                      sx={{
                        flexGrow: 1,
                      }}
                    />
                    <TextField
                      label="description"
                      name="description"
                      value={values.description}
                      onChange={handleChange}
                      sx={{
                        flexGrow: 1,
                      }}
                    />
                    <Button type="submit" variant="contained">
                      Submit
                    </Button>
                  </Box>
                </form>
              )}
            </Formik>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default TaskContainer;
