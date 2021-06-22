import React, { FC } from 'react';
import PluginListItem from './PluginListItem';
import { PluginMeta, PluginType } from '@grafana/data';
import { selectors } from '@grafana/e2e-selectors';

interface Props {
  plugins: PluginMeta[];
}

const PluginList: FC<Props> = (props) => {
  const { plugins } = props;

  return (
    <section className="card-section card-list-layout-list">
      <ol className="card-list" aria-label={selectors.pages.PluginsList.list}>
        {plugins
          .filter(
            (plugin, index) =>
              plugin.type !== PluginType.datasource || plugin.name.toLowerCase().indexOf('sensetif') >= 0
          )
          .map((plugin, index) => {
            return <PluginListItem plugin={plugin} key={`${plugin.name}-${index}`} />;
          })}
      </ol>
    </section>
  );
};

export default PluginList;
