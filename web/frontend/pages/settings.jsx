import React from 'react';
import { Page, Layout, LegacyCard } from '@shopify/polaris';

export default function settingsPage() {
  return (
    <Page>
      <Layout>
        <Layout.Section>
          <LegacyCard title="Settings" sectioned>
            <p>Settings</p>
          </LegacyCard>
        </Layout.Section>
      </Layout>
    </Page>
  );
}