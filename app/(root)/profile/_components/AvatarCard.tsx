import Image from "next/image";

const AvatarCard = () => (
  <Image
    src="https://github.com/shadcn.png"
    alt="Anthony Dourado"
    width={160}
    height={160}
    className="w-32 h-32 sm:w-40 sm:h-40 rounded-lg shadow-lg"
    priority
  />
);

export default AvatarCard;
