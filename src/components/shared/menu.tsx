import {EllipsisVerticalIcon, ShoppingCart, ShoppingCartIcon, UserIcon } from "lucide-react";
import ThemeToggler from "../theme-toggler";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import UserButton from "@/components/shared/user-button";

const Menu = () => {
  return (
    <div className="flex  gap-3 ">
      <nav className="hidden md:flex w-full max-w-xs gap-1">
        <ThemeToggler />
        <Button asChild variant="ghost" className="p-3">
          <Link href="/cart" className="flex-between">
            <ShoppingCartIcon className="w-6 h-6" />
            <span>Cart</span>
          </Link>
        </Button>

        {/* <Button asChild variant="default" className="p-3">
          <Link href="/signin" className="flex-between">
            <UserIcon className="w-6 h-6 text-green-600" />
            <span>Sign In</span>
          </Link>
        </Button> */}
        <UserButton/>
      </nav>
      <nav className= "md:hidden lg:hidden">
        <Sheet>
          <SheetTrigger className="align-middle">
            <EllipsisVerticalIcon/>
          </SheetTrigger>
          <SheetContent className="flex flex-col ">
            <SheetTitle>Menu</SheetTitle>
            <div  className="w-full flex justify-center">
              <ThemeToggler/>
            </div>
            <Button asChild variant={"ghost"} className="p-3">
              <Link href={"/cart"}><ShoppingCart/>Cart</Link>
            </Button>
            {/* <Button asChild variant={"default"} className="p-3">
              <Link href={"/signin"}><UserIcon/>Sign In</Link>
            </Button> */}
          <div className="flex items-center justify-center">
            <UserButton/>
          </div>
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  );
};

export default Menu;
