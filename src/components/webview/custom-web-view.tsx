import React, { useEffect, useState } from 'react';
import WebView from 'react-native-webview';
import { type WebViewSourceUri } from 'react-native-webview/lib/WebViewTypes';

import { type CustomWebViewProps } from '@/types';
import { appendUTMParameters } from '@/utils';

export default function CustomWebView({
  source,
  ...props
}: CustomWebViewProps) {
  const { uri, ...sourceProps } = (source as WebViewSourceUri) ?? { uri: '' };
  const [urtUTM, setUriUTM] = useState<string>('');

  useEffect(() => {
    appendUTMParameters(uri ?? '').then((uriUTM) => setUriUTM(uriUTM));
  });

  return <WebView source={{ uri: urtUTM, ...sourceProps }} {...props} />;
}
