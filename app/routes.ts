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
      route('new', './routes/lists/new.tsx'),
    ]),
  ]),
] satisfies RouteConfig;
