import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, InputGroup, Col, Row, Table } from 'reactstrap';
import { AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudSearchAction, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getSearchEntities, getEntities } from './usage.reducer';
import { IUsage } from 'app/shared/model/usage/usage.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IUsageProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Usage = (props: IUsageProps) => {
  const [search, setSearch] = useState('');

  useEffect(() => {
    props.getEntities();
  }, []);

  const startSearching = () => {
    if (search) {
      props.getSearchEntities(search);
    }
  };

  useEffect(() => {
    props.getEntities();
  }, [search]);

  const clear = () => {
    setSearch('');
  };

  const handleSearch = event => setSearch(event.target.value);

  const { usageList, match } = props;
  return (
    <div>
      <h2 id="usage-heading">
        <Translate contentKey="gatewayApp.usageUsage.home.title">Usages</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="gatewayApp.usageUsage.home.createLabel">Create new Usage</Translate>
        </Link>
      </h2>
      <Row>
        <Col sm="12">
          <AvForm onSubmit={startSearching}>
            <AvGroup>
              <InputGroup>
                <AvInput
                  type="text"
                  name="search"
                  value={search}
                  onChange={handleSearch}
                  placeholder={translate('gatewayApp.usageUsage.home.search')}
                />
                <Button className="input-group-addon">
                  <FontAwesomeIcon icon="search" />
                </Button>
                <Button type="reset" className="input-group-addon" onClick={clear}>
                  <FontAwesomeIcon icon="trash" />
                </Button>
              </InputGroup>
            </AvGroup>
          </AvForm>
        </Col>
      </Row>
      <div className="table-responsive">
        {usageList && usageList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="gatewayApp.usageUsage.date">Date</Translate>
                </th>
                <th>
                  <Translate contentKey="gatewayApp.usageUsage.details">Details</Translate>
                </th>
                <th>
                  <Translate contentKey="gatewayApp.usageUsage.sentDate">Sent Date</Translate>
                </th>
                <th>
                  <Translate contentKey="gatewayApp.usageUsage.userId">User Id</Translate>
                </th>
                <th>
                  <Translate contentKey="gatewayApp.usageUsage.productId">Product Id</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {usageList.map((usage, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${usage.id}`} color="link" size="sm">
                      {usage.id}
                    </Button>
                  </td>
                  <td>
                    <TextFormat type="date" value={usage.date} format={APP_DATE_FORMAT} />
                  </td>
                  <td>{usage.details}</td>
                  <td>
                    <TextFormat type="date" value={usage.sentDate} format={APP_DATE_FORMAT} />
                  </td>
                  <td>{usage.userId}</td>
                  <td>{usage.productId}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${usage.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${usage.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${usage.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <div className="alert alert-warning">
            <Translate contentKey="gatewayApp.usageUsage.home.notFound">No Usages found</Translate>
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ usage }: IRootState) => ({
  usageList: usage.entities
});

const mapDispatchToProps = {
  getSearchEntities,
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Usage);
