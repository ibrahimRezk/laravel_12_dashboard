import { InertiaLinkProps } from '@inertiajs/vue3';
import type { LucideIcon } from 'lucide-vue-next';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}
export interface messages {
    success: string;
    error: string;
    vital_error: string;
}

export interface NavItem { // new
    title: string;
    icon?: LucideIcon;
    url?: string;
    href?: string;
    icon?: LucideIcon;
    isActive?: boolean; 
    isVisible?: boolean; 
    hasSubmenu?: boolean; 
    open?: boolean; 
    subMenus?: array;  
}

export type AppPageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    menus: Array;
    sidebarOpen: boolean;
};

interface name {
    ar: string,
    en: string
}
export interface User {
    id: number;
    name: name;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
}

export type BreadcrumbItemType = BreadcrumbItem;
