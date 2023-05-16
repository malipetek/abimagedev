import React from 'react';
import { Layout, Page, CalloutCard, Link } from '@shopify/polaris';
import { ScriptSetting } from '../components/QuickSettings/ScriptSetting';
import { mainIllustration } from '../assets';

export default function IndexPage() {
  return (
    <Page>
      <Layout >
        <Layout.Section >
          <ScriptSetting />
          <CalloutCard illustration={ mainIllustration } title="Get started by enabling auto ordering" primaryAction={{
            content: 'Go to Settings',
            url: '/settings',
          }}>
            <p>
              Start experimenting with all product images by swapping images or changing the image orders and measuring conversion.
            </p>
          </CalloutCard>
        </Layout.Section>
        <Layout.Section >
          <CalloutCard  illustration={mainIllustration} title="How to use Abimage" primaryAction={{
            content: 'Learn more',
            url: '/app',
          }} secondaryAction={
            {
              content: 'Contact support',
              url: '/app'
            }
          }>
            <p>
              Abimage is a Shopify app that allows you to create and manage
              image galleries for your store.
            </p>
          </CalloutCard>
        </Layout.Section>
      </Layout>
    </Page>
  );
}