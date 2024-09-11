"use client";

import Button from "./components/Button";

interface Props {
  error: Error;
  reset: () => void;
}
export default function Error({ error, reset }: Props) {
  console.log(error);
  return (
    <div className="flex flex-1 flex-col align-middle justify-center">
      <div className="flex align-middle justify-center mb-3">
        OOPS Somthing Went Wrong.
      </div>
      <div className="flex align-middle justify-center">
        <Button onClick={reset}>Retry</Button>
      </div>
    </div>
  );
}
