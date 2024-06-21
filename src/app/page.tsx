import { ModeToggle } from "@/components/ModeToggle";
import { NavBar } from "@/components/NavBar";
import { Fragment } from "react";

export default function Home() {
  return (
    <Fragment>
      <NavBar />
      <section className="container">
        <ModeToggle />
      </section>
    </Fragment>
  );
}
