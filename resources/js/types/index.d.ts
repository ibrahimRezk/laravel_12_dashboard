import { RouteDefinition } from '@/wayfinder';
import type { LucideIcon } from 'lucide-vue-next';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: RouteDefinition<'get'> | string;
}

export interface FlashMessages {
    success: string;
    error: string;
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
    paginationNumber: number;
    messages: object;
    errors: object;
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


interface tableHeader {
    name: string,
    label:string
}
export interface TableProps {
  headers?: tableHeader[]; // Ideally, replace 'any' with a specific interface for your header
  items?: Record<string, number,  any>;
  headersClasses?: string;
  headerFooterClasses?: string;
  trClasses?: string;
  bodyClasses?: string;
  hoverClasses?: string;
  noCheckAll?: boolean;
  checkedAllButton?: boolean;
  noNamePadding?: boolean;
  withAxios?: boolean;
  noPagination?: boolean;
  has_extra_final_row?: boolean;
  showPaginationNumber?: boolean;
  tableHeight?: string;
}

export type BreadcrumbItemType = BreadcrumbItem;
export type FlashMessagesType = FlashMessages;
