import Home from "@/components/Home";
import { getSession } from "./actions/auth";
export default async function HomePage() {

  return (
    <>
      <Home />
    </>
  );
}
