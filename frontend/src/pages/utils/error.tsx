import { useRouteError } from "react-router-dom";
import PageContent from "../../component/PageContent";
import Navbar from "../navbar";

type Props = {};

function ErrorPage({}: Props) {
  const error: any = useRouteError();

  let title = "An error Occured";
  let message = "Something went wrong!";

  if (error.status === 500) {
    // message = JSON.parse(error.data).message;
    // if using json() from react router dom
    message = error.data.message;
  }

  if (error.status === 404) {
    title = "Not found!";
    message = "Could not find resource or page";
  }
  return (
    <>
      <Navbar />
      <PageContent title={title}>
        <p>{message}</p>
      </PageContent>
    </>
  );
}

export default ErrorPage;
