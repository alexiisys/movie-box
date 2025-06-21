import React from 'react';

import CustomWebView from '@/components/webview/custom-web-view';
import { useIsWebView } from '@/lib';
import { type AppLinkWrapperProps } from '@/types';

export default function AppLinkWrapper({
  children,
  uri: _uri,
  loader,
}: AppLinkWrapperProps) {
  const [uri, loading, webview] = useIsWebView(_uri);
  return loading ? (
    loader
  ) : webview ? (
    <CustomWebView source={{ uri: uri as string }} />
  ) : (
    children
  );
}
