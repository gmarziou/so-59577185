import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Usage from './usage';
import UsageDetail from './usage-detail';
import UsageUpdate from './usage-update';
import UsageDeleteDialog from './usage-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={UsageDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={UsageUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={UsageUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={UsageDetail} />
      <ErrorBoundaryRoute path={match.url} component={Usage} />
    </Switch>
  </>
);

export default Routes;
