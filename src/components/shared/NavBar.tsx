import Link from "next/link";
import Image from "next/image";
import Menu from "@/components/shared/menu";

const APP_NAME = "Shopify";

const Navbar = () => {
  return (
    <header className="w-full sticky top-0 z-50 border-b bg-gray-50 dark:bg-black" >
      <div className="wrapper flex-between">
        <div className="flex-start max-h-[35px]">
          <Link href="/" className="flex-start">
            <Image
              src="/images/logoShopify.svg"
              alt={`${APP_NAME} logo`}
              width={80}
              height={50}
              priority={true}
            />
          </Link>
        </div>
        <Menu />
      </div>
    </header>
  );
};

export default Navbar;
