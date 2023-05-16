import React from "react";
import { Page, Layout, LegacyCard } from "@shopify/polaris";
import { LineChart } from "@shopify/polaris-viz";

const CONVERSION_RATE_QUERY = `{
  shopifyqlQuery(
    query: """
    FROM products
      VISUALIZE
      sum(view_sessions) AS views,
      sum(view_cart_sessions) AS add_to_carts
      TYPE LINE GROUP BY day
      SINCE this_querter UNTIL yesterday
      ORDER BY day DESC
    LIMIT 100
    """
  ) {
    __typename
    ... on PolarisVizResponse {
      tableData {
        rowData
        columns {
          name
          dataType
          displayName
        }
      }
    }
    parseErrors {
      code
      message
      range {
        start {
          line
          character
        }
        end {
          line
          character
        }
      }
    }
  }
}
`;

export default function reportsPage() {

  return (
    <Page>
    <Layout>
      <Layout.Section>
        <LegacyCard title="Reports" sectioned>
          <p>Search for a product to access product reports.</p>
        </LegacyCard>
        </Layout.Section>
        <Layout.Section secondary >
          <LegacyCard title="Conversion Rate" sectioned>
            <LineChart data={[{
              data: [
                { key: '2018-01-01', value: 0.5 },
                { key: '2018-01-02', value: 0.45 },
                { key: '2018-01-03', value: 0.6 },
                { key: '2018-01-04', value: 0.5 },
                { key: '2018-01-05', value: 0.4 },
                { key: '2018-01-06', value: 0.3 },
                { key: '2018-01-07', value: 0.2 },
                { key: '2018-01-08', value: 0.25 },
                { key: '2018-01-09', value: 0.3 },
                { key: '2018-01-10', value: 0.35 },
              ]
            }]}
              showLegend={false}
            />
          </LegacyCard>
        </Layout.Section>
    </Layout>
  </Page>
);
}