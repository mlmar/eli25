import * as React from 'react';
import { Outlet, createRootRoute } from '@tanstack/react-router';
import { NewsPage } from '@/features/NewsPage';

export const Route = createRootRoute({
    component: RootComponent,
    notFoundComponent: NewsPage
});

function RootComponent() {
    return (
        <React.Fragment>
            <Outlet />
        </React.Fragment>
    );
}
