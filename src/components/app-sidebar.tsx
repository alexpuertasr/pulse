"use client";

import { Menu } from "@ark-ui/react/menu";
import {
  ChevronsUpDownIcon,
  HomeIcon,
  LogOutIcon,
  MenuIcon,
  RulerIcon,
  UserIcon,
  XIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useState } from "react";

import { PulseLogo } from "@/components/pulse-logo";
import { Drawer, DrawerCloseTrigger } from "@/components/ui/drawer";
import { IconButton } from "@/components/ui/icon-button";
import { authClient } from "@/lib/auth-client";
import { css, cx } from "@/styled-system/css";
import { menu } from "@/styled-system/recipes";

interface SidebarUser {
  name: string;
  email: string;
  image?: string | null;
}

const navItems = [
  { href: "/", icon: HomeIcon, key: "home" },
  { href: "/measurements", icon: RulerIcon, key: "measurements" },
] as const;

const navLinkStyles = css({
  alignItems: "center",
  borderRadius: "md",
  color: "fg.muted",
  display: "flex",
  fontWeight: "medium",
  gap: "3",
  px: "3",
  py: "2",
  textStyle: "sm",
  transitionDuration: "normal",
  transitionProperty: "background-color, color",
  _hover: { bg: "bg.subtle", color: "fg.default" },
  _currentPage: {
    bg: "colorPalette.subtle.bg",
    color: "colorPalette.subtle.fg",
  },
  "& svg": { boxSize: "4.5" },
});

export function AppSidebar({ user }: { user: SidebarUser }) {
  const t = useTranslations("sidebar");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const closeDrawer = () => setDrawerOpen(false);

  return (
    <>
      <aside
        className={css({
          borderColor: "border.subtle",
          borderRightWidth: "1px",
          display: "flex",
          flexDirection: "column",
          flexShrink: "0",
          gap: "6",
          h: "dvh",
          hideBelow: "md",
          position: "sticky",
          px: "3",
          py: "4",
          top: "0",
          w: "64",
        })}
      >
        <BrandLink />
        <SidebarNav />
        <UserMenu user={user} />
      </aside>

      <header
        className={css({
          alignItems: "center",
          bg: "bg.canvas",
          borderBottomWidth: "1px",
          borderColor: "border.subtle",
          display: "flex",
          gap: "1",
          h: "14",
          hideFrom: "md",
          position: "sticky",
          px: "3",
          top: "0",
          zIndex: "10",
        })}
      >
        <IconButton
          size="sm"
          variant="ghost"
          aria-label={t("open-menu")}
          onClick={() => setDrawerOpen(true)}
        >
          <MenuIcon />
        </IconButton>
        <BrandLink />
      </header>

      <Drawer
        label={t("menu")}
        swipeDirection="start"
        open={drawerOpen}
        onOpenChange={({ open }) => setDrawerOpen(open)}
        className={css({ gap: "6", py: "4" })}
      >
        <div
          className={css({
            alignItems: "center",
            display: "flex",
            justifyContent: "space-between",
          })}
        >
          <BrandLink onNavigate={closeDrawer} />
          <DrawerCloseTrigger asChild>
            <IconButton size="sm" variant="ghost" aria-label={t("close-menu")}>
              <XIcon />
            </IconButton>
          </DrawerCloseTrigger>
        </div>
        <SidebarNav onNavigate={closeDrawer} />
        <UserMenu user={user} onNavigate={closeDrawer} />
      </Drawer>
    </>
  );
}

function BrandLink({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <Link
      href="/"
      onClick={onNavigate}
      className={css({
        alignItems: "center",
        borderRadius: "md",
        display: "flex",
        gap: "2.5",
        px: "3",
      })}
    >
      <PulseLogo className={css({ boxSize: "8" })} />
      <span
        className={css({
          color: "fg.default",
          fontWeight: "bold",
          textStyle: "lg",
        })}
      >
        Pulse
      </span>
    </Link>
  );
}

function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  const t = useTranslations("sidebar");
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <nav
      className={css({
        display: "flex",
        flex: "1",
        flexDirection: "column",
        gap: "1",
      })}
    >
      {navItems.map(({ href, icon: Icon, key }) => (
        <Link
          key={href}
          href={href}
          aria-current={isActive(href) ? "page" : undefined}
          onClick={onNavigate}
          className={navLinkStyles}
        >
          <Icon />
          {t(key)}
        </Link>
      ))}
    </nav>
  );
}

function UserMenu({
  user,
  onNavigate,
}: {
  user: SidebarUser;
  onNavigate?: () => void;
}) {
  const t = useTranslations("sidebar");
  const router = useRouter();
  const menuClasses = menu();

  async function handleSignOut() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/auth/signin");
          router.refresh();
        },
      },
    });
  }

  return (
    <Menu.Root
      positioning={{ placement: "top" }}
      onSelect={({ value }) => {
        if (value === "sign-out") {
          handleSignOut();
        }
      }}
    >
      <Menu.Trigger
        className={css({
          alignItems: "center",
          borderRadius: "lg",
          cursor: "pointer",
          display: "flex",
          gap: "2.5",
          outline: "0",
          p: "2",
          textAlign: "start",
          transitionDuration: "normal",
          transitionProperty: "background-color",
          w: "full",
          _hover: { bg: "bg.subtle" },
          _focusVisible: {
            outline: "2px solid",
            outlineColor: "colorPalette.solid.bg",
            outlineOffset: "1px",
          },
        })}
      >
        <UserAvatar name={user.name} image={user.image} />
        <span
          className={css({
            display: "flex",
            flex: "1",
            flexDirection: "column",
            minW: "0",
          })}
        >
          <span
            className={css({
              color: "fg.default",
              fontWeight: "medium",
              textStyle: "sm",
              truncate: true,
            })}
          >
            {user.name}
          </span>
          <span
            className={css({
              color: "fg.muted",
              textStyle: "xs",
              truncate: true,
            })}
          >
            {user.email}
          </span>
        </span>
        <ChevronsUpDownIcon
          className={css({
            boxSize: "4",
            color: "fg.muted",
            flexShrink: "0",
          })}
        />
      </Menu.Trigger>
      <Menu.Positioner className={menuClasses.positioner}>
        <Menu.Content className={menuClasses.content}>
          <Menu.Item value="profile" asChild className={menuClasses.item}>
            <Link href="/profile" onClick={onNavigate}>
              <UserIcon />
              {t("edit-profile")}
            </Link>
          </Menu.Item>
          <Menu.Separator className={menuClasses.separator} />
          <Menu.Item value="sign-out" className={menuClasses.item}>
            <LogOutIcon />
            {t("sign-out")}
          </Menu.Item>
        </Menu.Content>
      </Menu.Positioner>
    </Menu.Root>
  );
}

function UserAvatar({ name, image }: { name: string; image?: string | null }) {
  const avatarStyles = css({
    borderRadius: "full",
    boxSize: "9",
    flexShrink: "0",
  });

  if (image) {
    return (
      <Image
        src={image}
        alt=""
        width={36}
        height={36}
        referrerPolicy="no-referrer"
        className={avatarStyles}
      />
    );
  }

  return (
    <span
      className={cx(
        avatarStyles,
        css({
          alignItems: "center",
          bg: "colorPalette.subtle.bg",
          color: "colorPalette.subtle.fg",
          display: "flex",
          fontWeight: "semibold",
          justifyContent: "center",
          textStyle: "sm",
          textTransform: "uppercase",
        }),
      )}
    >
      {name.charAt(0)}
    </span>
  );
}
