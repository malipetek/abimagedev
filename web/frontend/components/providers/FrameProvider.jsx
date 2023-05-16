import React, { useEffect } from "react";
import { logoImage } from "../../assets";

import {
  Frame, TopBar, Toast, ActionList, ContextualSaveBar, Loading,
  Modal, FormLayout, TextField, Navigation
} from "@shopify/polaris";

import {
  QuestionMarkMajor, SettingsMajor, HomeMajor,
  ArrowLeftMinor, OrdersMajor, ConversationMinor,
  PlanMajor
} from "@shopify/polaris-icons";

import { useState, useCallback, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export function FrameProvider({ children }) { 
  const location = useLocation();
  const defaultState = useRef({
    emailFieldValue: 'muhammet@abimage.app',
    nameFieldValue: 'Abimage',
  });
  const skipToContentRef = useRef(null);
  const [toastActive, setToastActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [userMenuActive, setUserMenuActive] = useState(false);
  const [mobileNavigationActive, setMobileNavigationActive] = useState(false);
  const [modalActive, setModalActive] = useState(false);
  const [nameFieldValue, setNameFieldValue] = useState(
    defaultState.current.nameFieldValue,
  );
  const [emailFieldValue, setEmailFieldValue] = useState(
    defaultState.current.emailFieldValue,
  );
  const [storeName, setStoreName] = useState(
    defaultState.current.nameFieldValue,
  );
  const [supportSubject, setSupportSubject] = useState('');
  const [supportMessage, setSupportMessage] = useState('');

  const handleSubjectChange = useCallback(
    (value) => setSupportSubject(value),
    [],
  );
  const handleMessageChange = useCallback(
    (value) => setSupportMessage(value),
    [],
  );
  const handleDiscard = useCallback(() => {
    setEmailFieldValue(defaultState.current.emailFieldValue);
    setNameFieldValue(defaultState.current.nameFieldValue);
    setIsDirty(false);
  }, []);
  const handleSave = useCallback(() => {
    defaultState.current.nameFieldValue = nameFieldValue;
    defaultState.current.emailFieldValue = emailFieldValue;

    setIsDirty(false);
    setToastActive(true);
    setStoreName(defaultState.current.nameFieldValue);
  }, [emailFieldValue, nameFieldValue]);
  const handleNameFieldChange = useCallback((value) => {
    setNameFieldValue(value);
    value && setIsDirty(true);
  }, []);
  const handleEmailFieldChange = useCallback((value) => {
    setEmailFieldValue(value);
    value && setIsDirty(true);
  }, []);
  const handleSearchResultsDismiss = useCallback(() => {
    setSearchActive(false);
    setSearchValue('');
  }, []);
  const handleSearchFieldChange = useCallback((value) => {
    setSearchValue(value);
    setSearchActive(value.length > 0);
  }, []);
  const toggleToastActive = useCallback(
    () => setToastActive((toastActive) => !toastActive),
    [],
  );
  const toggleUserMenuActive = useCallback(
    () => setUserMenuActive((userMenuActive) => !userMenuActive),
    [],
  );
  const toggleMobileNavigationActive = useCallback(
    () =>
      setMobileNavigationActive(
        (mobileNavigationActive) => !mobileNavigationActive,
      ),
    [],
  );
  const toggleIsLoading = useCallback(
    () => setIsLoading((isLoading) => !isLoading),
    [],
  );
  const toggleModalActive = useCallback(
    () => setModalActive((modalActive) => !modalActive),
    [],
  );

  const toastMarkup = toastActive ? (
    <Toast onDismiss={toggleToastActive} content="Changes saved" />
  ) : null;

  useEffect(() => { 
    console.log("FrameProvider: useEffect: location: ", location);
  }, [location]);
  const navigationMarkup = (
    <Navigation location="/">
      <Navigation.Section
        items={[
          {
            label: 'Back to Shopify',
            icon: ArrowLeftMinor,
          },
        ]}
      />
      <Navigation.Section
        separator
        title="A/Bimage"
        items={[
          {
            label: 'Homepage',
            icon: HomeMajor,
            url: '/',
            selected: location.pathname === '/',
          },
          {
            label: 'Reports',
            icon: OrdersMajor,
            url: '/reports',
            selected: location.pathname === '/reports',
          },
          {
            label: 'Billing',
            icon: PlanMajor,
            url: '/billing',
            selected: location.pathname === '/billing',
          },
          {
            label: 'Settings',
            icon: SettingsMajor,
            url: '/settings',
            selected: location.pathname === '/settings',
          },
        ]}
        action={{
          icon: ConversationMinor,
          accessibilityLabel: 'Contact support',
          onClick: toggleModalActive,
        }}
      />
    </Navigation>
  );

  const logo = {
    width: 44,
    topBarSource: logoImage,
    contextualSaveBarSource: logoImage,
    url: '#',
    accessibilityLabel: 'A/Bimage',
  };

  const userMenuActions = [
    {
      items: [{
        content: 'Support',
        icon: QuestionMarkMajor,
        onAction: toggleModalActive,
      }],
    },
  ];

  const userMenuMarkup = (
    <TopBar.UserMenu
      actions={userMenuActions}
      name="Malipetek"
      detail={storeName}
      initials="M"
      open={userMenuActive}
      onToggle={toggleUserMenuActive}
    />
  );
  const searchResultsMarkup = (
    <ActionList
      items={[{content: 'Shopify help center'}, {content: 'Community forums'}]}
    />
  );
  const searchFieldMarkup = (
    <TopBar.SearchField
      onChange={handleSearchFieldChange}
      value={searchValue}
      placeholder="Search"
    />
  );
  const topBarMarkup = (
    <TopBar
      showNavigationToggle
      userMenu={userMenuMarkup}
      searchResultsVisible={searchActive}
      searchField={searchFieldMarkup}
      searchResults={searchResultsMarkup}
      onSearchResultsDismiss={handleSearchResultsDismiss}
      onNavigationToggle={toggleMobileNavigationActive}
    />
  );

  const contextualSaveBarMarkup = isDirty ? (
    <ContextualSaveBar
      message="Unsaved changes"
      saveAction={{
        onAction: handleSave,
      }}
      discardAction={{
        onAction: handleDiscard,
      }}
    />
  ) : null;

  const loadingMarkup = isLoading ? <Loading /> : null;


  const modalMarkup = (
    <Modal
      open={modalActive}
      onClose={toggleModalActive}
      title="Contact support"
      primaryAction={{
        content: 'Send',
        onAction: toggleModalActive,
      }}
    >
      <Modal.Section>
        <FormLayout>
          <p>
            Just send the initial message we will follow up with email
          </p>
          <TextField
            label="Subject"
            value={supportSubject}
            onChange={handleSubjectChange}
            autoComplete="off"
          />
          <TextField
            label="Message"
            value={supportMessage}
            onChange={handleMessageChange}
            autoComplete="off"
            multiline
          />
        </FormLayout>
      </Modal.Section>
    </Modal>
  );
  return (<Frame
    logo={logo}
    topBar={topBarMarkup}
    navigation={navigationMarkup}
    showMobileNavigation={mobileNavigationActive}
    onNavigationDismiss={toggleMobileNavigationActive}
    skipToContentTarget={skipToContentRef}
  >
    {contextualSaveBarMarkup}
    {loadingMarkup}
    {children}
    {toastMarkup}
    {modalMarkup}
  </Frame>);
}