import { Typography, Box } from "@mui/material";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import CircularProgress from "@mui/joy/CircularProgress";
import { useNavigate } from "react-router-dom";
import { getAllUserBoards, createUserBoard } from "../../api/boardApiService";
import Board from "../../components/Board/Board";
import AddBoardForm from "../../components/AddBoardForm/AddBoardForm";
import useTokenStore from "../../store/userStore";

const Home = () => {
  const { userId, userName, token } = useTokenStore();
  const queryClient = useQueryClient();
  const {
    isLoading,
    isError,
    error,
    data: boards,
  } = useQuery({
    queryKey: ["boards"],
    queryFn: () => getAllUserBoards({ userId, token }),
    refetchOnWindowFocus: false,
  });

  const navigate = useNavigate();

  console.log(boards);
  if (isError) return <>Error</>;
  return (
    <Box px="20px" py="40px">
      <Typography variant="h3" marginTop={5}>
        Welcome - {userName}
      </Typography>
      <Typography variant="h3" mt={5}>
        Add board
      </Typography>
      <AddBoardForm userId={userId} />
      <Typography variant="h3" mt={5}>
        Boards
      </Typography>
      {isLoading ? (
        <CircularProgress
          color="danger"
          determinate={false}
          value={38}
          variant="solid"
        />
      ) : (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
          }}
        >
          {boards.length <= 0 ? (
            <>Please Add Board</>
          ) : (
            boards?.map((board) => (
              <Board
                key={board.id}
                title={board.title}
                description={board.description}
                createdAt={board.createdAt}
                _boardId={board.id}
                userId={userId}
                {...board}
              />
            ))
          )}
        </Box>
      )}
    </Box>
  );
};

export default Home;
