import Board from "@/app/components/board/Board";

const BoardsPage = async ({ params }) => {
  const { id } = await params;
  return (
    <>
      <Board id={id} />
    </>
  );
};

export default BoardsPage;
