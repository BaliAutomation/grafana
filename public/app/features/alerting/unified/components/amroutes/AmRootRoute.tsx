import React, { FC, useState } from 'react';
import { css } from '@emotion/css';
import { GrafanaTheme } from '@grafana/data';
import { Button, useStyles } from '@grafana/ui';
import { AmRouteReceiver, FormAmRoute } from '../../types/amroutes';
import { EmptyArea } from '../EmptyArea';
import { AmRootRouteForm } from './AmRootRouteForm';
import { AmRootRouteRead } from './AmRootRouteRead';

export interface AmRootRouteProps {
  onSave: (data: Partial<FormAmRoute>) => void;
  receivers: AmRouteReceiver[];
  routes: FormAmRoute;
}

export const AmRootRoute: FC<AmRootRouteProps> = ({ onSave, receivers, routes }) => {
  const styles = useStyles(getStyles);
  const [isEditMode, setIsEditMode] = useState(false);

  if (!routes.receiver && !isEditMode) {
    return (
      <EmptyArea
        buttonIcon="rocket"
        buttonLabel="Set a default contact point"
        onButtonClick={() => setIsEditMode(true)}
        text="You haven't set a default contact point for the root route yet."
      />
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <h5 className={styles.title}>
          Root policy - <i>default for all alerts</i>
        </h5>
        {!isEditMode && (
          <Button icon="pen" onClick={() => setIsEditMode(true)} size="sm" type="button" variant="secondary">
            Edit
          </Button>
        )}
      </div>
      <p>
        All alerts will go to the default notification channel, unless you set additional matchers in the specific
        routing area.
      </p>
      {isEditMode ? (
        <AmRootRouteForm
          onCancel={() => setIsEditMode(false)}
          onSave={(data: Partial<FormAmRoute>) => {
            onSave(data);
            setIsEditMode(false);
          }}
          receivers={receivers}
          routes={routes}
        />
      ) : (
        <AmRootRouteRead routes={routes} />
      )}
    </div>
  );
};

const getStyles = (theme: GrafanaTheme) => {
  return {
    container: css`
      background-color: ${theme.colors.bg2};
      color: ${theme.colors.textSemiWeak};
      padding: ${theme.spacing.md};
    `,
    titleContainer: css`
      color: ${theme.colors.textHeading};
      display: flex;
      flex-flow: row nowrap;
    `,
    title: css`
      flex: 100%;
    `,
  };
};
