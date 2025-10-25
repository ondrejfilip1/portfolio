import { useEffect, useState } from "react";
import CountUp from "react-countup";

export default function WelcomeScreen() {
  const [hidden, setHidden] = useState(false);
  const [firstTime] = useState<boolean>(!localStorage.getItem("firstTime"));

  if (!firstTime) {
    return <></>;
  }

  useEffect(() => {
    setTimeout(() => {
      setHidden(true);
      localStorage.setItem("firstTime", "no");
    }, 2000);
  }, []);

  return (
    <div
      className={
        "fixed left-0 top-0 h-screen w-full text-center flex justify-center items-center bg-primary text-zinc-300 text-3xl z-50 transition-all duration-1000 font-ppeiko " +
        (hidden ? "opacity-0 pointer-events-none" : "opacity-100")
      }
    >
      <CountUp end={100} duration={2} />
      <p>%</p>
    </div>
  );
}
