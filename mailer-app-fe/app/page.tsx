import Welcome from "@/components/welcome";
import Navbar from "../components/navbar";

export default function Home() {
  return (
    <div className="flex justify-center h-screen">
      <div className="flex flex-col w-1/2 justify-items-center">
        <Navbar></Navbar>
        <Welcome></Welcome>
      </div>
    </div>
  );
}
