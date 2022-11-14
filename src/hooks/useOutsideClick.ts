import React from "react";

export const useOutsideClick = (
  callback: () => void
):
  | ((instance: HTMLDivElement | null) => void)
  | React.RefObject<any>
  | null
  | undefined => {
  const ref = React.useRef();

  React.useEffect(() => {
    const handleClick = (event: any) => {
      callback();
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [callback]);

  return ref;
};
