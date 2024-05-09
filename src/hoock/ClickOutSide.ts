import { useEffect, useRef } from "react";

interface ClickOutsideProps {
  onOutsideClick: () => void;
}

const  useClickOutside = ({ onOutsideClick }: ClickOutsideProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      onOutsideClick();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return ref;
};
export default useClickOutside