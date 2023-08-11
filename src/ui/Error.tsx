import {
  useNavigate,
  useRouteError,
  isRouteErrorResponse,
} from "react-router-dom";

interface Error {
  status: number;
  data: string;
  message: string;
}

function Error() {
  const navigate = useNavigate();
  const error = useRouteError() as Error;

  console.log(error);

  const messageError = () => {
    if (isRouteErrorResponse(error)) {
      if (error.status === 404) {
        return <div>This page doesn't exist!</div>;
      }

      if (error.status === 401) {
        return <div>You aren't authorized to see this</div>;
      }

      if (error.status === 503) {
        return <div>Looks like our API is down</div>;
      }

      if (error.status === 418) {
        <div>🫖</div>;
      }
    }

    return (
      <>
        <p>{error.data || error.message}</p>
        <div>Something went wrong</div>
      </>
    );
  };

  return (
    <div>
      {messageError()}
      <button onClick={() => navigate(-1)}>&larr; Go back</button>
    </div>
  );
}

export default Error;
