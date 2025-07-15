import {
  type RouteConfig,
  index,
  layout,
  prefix,
  route,
} from '@react-router/dev/routes';

export default [
  layout('./routes/app-layout.tsx', [
    index('routes/home.tsx'),
    ...prefix('lists', [
      index('./routes/lists/home.tsx'),
      route('create', './routes/lists/create-list.tsx'),
      route(':id', './routes/lists/list.tsx'),
      route(':id/add-items', './routes/lists/items/add-items.tsx'),
      route(':id/edit-items', './routes/lists/items/edit-items.tsx'),
    ]),
  ]),
] satisfies RouteConfig;
