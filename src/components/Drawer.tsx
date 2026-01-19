import { Drawer as MantineDrawer } from "@mantine/core";
import './Drawer.scss'
import type { ReactNode } from "react";

interface DrawerProps {
    opened: boolean;
    onClose: () => void;
    title?: string;
    children?: ReactNode;
}

export default function Drawer({ opened, onClose, title = "Menu", children }: DrawerProps) {
    return (
        <MantineDrawer
            position="top"
            size="100%"
            opened={opened}
            onClose={onClose}
            title={title}
        >
            <div className="drawer-content">
                {children}
            </div>
        </MantineDrawer>
    )
}