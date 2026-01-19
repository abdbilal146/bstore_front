import { createRootRoute, createRoute, Outlet } from "@tanstack/react-router";
import HomePage from "../pages/HomePage/HomePage";
import { Callback } from "../pages/Callback/Callback";
import UserPage from "../pages/UserPage/UserPage";
import ProductDescriptionPage from "../pages/ProductDescriptionPage/ProductDescriptionPage";
import CheckoutPage from "../pages/CheckoutPage/CheckoutPage";
import OrderConfirmationpage from "../pages/OrderConfirmationPage/OrderConfirmationPage";
import MyOrderPage from "../pages/MyOrdersPage/MyOrderPage";
import ProductBrandPage from "../pages/ProductBrandPage/ProductBrandPage";

export const rootRoute = createRootRoute({
    component: () => {
        return <>
            <Outlet></Outlet>
        </>
    }
})

export const callBackRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/callback',
    component: Callback
})

export const homeRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: HomePage
})

export const userRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/user',
    component: UserPage
})

export const pdpRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/product_page/$templateId',
    component: ProductDescriptionPage
})

export const checkoutRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/checkout',
    component: CheckoutPage,
})

export const orderConfirmationPageRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/checkout/success',
    validateSearch: (search: Record<string, unknown>): { session_id?: string } => {
        return {
            session_id: (search.session_id as string) || undefined,
        }
    },
    component: OrderConfirmationpage,
})

export const myOrdersRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/my-orders',
    component: MyOrderPage,
})

export const productListPageRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/product-list',
})

export const brandProductPageRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/product-brand/$brand',
    component: ProductBrandPage
})

export const routeTree = rootRoute.addChildren([
    homeRoute,
    userRoute,
    callBackRoute,
    pdpRoute,
    checkoutRoute,
    orderConfirmationPageRoute,
    myOrdersRoute,
    brandProductPageRoute
])