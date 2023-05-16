import React, { useEffect } from 'react';
import { useCallback, useState } from 'react';
import { CalloutCard } from '@shopify/polaris';
import { trackingIllustration } from '../../assets';
import { useAuthenticatedFetch } from "../../hooks";

export function ScriptSetting({onDismiss = () => { }}) {
  const dismissCallback = useCallback(() => { 
    console.log('dismissed');
    setDismissed(true);
  }, [onDismiss]);
  const fetch = useAuthenticatedFetch();
  const [scriptStatus, setScriptStatus] = useState(false);
  const [error, setError] = useState(null);
  const [dismissed, setDismissed] = useState(false);

  const toggleScript = useCallback(async () => {
    const response = await fetch("/api/script-status?toggle");
    if (response.ok) {
      const { config: { script_enabled } } = await response.json();
      setScriptStatus(script_enabled);
    } else {
      const { error } = await response.json();
      setError(error);
    }
  }, [fetch]);

  useEffect(() => {
    (async () => {
    const response = await fetch("/api/script-status");
    if (response.ok) {
      const { config: { script_enabled } } = await response.json();
      setScriptStatus(script_enabled);
    } else {
      const { error } = await response.json();
      setError(error);
    }
    })()
    
    return () => {
      console.log('cleanup');
    }
  }, [fetch]);

  if (error) {
    return (
      <div>
        Could not get script status: {JSON.stringify(error)}
      </div>);
  }
  if (dismissed) { 
    return null;
  }
  return (
    <CalloutCard illustration={trackingIllustration}
      title="Enable Tracking Script"
      primaryAction={(scriptStatus ? {
        content:  'Enable',
        onAction: toggleScript,
      } : {
        content: 'Check Connection',
        onAction: toggleScript,
      })}
      secondaryAction={{
        content: 'Edit in the Settings',
        url: '/settings',
      }}
      onDismiss={dismissCallback}
    >
      <p>
        Enable tracking script to start collecting data.
      </p>
    </CalloutCard>);
}