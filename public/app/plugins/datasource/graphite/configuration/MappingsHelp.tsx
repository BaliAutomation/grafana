import { Alert } from '@grafana/ui';
import React from 'react';

type Props = {
  onDismiss: () => void;
};

export default function MappingsHelp(props: Props): JSX.Element {
  return (
    <Alert severity="info" title="How to map Graphite metrics to labels?" onRemove={props.onDismiss}>
      <p>Mappings are currently supported only between Graphite and Loki queries.</p>
      <p>
        When you switch data source from Graphite to Loki your queries will be mapped according to mappings defined
        below. To define a mapping write the full path of the metric and replace nodes you would like to map to labels
        with label name in parentheses. Value of the label will be extracted from your Graphite query when you switch
        data sources.
      </p>
      <p>
        All tags are mapped automatically to labels regardless to mapping configuration. Graphite matching patterns
        (using &#123;&#125;) are converted to Loki&apos;s regular expressions matchers. You can use functions in your
        queries, metrics and tags will be extracted to match them with defined mappings.
      </p>
      <p>
        Example: for a mapping = <code>servers.(cluster).(server).*</code>:
      </p>
      <table>
        <thead>
          <tr>
            <th>Graphite query</th>
            <th>Mapped to Loki query</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>
                alias(servers.<u>west</u>.<u>001</u>.cpu,1,2)
              </code>
            </td>
            <td>
              <code>
                &#123;cluster=&quot;<u>west</u>&quot;, server=&quot;<u>001</u>&quot;&#125;
              </code>
            </td>
          </tr>
          <tr>
            <td>
              <code>
                alias(servers.*.<u>&#123;001,002&#125;</u>.*,1,2)
              </code>
            </td>
            <td>
              <code>
                &#123;server=~&quot;<u>(001|002)</u>&quot;&#125;
              </code>
            </td>
          </tr>
          <tr>
            <td>
              <code>interpolate(seriesByTag(&apos;foo=bar&apos;, &apos;server=002&apos;), inf))</code>
            </td>
            <td>
              <code>&#123;foo=&quot;bar&quot;, server=&quot;002&quot;&#125;</code>
            </td>
          </tr>
        </tbody>
      </table>
    </Alert>
  );
}