import { Formik } from "formik";
import { TextField, Box, Button } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUserBoard } from "../../api/boardApiService";
import { toast } from "react-toastify";
import useTokenStore from "../../store/userStore";

const AddBoardForm = () => {
  const queryClient = useQueryClient();
  const { userId, token } = useTokenStore();
  const createBoardMutation = useMutation(createUserBoard, {
    onSuccess: () => {
      queryClient.invalidateQueries(["boards"]);
      toast.success("Created Success");
    },
    onError: ({ response }) => toast.error(response.data.message),
  });

  const handleFormSubmit = (values, onSubmitProps) => {
    values = {
      ...values,
      userId,
      token,
    };
    createBoardMutation.mutate(values);
    onSubmitProps.resetForm();
  };

  return (
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
  );
};

export default AddBoardForm;
