import FirstPage from "./firstPage/page";

export default function Home() {
  if (process.env.MONGODB_URL === "") {
    return <div>Database URL is not set..</div>;
  }
  return <FirstPage />;
}
