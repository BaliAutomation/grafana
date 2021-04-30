import React, { FC } from 'react';
import { NotificationChannelOption } from 'app/types';
import { FieldError, DeepMap, useFormContext } from 'react-hook-form';
import { GrafanaThemeV2 } from '@grafana/data';
import { css } from '@emotion/css';
import { Button, useStyles2 } from '@grafana/ui';
import { CollapsibleSection } from '../CollapsibleSection';
import { ActionIcon } from '../../../rules/ActionIcon';
import { OptionField } from './OptionField';
import { useControlledFieldArray } from 'app/features/alerting/unified/hooks/useControlledFieldArray';

interface Props {
  defaultValues?: any[];
  option: NotificationChannelOption;
  pathPrefix: string;
  errors?: Array<DeepMap<any, FieldError>>;
}

export const SubformArrayField: FC<Props> = ({ option, pathPrefix, errors, defaultValues }) => {
  const styles = useStyles2(getStyles);
  const path = `${pathPrefix}${option.propertyName}`;
  const formAPI = useFormContext();
  const { fields, append, remove } = useControlledFieldArray(path, formAPI, defaultValues);

  return (
    <div className={styles.wrapper}>
      <CollapsibleSection className={styles.collapsibleSection} label={option.label} description={option.description}>
        {(fields ?? defaultValues ?? []).map((field, itemIndex) => {
          return (
            <div key={itemIndex} className={styles.wrapper}>
              <ActionIcon
                icon="trash-alt"
                tooltip="delete"
                onClick={() => remove(itemIndex)}
                className={styles.deleteIcon}
              />
              {option.subformOptions?.map((option) => (
                <OptionField
                  defaultValue={field}
                  key={option.propertyName}
                  option={option}
                  pathPrefix={`${path}.${itemIndex}.`}
                  error={errors?.[itemIndex]?.[option.propertyName]}
                />
              ))}
            </div>
          );
        })}
        <Button
          className={styles.addButton}
          type="button"
          variant="secondary"
          icon="plus"
          size="sm"
          onClick={() => append({ __id: String(Math.random()) })}
        >
          Add
        </Button>
      </CollapsibleSection>
    </div>
  );
};

const getStyles = (theme: GrafanaThemeV2) => ({
  deleteIcon: css`
    position: absolute;
    right: ${theme.spacing(1)};
    top: ${theme.spacing(1)};
  `,
  addButton: css`
    margin-top: ${theme.spacing(1)};
  `,
  collapsibleSection: css`
    margin: 0;
    padding: 0;
  `,
  wrapper: css`
    position: relative;
    margin: ${theme.spacing(2, 0)};
    padding: ${theme.spacing(1)};
    border: solid 1px ${theme.colors.border.medium};
    border-radius: ${theme.shape.borderRadius(1)};
  `,
});
