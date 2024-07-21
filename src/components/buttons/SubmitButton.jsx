import { GoArrowRight } from "react-icons/go";
import { useFormStatus } from "react-dom";
import toast from "react-hot-toast";

const SubmitButton = ({
  children,
  isPending=false,
  className = "bg-blue-500 disabled:bg-blue-400 disabled:cursor-not-allowed text-white rounded-sm h-12 px-4 text-2xl flex justify-center items-center gap-4",
}) => {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      type="submit"
      className={`${className} ${pending && 'bg-blue-300 cursor-not-allowed'}`}
    >
      {isPending && pending ? 'Saving...' : children}
    </button>
  );
};

export default SubmitButton;
