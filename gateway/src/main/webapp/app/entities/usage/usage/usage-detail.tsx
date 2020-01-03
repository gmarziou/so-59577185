import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './usage.reducer';
import { IUsage } from 'app/shared/model/usage/usage.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IUsageDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const UsageDetail = (props: IUsageDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { usageEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="gatewayApp.usageUsage.detail.title">Usage</Translate> [<b>{usageEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="date">
              <Translate contentKey="gatewayApp.usageUsage.date">Date</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={usageEntity.date} type="date" format={APP_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="details">
              <Translate contentKey="gatewayApp.usageUsage.details">Details</Translate>
            </span>
          </dt>
          <dd>{usageEntity.details}</dd>
          <dt>
            <span id="sentDate">
              <Translate contentKey="gatewayApp.usageUsage.sentDate">Sent Date</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={usageEntity.sentDate} type="date" format={APP_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="userId">
              <Translate contentKey="gatewayApp.usageUsage.userId">User Id</Translate>
            </span>
          </dt>
          <dd>{usageEntity.userId}</dd>
          <dt>
            <span id="productId">
              <Translate contentKey="gatewayApp.usageUsage.productId">Product Id</Translate>
            </span>
          </dt>
          <dd>{usageEntity.productId}</dd>
        </dl>
        <Button tag={Link} to="/usage" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/usage/${usageEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ usage }: IRootState) => ({
  usageEntity: usage.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(UsageDetail);
